const single = document.getElementById("btn-one");
const multi = document.getElementById("btn-two");
const easyBtn = document.getElementById("easy-btn");
const hardBtn = document.getElementById("hard-btn");
let matter=document.getElementById("text");
const gameDiv = document.querySelector(".game-div");
const submitBtn = document.getElementById("submit-btn");
const grid = document.querySelector(".grid");
const cells = document.querySelectorAll(".cell");
const btn = document.getElementById("albtn");
let hard=true;
let singleplaying=true;
let currentPlayer = "X"; 
let isGameOver = false;
 

const board = ['', '', '', '', '', '', '', '', ''];

// Define the AI player and opponent
const aiPlayer = 'O';
const opponent = 'X';
// Function to create the Tic-Tac-Toe grid
function createTicTacToeGrid() {
    btn.style.display="none";
    
    gameDiv.style.display = "block"; 
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = "";
        grid.appendChild(cell);
    }
    matter.innerHTML=currentPlayer+"'s  Turn";
}


function checkGameOver(won) {
    const cels = document.querySelectorAll(".cell");
  
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        
        if ((cels[a].textContent==="X" || cels[a].textContent==="O") &&

        cels[a].textContent === cels[b].textContent && cels[a].textContent === cels[c].textContent) {
          
         isGameOver = true;
         if(won){
            
            animate(a,b,c,cels);}
            return; 
        }
    }
    
    for(let i=0;i<9;i++){
        if(cels[i].textContent===""){
            isGameOver=false;
            return ;
        }
    }
  
    isGameOver=true;
    if(won){
    for(let i=0;i<9;i++){
        cels[i].textContent="";
    }
    currentPlayer="X";
    isGameOver=false;
    matter.innerHTML=currentPlayer+"'s  turn";}
    return;
    
    
}

function animate(a,b,c,cels){
    cels[a].classList.add("winning-cell");
    cels[b].classList.add("winning-cell");
    cels[c].classList.add("winning-cell");
    matter.innerHTML=cels[a].textContent+"'s  won";
    console.log("player",cels[a].textContent,"won");
    
    
    setTimeout(()=>{
        isGameOver=false;
        for(let i=0;i<9;i++){
            cels[i].textContent="";
        }
        cels[a].classList.remove("winning-cell");
        cels[b].classList.remove("winning-cell");
        cels[c].classList.remove("winning-cell");
        currentPlayer="X";
        matter.innerHTML=currentPlayer+"'s  turn";
    },2000)
    return;
}
function easymove(){
  
    const cels = document.querySelectorAll(".cell");   
    for(let i=0;i<9;i++){
       
        if(!cels[i].textContent){
            
           cels[i].textContent="O";
       
           checkGameOver(false);
           cels[i].textContent="";
        
        
          if(isGameOver){
           
            isGameOver=false;
                return i;
            
          }
         
       
        
          
    }
    
        
    }
    return -1;
    
}
function blockmove(){
    const cels = document.querySelectorAll(".cell");   
    for(let i=0;i<9;i++){
       
        if(!cels[i].textContent){
           
           cels[i].textContent="X";
       
           checkGameOver(false);
           cels[i].textContent="";
          
        
          if(isGameOver){
            
            isGameOver=false;
                return i;
            
          }
         
       
        
          
    }
    
        
    }
    return -1;
}

function computerMove() {
    let randomIndex=0;
    const cels = document.querySelectorAll(".cell");   
 
    for(let i=0;i<9;i++){
        board[i]=cels[i].textContent;
        
    }
    if(hard ){
        randomIndex = findBestMove(board);
       
    }
    else{
    let num=easymove();
    if(num>=0){
        randomIndex=num; 
       
    }
    else if(num<0){
        let bloc=blockmove();
        if(bloc>=0){
            randomIndex=bloc;
            
    }}
    else{
     randomIndex = Math.floor(Math.random() * 8);
     
    }
  
    while(cels[randomIndex].textContent){
        randomIndex = Math.floor(Math.random() * 9);   
    }
     
    
}
cels[randomIndex].textContent = "O";
            currentPlayer = "X";
            matter.innerHTML=currentPlayer+"'s  Turn";
            checkGameOver(true,-1);
            
            
        }
 
function checkWinner(board, player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        if (pattern.every(i => board[i] === player)) {
            return true;
        }
    }
    return false;
}

// Minimax function
function minimax(board, depth, isMaximizing) {
    
    const scores = {
        X: -1,
        O: 1,
        tie: 0
    };

    if (checkWinner(board, aiPlayer)) {
        return scores.O;
    } else if (checkWinner(board, opponent)) {
        return scores.X;
    } else if (board.every(cell => cell !== '')) {
        return scores.tie;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = aiPlayer;
                const score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = opponent;
                const score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Find the optimal move for the AI player
function findBestMove(board) {
  
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = aiPlayer;
            const score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

        // Event listeners
        grid.addEventListener("click", (event) => {
            if (!isGameOver && event.target.classList.contains("cell") && !event.target.textContent) {
                event.target.textContent = currentPlayer;

                
                if(currentPlayer==="X"){
                currentPlayer = "O";}
                else{
                    currentPlayer="X";
                } 
                matter.innerHTML=currentPlayer+"'s  Turn";
                checkGameOver(true,-1);
                
               
                if (!isGameOver  ) {
                    if(singleplaying){
                    setTimeout(computerMove, 500); }
                   
                }
               
            }
        });
        
        single.addEventListener("click",()=>{
            single.style.display="none";
            multi.style.display="none";
            easyBtn.style.display="block";
            hardBtn.style.display="block";
          
        })
        multi.addEventListener("click",()=>{
            singleplaying=false;
            createTicTacToeGrid();
            
        })
        easyBtn.addEventListener("click", () => {
            createTicTacToeGrid();
            hard=false;
        });

        hardBtn.addEventListener("click", () => {
            createTicTacToeGrid();
            hard=true;
            
        });
        
