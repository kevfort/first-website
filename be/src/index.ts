import { randomInt } from 'crypto';
import express from 'express'

const app = express();
const port = 5177;

const roomMap = new Map<string, string>();  //<roomID, room>
const playerIds: string[] = [];
type boardArray = [
    [string,string,string],
    [string,string,string],
    [string,string,string]
];

class Room {
    private hostID: string;
    private guestID: string;
    private roomID: string;
    
    public constructor({hostID, roomID}:{hostID: string, roomID: string}) {
        this.hostID = hostID;
        this.guestID = "nullUser";
        this.roomID = roomID;
    }
    public getHost():string{
        return(this.hostID);
    }
    public getGuest():string{
        return(this.guestID);
    }
    public addGuest({newGuestID}:{newGuestID: string}):void{
        if(this.guestID == ("nullUser")){
            this.guestID = newGuestID;
        }
    }
    
};
class Board {
    private boardLayout: boardArray; 
    public constructor() {

        this.boardLayout =[["","",""],["","",""],["","",""]];
    }
    public makeMove({symbol, coordinate}:{symbol: string, coordinate: [number,number]}):boardArray{
        if(this.boardLayout[coordinate[0]][coordinate[1]] == ""){
            this.boardLayout[coordinate[0]][coordinate[1]] = symbol;
        }
        return(this.boardLayout);
    }
    
};



const base36Chars: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function createRoom(roomName: string, hostName: string){
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
//base path
app.get('/', (req, res) => {
    res.send('Hello World')
});

//creates room
app.get('/create-room/:roomName/:hostName', (req,res) => {
    createRoom(req.params.roomName, req.params.hostName);
    res.send(`Room ${req.params.roomName} created by ${req.params.hostName} with identifier ${roomMap.get(req.params.roomName)}`)
});

app.get('/new-user/:currentID?', (req,res) => {
    if(req.params.currentID){
        res.send(`${req.params.currentID}`);
    }
    else{
        let newID: string = generateBase32ID(10);
        playerIds.push(newID);
        res.send(`${newID}`);
    }
})

app.get('/close-session/:currentID', (req,res) => {
    playerIds.splice(playerIds.indexOf(req.params.currentID),1);
})
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

