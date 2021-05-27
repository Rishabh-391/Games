let userScore=0;
let computerScore=0;
const userScore_span=document.getElementById("user-score");
const computerScore_span=document.getElementById("computer-score");
const scoreBoard_div=document.querySelector(".score-board");
const result_p=document.querySelector(".result > p");
const rock_div=document.getElementById("r");
const paper_div=document.getElementById("p");
const scissors_div=document.getElementById("s");

function getComputerChoice(){
	const choices=['r','p','s'];
	const randomNumber=Math.floor(Math.random() * 3);
	return choices[randomNumber];
}
getComputerChoice();

function convertToWord(letter){
	if(letter=='r') return "Rock";
	if(letter=='p') return "Paper";
	if(letter=='s') return "Scissors";
}
function win(userChoice,computerChoice){
	userScore++;
	userScore_span.innerHTML=userScore;
	computerScore_span.innerHTML=computerScore;
	const user_sub="user".fontsize(3).sub();
	const comp_sub="comp".fontsize(3).sub();
	result_p.innerHTML=`${convertToWord(userChoice)}${user_sub} beats ${convertToWord(computerChoice)}${comp_sub} . You win!"`;	
	document.getElementById(userChoice).classList.add('green-glow');	
	setTimeout(()=> document.getElementById(userChoice).classList.remove('green-glow'), 300);
}
function lose(userChoice,computerChoice){
	computerScore++;
	userScore_span.innerHTML=userScore;
	computerScore_span.innerHTML=computerScore;
	const user_sub="user".fontsize(3).sub();
	const comp_sub="comp".fontsize(3).sub();
	result_p.innerHTML=`${convertToWord(userChoice)}${user_sub} loses to ${convertToWord(computerChoice)}${comp_sub} . You lost..!"`;
	document.getElementById(userChoice).classList.add('red-glow');
	setTimeout(()=> document.getElementById(userChoice).classList.remove('red-glow'), 300);
}
function draw(userChoice,computerChoice){
	const user_sub="user".fontsize(3).sub();
	const comp_sub="comp".fontsize(3).sub();
	result_p.innerHTML=`${convertToWord(userChoice)}${user_sub} draws with ${convertToWord(computerChoice)}${comp_sub} . Its's a draw !"`;
	document.getElementById(userChoice).classList.add('gray-glow');
	setTimeout(()=> document.getElementById(userChoice).classList.remove('gray-glow'), 300);
}

function game(userChoice){
	const computerChoice=getComputerChoice();
	switch(userChoice + computerChoice){
		case "rs":
		case "pr":
		case "sp":
			win(userChoice,computerChoice);
			break;
		case "rp":
		case "ps":
		case "sr":
			lose(userChoice,computerChoice);
			break;
		case "rr":
		case "pp":
		case "ss":
			draw(userChoice,computerChoice);
			break;
	}
}

function main(){
	rock_div.addEventListener('click', ()=>game("r"));

	paper_div.addEventListener('click', ()=>game("p"));

	scissors_div.addEventListener('click', ()=>game("s"));
}

main();