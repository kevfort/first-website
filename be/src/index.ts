import { randomInt } from 'crypto';
import express from 'express'

const app = express();
const port = 5177;

type boardArray = [
    [string,string,string],
    [string,string,string],
    [string,string,string]
];

/*class Room {
    private hostID: number;
    private guestId: number;
};*/
class Board {
    private boardLayout: boardArray; 
    public constructor() {

        this.boardLayout =[["","",""],["","",""],["","",""]];
    }
};

let roomMap = new Map<string, string>();  //<roomName, roomID>

const base36Chars: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function createRoom(roomName: string){
    roomMap.set(roomName, generateBase32ID(6));
    console.log(`Room ${roomMap.get(roomName)} created`);
}

function generateBase32ID(length: number):string{
    var ID:string = "";
    for(let i =0; i<length; i++){
        ID = ID + base36Chars[randomInt(36)]
    }
    return(ID);
}

function display(message: string): string{
    return(`Your message: ${message}`);
}
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/create-room/:roomName/:hostName', (req,res) => {
    createRoom(req.params.roomName);
    res.send(`Room ${req.params.roomName} created by ${req.params.hostName} with identifier ${roomMap.get(req.params.roomName)}`)
});


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

