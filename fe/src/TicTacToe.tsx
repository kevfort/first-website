import { useState } from "react"


type Coordinate = [number,number]
type clickHandler = (index: Coordinate) => void;
interface buttonProps{
    board: string[][];
    cellIndex: Coordinate;
    onClick: (clickHandler);
}
function isWinner(gameBoard:string[][]):boolean{
    for(let i = 0; i < gameBoard.length; i++){
        if((gameBoard[i][0] != "")&&((gameBoard[i][0] === gameBoard[i][1])&&(gameBoard[i][0] === gameBoard[i][2]))){
            return true
        }
        if((gameBoard[0][i] != "")&&((gameBoard[0][i] === gameBoard[1][i])&&(gameBoard[0][i] === gameBoard[2][i]))){
            return true
        }
    }
    if((gameBoard[0][0] != "")&&((gameBoard[0][0] === gameBoard[1][1])&&(gameBoard[0][0] === gameBoard[2][2]))){
        return true
    }
    else if((gameBoard[0][2] != "")&&((gameBoard[0][2] === gameBoard[1][1])&&(gameBoard[0][2] === gameBoard[2][0]))){
        return true
    }
    return false
}
function TicTacToe() {    
    const [gameBoard, setGameBoard] = useState<string[][]>([["","",""],["","",""],["","",""]])
    const [currentPlayer, setCurrentPlayer] = useState<string>("X")
    const [gameOver, setGameOver] = useState<boolean>(false)
    function handleClick(cellIndex: Coordinate):void{
        if(gameBoard[cellIndex[0]][cellIndex[1]] == ""){
            gameBoard[cellIndex[0]][cellIndex[1]] = currentPlayer
            setGameBoard(gameBoard)            
            if(isWinner(gameBoard)){
                setGameOver(true)
            }
            else{
                if(currentPlayer == "X") {
                    setCurrentPlayer("O")
                }
                else {
                    setCurrentPlayer("X")
                }
            }
        }
    }
    if(gameOver){
        return(
            <>
                <h1>Game Over, {currentPlayer} wins!</h1>
                <button onClick={() => window.location.reload()}>
                    <h2>Reset?</h2>
                </button>
            </>
        )
    }
    return(
        <div className="flex-container">
            <Square board={gameBoard} cellIndex={[0,0]} onClick={handleClick}/>
            <Square board={gameBoard} cellIndex={[0,1]} onClick={handleClick}/>
            <Square board={gameBoard} cellIndex={[0,2]} onClick={handleClick}/>
            <Square board={gameBoard} cellIndex={[1,0]} onClick={handleClick}/>
            <Square board={gameBoard} cellIndex={[1,1]} onClick={handleClick}/>
            <Square board={gameBoard} cellIndex={[1,2]} onClick={handleClick}/>
            <Square board={gameBoard} cellIndex={[2,0]} onClick={handleClick}/>
            <Square board={gameBoard} cellIndex={[2,1]} onClick={handleClick}/>
            <Square board={gameBoard} cellIndex={[2,2]} onClick={handleClick}/>   
            <button onClick={() => window.location.reload()}>
                <small>Tie? Click here to reset</small>
            </button>
        </div>
    )
}

function Square({board, cellIndex, onClick}:buttonProps) {
    return(
    <button onClick={() => onClick(cellIndex)}>
        <div className = "square">
            <div className ="center">
                {board[cellIndex[0]][cellIndex[1]]}
            </div>
        </div>
    </button>
    )
}
export default TicTacToe


