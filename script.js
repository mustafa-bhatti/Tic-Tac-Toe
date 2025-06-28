const player = (function(){
    let player1 = "X"
    let player2= "O"
    let player1Name = "mustafa";
    let player2Name = "Rida";
    let win = false
    
    const isWin = function(){
        let isWin1 = gameboard.checkWin(player1)
        let isWin2 = gameboard.checkWin(player2)
        if (isWin1 == true){
            win = player1Name
        }
        else if (isWin2 == true){
            win = player2Name;
        }   
        return win
    }
    const getPlayer1 = function(){
        return player1
    }
    const getPlayer2 = function(){
    return player2
    }
    return {
       getPlayer1,getPlayer2,isWin
    }
})()

const gameboard = (function(){
    let board = [];
    let player1 = player.getPlayer1();
    let player2 = player.getPlayer2();

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

    const move = function(pos,curr_player){
        let isValid = false
        if (curr_player == true){
            curr_player = player1
        }
        else {
            curr_player = player2
        }
        if (typeof(board[pos]) == "number"){
            board[pos] = curr_player;
            isValid=true
            player.isWin()
            // console.log(player)
        }
        // else {
        //  alert("ERROR: already a marker there")}
        console.log(`Player ${curr_player} move at index: ${pos}`)
        displayBoard()

        return [isValid,curr_player]
    }

    const checkWin = function(marker){
        const isWin = document.querySelector(".who-win")
        const turnCard = document.querySelector(".turn")
        const winCard = document.querySelector(".win-card")
        let winCombos = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8], [2,4,6]
        ]
        for (let i =0;i<winCombos.length;i++){
            let win = true;
            for (let x of winCombos[i]){
                if (board[x] != marker){
                    console.log(board[x],marker)
                    win = false;
                    break}
            } 
            if (win == true){
                console.log("Player ",marker," Wins")
                isWin.textContent=marker
                turnCard.classList.add("hide-div")
                winCard.classList.toggle("hide-div")
                return true
            }
        }
    }
    
    
    init()
    displayBoard()

    return {
        init,
        displayBoard,
        move,
        checkWin
    }
})()

// gameboard.move(2,"player1")
// gameboard.move(4,"player1")
// gameboard.move(6,"player1")
// gameboard.move(0,"player2")
// gameboard.move(1,"player2")




const game = (function(){
    let box = document.querySelectorAll(".box");
    let whichPlayer = document.querySelector("#which-player");
    whichPlayer.textContent="Player 1"

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

        if (!player.isWin()){
            let [moveFlag,playerTurn] = gameboard.move(pos,turn)
            if (moveFlag){

                const element = document.createElement("p")
                const textNode = document.createTextNode(playerTurn)
                if (turn){
                    element.classList.add("addX")
                    whichPlayer.textContent="Player 2"

                }
                else {
                    element.classList.add("addO")
                    whichPlayer.textContent="Player 1"

                }
                element.appendChild(textNode)
                e.target.appendChild(element)
                turn = !turn;
                }
            }
}
    bindEvent()
})()




