var origBoard;
const user= 'X';
const ai='O';
const winCombos=[ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2] ]
const cells=document.querySelectorAll('.cell');

startGame();
function startGame(){
	document.querySelector('.endgame').style.display="none";
	origBoard=Array.from(Array(9).keys());
	for(var i=0;i<cells.length;i++){
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i],addEventListener('click',turnClick,false);

	}
}

function turnClick(square){
	if(typeof origBoard[square.target.id]=='number'){
		turn(square.target.id, user);
		if(!checkTie()) turn(bestSpot(),ai);
	}
}

function turn(squareId,player){
	origBoard[squareId]=player;
	document.getElementById(squareId).innerText=player;
	let gameWon=checkWin(origBoard,player)
	if(gameWon)
		gameOver(gameWon)
}

function checkWin(board,player){
	let play=board.reduce((a,e,i)=>(e===player)?a.concat(i):a,[]);
	let gameWon=null;
	for(let[index,win] of winCombos.entries()){
		if(win.every(elem=>play.indexOf(elem)>-1)){
			gameWon={index:index,player:player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon){
	for(let index of winCombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor=gameWon.player==user?"blue":"red";
	}
	for(var i=0;i<cells.length;i++){
		cells[i].removeEventListener('click',turnClick,false);
	}
	declareWinner(gameWon.player==user)?"You Win!":"You Lose!";
}

function emptySquares(){
	return origBoard.filter(s=> typeof s=='number');
}

function checkTie(){
	if(emptySquares().length==0){
		for(var i=0;i<cells.length;i++){
			cells[i].style.backgroundColor="green";
			cells[i].removeEventListener('click',turnClick,false);
		}
		declareWinner("Tie Game");
		return true;
	}
	return false;
}

function declareWinner(who){
	document.querySelector(".endgame").style.display="block";
	document.querySelector(".endgame .text").innerText="You Lost!";
}

function bestSpot(){
	return minimax(origBoard,ai).index;
}

function minimax(newBoard,player){
	var availSpots=emptySquares();
	if (checkWin(newBoard,user)){
		return {score:-10};
	}
	else if(checkWin(newBoard,ai)){
		return {score:10};
	}
	else if(availSpots.length===0){
		return {score:0};
	}
	var moves=[];
	for(var i=0;i<availSpots.length;i++){
		var move={};
		move.index=newBoard[availSpots[i]];
		newBoard[availSpots[i]]=player;
		if(player==ai){
			var result=minimax(newBoard,user);
			move.score=result.score;
		}
		else{
			var result=minimax(newBoard,ai);
			move.score=result.score;	
		}
		newBoard[availSpots[i]]=move.index;
		moves.push(move);
	}
	var bestMove;
	if(player===ai){
		var bestScore=-10000;
		for(var i=0;i<moves.length;i++){
			if(moves[i].score>bestScore){
				bestScore=moves[i].score;
				bestMove=i;
			}
		}
	}
	else{
		var bestScore=10000;
		for(var i=0;i<moves.length;i++){
			if(moves[i].score<bestScore){
				bestScore=moves[i].score;
				bestMove=i;
			}
		}
	}
	return moves[bestMove];
}
