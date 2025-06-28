const player = (function(){
    let player1 = "X"
    let player2= "O"
    let player1Name;
    let player2Name;
    let player1score = 0
    let player2score = 0
    let win = false
    
    const isWin = function(){
        let isWin1 = gameboard.checkWin(player1,player1Name)
        let isWin2 = gameboard.checkWin(player2,player2Name)
        if (isWin1 == true){
            win = player1Name
            player1score++
            game.element1score.textContent = player1score

        }
        else if (isWin2 == true){
            win = player2Name;
            player2score++
            game.element2score.textContent = player2score

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
    const getPlayerScores = function(){
        return [player1score,player2score]
    }

    return {
       getPlayer1,
       resetWin,
       getPlayer2,
       isWin,getWin,
       setPlayers,
       getPlayernames,
       getPlayerScores,

    }
})()

const gameboard = (function(){
    let board = [];
    let player1 = player.getPlayer1();
    let player2 = player.getPlayer2();
    const isWin = document.querySelector(".who-win")
    const turnCard = document.querySelector(".turn")
    const winCard = document.querySelector(".win-card")

    const hit = new Audio("audio/pop.mp3")
    hit.volume=0.5
    const winSound = new Audio("audio/win.mp3")
    winSound.volume= 0.06

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
            hit.currentTime=0;
            hit.play()
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
        let win = false
        for (let i =0;i<winCombos.length;i++){
            if (winCombos[i].every(idx => board[idx]==marker)){
                win = true
                winCombos[i].forEach(i =>{
                    const cell  =document.querySelector(`.box[data-value="${i}"]`)
                    cell.classList.add("highlight")
                })
            }
             
            if (win == true){
                console.log("Player ",marker," Wins")
                isWin.textContent=name
                turnCard.classList.toggle("hide-div")
                winCard.classList.toggle("hide-div")
                winSound.currentTime = 0;
                winSound.play()
                return true
            }

        }
    }
    
    const winReset = function(){
        isWin.textContent=""    
        turnCard.classList.remove("hide-div")
        winCard.classList.add("hide-div")
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
    const box = document.querySelectorAll(".box");
    const whichPlayer = document.querySelector(".which-player");
    // SCORE CONTAINERS
    const player1Score = document.querySelector(".player1-score-container")
    const player2Score = document.querySelector(".player2-score-container")
    const element1 = document.createElement("p")
    const element2 = document.createElement("p")
    const element1score = document.createElement("p")
    const element2score = document.createElement("p")
    // END SCORES
    dialog.showModal()
    const newGame = document.querySelector(".newBtn")
    let turn = true;

    const resetSound = new Audio("audio/swoosh.mp3")

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
        resetSound.duration = 0;
        resetSound.volume = 0.03;

        resetSound.play()
        gameboard.init()
        box.forEach((b) => {
            b.replaceChildren()
            b.classList.remove("highlight")
        })
        player.resetWin()
        gameboard.winReset()
        
        let [p1Score,p2Score] = player.getPlayerScores()
        element1score.textContent = p1Score;
        element2score.textContent = p2Score;

        whichPlayer.classList.toggle("player-orange")
        
        turn = true
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

                const node1 = document.createTextNode(player1input)
                const node2 = document.createTextNode(player2input)
                let [p1Score,p2Score] = player.getPlayerScores()
                const node1score = document.createTextNode(p1Score)
                const node2score = document.createTextNode(p2Score)

                element1.appendChild(node1)
                element1score.appendChild(node1score)
                element2.appendChild(node2)
                element2score.appendChild(node2score)
                // element1score.classList.add("score")
                // element2score.classList.add("score")

                player1Score.appendChild(element1)
                player1Score.appendChild(element1score)
                player2Score.appendChild(element2)
                player2Score.appendChild(element2score)
                
                
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
                    whichPlayer.classList.toggle("player-orange")
                    
                }
                else {
                    element.classList.add("addO","move")
                    whichPlayer.textContent=player1name
                    whichPlayer.classList.toggle("player-orange")


                }
                element.appendChild(textNode)
                e.target.appendChild(element)
                turn = !turn;
                }
            }
        }

        // execute bind method
    bindEvent()
    return {
        element1score,
        element2score
    }
})()




