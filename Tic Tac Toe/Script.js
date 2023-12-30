let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgame = document.querySelector("#newgame");
let msg = document.querySelector(".msg");
let masgpara = document.querySelector("#paramsg");
let turnvar = document.querySelector("#turnvar");

let turnO = true;

const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];


let counter = 0;
boxes.forEach( (box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnvar.innerText = "Turn: ";
            turnvar.innerText = turnvar.innerText + "Player 2"
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnvar.innerText = "Turn: ";
            turnvar.innerText = turnvar.innerText + "Player 1"
            turnO = true;
        }
        
        box.disabled = true;

        counter++;
        if (counter === 9) {
            draw();
        }

        checkWinner(turnO);
    });
});


// Conditions
const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    if(winner)
        masgpara.innerText = "Winner is: Player 2 " ;
    else
        masgpara.innerText = "Winner is Player 1 ";

    msg.classList.remove("hide");
    disableboxes();
    counter = 0;
};

// Winner Condition
const checkWinner = (win) => {
    for(let pattern of winPatterns){
        
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 =  boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 == pos2 && pos2 == pos3){
                showWinner(win);
            }
        }
    }
};

const draw = () => {
    masgpara.innerText = " Oops it's a Draw ";
    msg.classList.remove("hide");
    counter = 0;
};

// New Game
const resetgame = () => {
    turnO = true;
    enableboxes();
    msg.classList.add("hide");
    counter = 0;
};

newgame.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);