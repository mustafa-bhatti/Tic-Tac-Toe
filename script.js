const player = (function(){
    let player1 = "X"
    let player2= "O"
    let player1Name;
    let player2Name;
    let win = false
    
    const isWin = function(){
        let isWin1 = gameboard.checkWin(player1,player1Name)
        let isWin2 = gameboard.checkWin(player2,player2Name)
        if (isWin1 == true){
            win = player1Name
        }
        else if (isWin2 == true){
            win = player2Name;
        }   
        else {
            win =false
        }
        return win
    }
    const resetWin = function(){
        win = false
    }
    const getWin = function(){
        return win
    }
    const getPlayer1 = function(){
        return player1
    }
    const getPlayer2 = function(){
        return player2
    }
    const setPlayers = function(name1,name2){
        player1Name = name1
        player2Name = name2
    }
    const getPlayernames = function(){
        return [player1Name,player2Name]
    }
    return {
       getPlayer1,
       resetWin,
       getPlayer2,
       isWin,getWin,
       setPlayers,
       getPlayernames
    }
})()

const gameboard = (function(){
    let board = [];
    let player1 = player.getPlayer1();
    let player2 = player.getPlayer2();
    const isWin = document.querySelector(".who-win")
    const turnCard = document.querySelector(".turn")
    const winCard = document.querySelector(".win-card")

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

    const checkWin = function(marker,name){
        
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
                isWin.textContent=name
                turnCard.classList.toggle("hide-div")
                winCard.classList.toggle("hide-div")
                return true
            }

        }
    }
    
    const winReset = function(){
        isWin.textContent=""
        turnCard.classList.toggle("hide-div")
        winCard.classList.toggle("hide-div")
    }
    init()
    displayBoard()

    return {
        init,
        displayBoard,
        move,
        checkWin,
        winReset
    }
})()

const game = (function(){
    const dialog = document.querySelector("dialog")
    const submitBtn = document.querySelector(".submit-dialog")
    const inputField = document.querySelectorAll("input");
    let box = document.querySelectorAll(".box");
    let whichPlayer = document.querySelector("#which-player");
    dialog.showModal()
    const newGame = document.querySelector(".newBtn")
    let turn = true;

    const bindEvent = function(){
        box.forEach((b,e)=>{
            b.addEventListener("click",function(e){
                updateVal(e)
            })
        })
        submitBtn.addEventListener("click",setNames)
        newGame.addEventListener("click",reset)
    }

    const reset = function(){
        console.log("we out here")
        gameboard.init()
        box.forEach((b) => {
            b.replaceChildren()
        })
        player.resetWin()
        gameboard.winReset()
    }

    const setNames = function(){
        let validity =true;
            inputField.forEach((value) =>{
                if (value.checkValidity()==false){
                    validity=false;
                }
            });
            if (validity){
                const player1input = document.querySelector("#player1").value
                const player2input = document.querySelector("#player2").value
                player.setPlayers(player1input,player2input)
                whichPlayer.textContent=player1input

            }
    }
    // Showing whose turn it is
    const updateVal = function(e){
        let pos = e.target.dataset.value
        
        if (!player.getWin()){
            let [player1name, player2name] = player.getPlayernames()
            let [moveFlag,playerTurn] = gameboard.move(pos,turn)
            if (moveFlag){
                const element = document.createElement("p")
                const textNode = document.createTextNode(playerTurn)
                if (turn){
                    element.classList.add("addX","move")
                    whichPlayer.textContent = player2name

                }
                else {
                    element.classList.add("addO","move")
                    whichPlayer.textContent=player1name

                }
                element.appendChild(textNode)
                e.target.appendChild(element)
                turn = !turn;
                }
            }
        }

        // execute bind method
    bindEvent()
})()




