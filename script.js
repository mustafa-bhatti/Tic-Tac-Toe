const gameboard = (function(){
    let board = [];

    const init = function(){
        for(let i=0;i<9;i++){
            board[i] = 0
        }
        // console.log(board)
    }
    const displayBoard = function(){
        console.log(board.slice(0,3))
        console.log(board.slice(3,6))
        console.log(board.slice(6,9))

    }
    init()
    displayBoard()
    return {
        init
    }
})()
