/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie


/*------------------------ Cached Element References ------------------------*/
const resetBtnEl = document.querySelector('#reset');

const squareEls = document.querySelectorAll(".sqr");
console.log(squareEls);

const messageEl = document.querySelector('#message')
console.log(messageEl.innerText)

/*-------------------------------- Functions --------------------------------*/
function init () {
    board = ["", "", "", "", "","","","",""];
    turn = "💋"
    winner= false;
    tie = false;
    // console.log("Begin!");
    // console.log(board);
    // console.log(turn);
    // console.log(winner);
    // console.log(tie);
    render();
    } ;

function render() {
    updateBoard()
    updateMessage()
    };
    
    
// create loop for board and for each element
    function updateBoard() {
        squareEls.forEach((cell,index) => {
      cell.innerText = board[index]

        })
    }
    
    // if theres no winner or tie, continue. if theres a tie say tie, and if there is a winner declare winner
    function updateMessage() {
    if (winner == false && tie == false) {
        messageEl.innerText = `Party onward! It's ${turn} turn!`
    } else if (winner == false && tie == true) {
        messageEl.innerText = `Tie!`
    } else { 
        console.log(winner)
        messageEl.innerText =`${turn} You Win!`
    }
}



function handleClick (event) {
    // get the index from an id assigned to the target element in the HTML. Assign this to a constant called squareIndex.
        
    const squareIndex = parseInt(event.target.getAttribute('id'));
    if (board[squareIndex] === '') {
        placePiece(squareIndex);
        checkForWinner();
        checkForTie();
        switchPlayerTurn()
        turn = turn === '💋' ? '💋' : '💄';
        render();
    }
}
        
        
    

    
function placePiece(index) {
board[index] = turn
console.log(board)
} ;

// loop through winning combos to see if there is a winner. I found a way to create a mini board to loop through the winning combos by creating a mini version of the winning combos array like so:

function checkForWinner () {
    for (i = 0; i < winningCombos.length; i++){
    const [a, b, c] = winningCombos[i];
    
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c])
    {
        winner = true;
    
    }
}
}
 
function checkForTie () {
    if (winner){
        return;} 
        // we need to have tie return true, run a conditonal through mini board 

        if (!board.some(cell => cell === '')) {
            tie = true;
        }
      

}

function switchPlayerTurn () {
    if (winner){
        return
    };

    // if winner is false, change turn. if turn is X turn it to O, if O, turn to X. 
    if (!winner){
        if (turn === "💋") {
            turn = "💄";
        } else {
            turn = "💋";
        } 
    }
}

    

/*----------------------------- Event Listeners -----------------------------*/


document.addEventListener("DOMContentLoaded", function() {
    init();
});

squareEls.forEach(squareEl => {
    squareEl.addEventListener('click', handleClick);
});

// add event listener to reset button
resetBtnEl.addEventListener('click', init)


// Assisted by Will, Megan, Alfred, Grace, and Kass.
// used MDN, Geeks for Geeks, and ChatGPT as reference.