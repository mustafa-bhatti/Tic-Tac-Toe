const gameboard = (function(){
    let board = [];
    let player1 = "X";
    let player2 = "O"

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
        let isValid = false
        if (player == true){
            player = player1
        }
        else {
            player = player2
        }
        if (typeof(board[pos]) == "number"){
            board[pos] = player;
            isValid=true
        }
        // else {
        //  alert("ERROR: already a marker there")}
        console.log(`Player ${player} move at index: ${pos}`)
        displayBoard()
        checkWin(player1)
        checkWin(player2)
        return [isValid,player]

    }
    const checkWin = function(marker){
        let winCombos = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8], [2,4,6]
        ]

        for (let i =0;i<winCombos.length;i++){
            let win = true;
            for (let x of winCombos[i]){
                if (board[x] != marker){
                    win = false;
                    break}
            } 
            if (win == true){
                console.log("Player ",marker," Wins")
                return
            }
        }
    }
    
    init()
    displayBoard()

    return {
        init,
        displayBoard,
        move
    }
})()

// gameboard.move(2,"player1")
// gameboard.move(4,"player1")
// gameboard.move(6,"player1")
// gameboard.move(0,"player2")
// gameboard.move(1,"player2")

const game = (function(){
    let box = document.querySelectorAll(".box");
    let turn = true;
    const bindEvent = function(){
        box.forEach((b,e)=>{
            b.addEventListener("click",function(e){
                updateVal(e)
            })
        })
    }
    const updateVal = function(e){
        let pos = e.target.dataset.value
        let [moveFlag,player] = gameboard.move(pos,turn)
        if (moveFlag){
        console.log(player)
        const element = document.createElement("p")
        const textNode = document.createTextNode(player)
        element.appendChild(textNode)
        e.target.appendChild(element)
        turn = !turn;
        }
    }
    bindEvent()
})()




