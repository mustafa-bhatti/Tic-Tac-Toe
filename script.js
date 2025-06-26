const gameboard = (function(){
    let board = [];
    let player1,player2;

    const init = function(){
        for(let i=0;i<9;i++){
            board[i] = i
        }
        // console.log(board)
    }
    const displayBoard = function(){
        console.log(board.slice(0,3))
        console.log(board.slice(3,6))
        console.log(board.slice(6,9))


    }

    const move = function(pos,player){
        if (player == "player1"){
            player = "X"
        }
        else {
            player = "O"
        }
        if (typeof(board[pos]) == "number"){
            board[pos] = player;
        }
        else {
         alert("ERROR: already a marker there")}
        console.log(`new move at index: ${pos}`)
        displayBoard()
    }

    init()
    displayBoard()
    return {
        init,
        displayBoard,
        move
    }
})()

gameboard.move(4,"player1")
gameboard.move(2,"O")



