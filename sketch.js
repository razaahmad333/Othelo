
let xmargin = 20;   // with respect to canvas
let ymargin = 100; // with  respect to canvas
let row = 8, col = 8, size = 80; // number of row and col,  size of cell
let board, player1 , player2;   // board is 2D array ==> keep all the cells of the board
let showDemo =true; // keeps track of whether to show demo or not
let scoreBoard, player1P, player2P;    // a div element to show scores during gamePlay


function showScoreBoard(){
	scoreBoard = createDiv('');
	scoreBoard.position(800,400);	
	let  p = createP('Score board').addClass('h1 text-primary');
	 player1P = createP(' Stones Of Computer ' + player1.stones.length).addClass(' h3 text-danger');
	 player2P = createP(' Stones Of Your ' + player2.stones.length).addClass(' h3 text-success');
	scoreBoard.addClass('shadow-lg p-3 mb-5 bg-white rounded ');
	scoreBoard.child(p);
	scoreBoard.child(player1P);
	scoreBoard.child(player2P);
	scoreBoard.child(createP('Computer takes some time to put his stone').addClass('h5 text-warning'));	
}


function setup(){
	let cnv = createCanvas(700,900);
	cnv.position(100,100);

	let newGameButton = createButton('New Game');
	newGameButton.position(800,300);
	newGameButton.addClass('btn btn-primary btn-lg');
	newGameButton.mousePressed(startNewGame);

	board = createBoard(row, col, xmargin, ymargin,size);
	player1  = new Player(0,board, row, col);
	player2  = new Player(1,board, row, col);
	player1.chance = true;
	player1.assignStonesFromCurrentBoard();
	player2.assignStonesFromCurrentBoard();
	player1.checkPossibilitiesToPlaceStones();

		showScoreBoard();

}

let arshadCount = 0;
let maxArshad = 110;

function draw(){

	background(255);
	showBoard(board);	
	arshadCount = arshadCount + 1;
	if(arshadCount>350&&showDemo){
		playAutomatically();
		arshadCount = 0;
	}

		let x = mouseX - xmargin + size;
		let y = mouseY - ymargin + size;
		let i = floor(x/size);
		let j = floor(y/size);
		if(player1.demoi!=undefined&&player1.demoj!=undefined&&player1.chance) 	player1.drawBordersAroundStonesInBetween();
		if(player2.demoi!=undefined&&player2.demoj!=undefined&&player2.chance) 	player2.drawBordersAroundStonesInBetween();
	
	if(!gameOver()){
		player1.assignStonesFromCurrentBoard();
		player2.assignStonesFromCurrentBoard();
		swapTheChance();
		drawBorders();
		player1.showPossibleCell();
		player2.showPossibleCell();
			player1P.html('Computer stones     : 	' + player1.stones.length);
			player2P.html('Your stones              	: ' + player2.stones.length);

	}

	drawBorders();
	newGame();	
	showChances();
}

function showChances(){
	noStroke();
	let txt = '';
	if(showDemo){
		txt = 'Showing Demo';
		stroke(22,22,222);
		noFill();
	}
	if(player1.chance&&!showDemo){
		fill(233,33,33);
		txt = 'Computer Chance'
	}
	if(player2.chance&&!showDemo){
		fill(23,233,33);
		txt = 'your chance'		
	}
	textSize(60);
	text(txt, 200, 80);
	ellipse(150,50, 80, 80);
}

function mousePressed(){
		let x = mouseX - xmargin + size;
		let y = mouseY - ymargin + size;
		let i = floor(x/size);
		let j = floor(y/size);

		if(i > 0 && j > 0 && i < col +1 && j < row+1){
			if(player2.chance&&!showDemo){
				if(!player2.placed&&!player1.placing){
					player2.placeAt(i, j);
				}
			}
		}
}

let cntsPlayer1 = 100;
function swapTheChance(){
	if(player1.chance&&!showDemo){
		cntsPlayer1++;
		if(!player1.placed&&cntsPlayer1>360){
			let possible = random(player1.possibleCellsToPlace);
			player1.demoi = possible.i;
			player1.demoj = possible.j;
			player1.placeAt(possible.i, possible.j);
			cntsPlayer1 = 0;
		}
	}
	if(player1.placed){
		player1.chance = false;
		player1.placed = false;
		player2.chance = true;
		player2.checkPossibilitiesToPlaceStones();
		if(player2.possibleCellsToPlace.length===0){
			player2.chance = false;
			player1.chance = true;
		}
	}
	if(player2.placed){
		player2.chance = false;
		player2.placed = false;
		player1.chance = true;
		cntsPlayer1 = 0;
		player1.checkPossibilitiesToPlaceStones();
		if(player1.possibleCellsToPlace.length===0){
			player1.chance = false;
			player2.chance = true;
		}
	}
}

function checkForWinner(){
	let player1Stones = 0;
	let player2Stones = 0;

	player1Stones = player1.stones.length;
	player2Stones = player2.stones.length;
	if(player1Stones>player2Stones){
		player1.won = true;
	}
	if(player1Stones<player2Stones){
		player2.won = true;
	}

	if(player1Stones===player2Stones){
		player1.won = true;
		player2.won = true;
	}
}

function playAutomatically(){
	if(player1.chance){
		if(!player1.placed){
			let possible = random(player1.possibleCellsToPlace);
			player1.demoi = possible.i;
			player1.demoj = possible.j;
			player1.placeAt(possible.i, possible.j);
		}
	}
	if(player2.chance){
		if(!player2.placed){
			let possible = random(player2.possibleCellsToPlace);
			player2.placeAt(possible.i, possible.j);
			player2.demoi = possible.i;
			player2.demoj = possible.j;
		}
	}
}

let count = 0;
function newGame(){
	if(gameOver()){
		textSize(70);
		fill(10);
		strokeWeight(1);
 		stroke(0);
		rect(100, 120, 500 , 400 , 20);
		noStroke();
		fill(222);
		showDemo = false;
		text('Touch To Start', 120,200);
		text('New Game', 160,300);
			count++;
				checkForWinner();

		if(player1.won&&!player2.won){
			fill(222,22,22);
			ellipse(200, 360, 80, 80);
			fill(222,222,2);
			text('Won', 250, 390);
		}
		if(player2.won&&!player1.won){
			fill(22,222,22);
			ellipse(200, 360, 80, 80);
			fill(222,222,2);
			text('Won', 250, 390);
		}
		if(player1.won&&player2.won){
			fill(222,222,2);
			text('DRAW', 230,400);
			textSize(20);
			text('Both player have same no of Stones', 180,450);
		}
		if(mouseIsPressed&&count>100){
			board = createBoard(row, col, xmargin, ymargin,size);
			player1  = new Player(0,board, row, col);
			player2  = new Player(1,board, row, col);
			player1.chance = true;
			player1.assignStonesFromCurrentBoard();
			player2.assignStonesFromCurrentBoard();
			player1.checkPossibilitiesToPlaceStones();
			count = 0;
		}
	}
}

function startNewGame(){
			board = createBoard(row, col, xmargin, ymargin,size);
			player1  = new Player(0,board, row, col);
			player2  = new Player(1,board, row, col);
			player1.chance = true;
			player1.assignStonesFromCurrentBoard();
			player2.assignStonesFromCurrentBoard();
			player1.checkPossibilitiesToPlaceStones();
			showDemo =false;
}
function gameOver(){
	for(let i = 1; i<col+1; i++){
		for(let j = 1; j<row+1; j++){
			if(board[i][j].n===2){
				return false;
			}
		}
	}
	return true;
}

function drawBorders(){
	noFill();
	stroke(0);
	strokeWeight(5);
	 rect(xmargin, ymargin, row*size, col*size, 10);

	for(let x = size+xmargin; x <col*size; x+=size){
		for(let y = size+ ymargin; y<row*size+size; y+=size){
			line(x, ymargin , x, size*row+ymargin);
			line( xmargin , y, size*col + xmargin, y);
		}
	}
}

function createBoard(col, row, xmargin, ymargin,size){
	let board = []; // board will contain all the cell for whole game
	for(let i = 0; i<col+2; i++){
		board[i] = [];
		for(let j = 0; j<row+2; j++){
			board[i][j] = new Cell(i, j, size,xmargin, ymargin)
		}
	}
	board[4][4].n = 1;
	board[5][4].n = 0;
	board[4][5].n = 0;
	board[5][5].n = 1;
	return board;
}

function showBoard(board){
	for(let i = 1; i<board.length-1; i++){
		for(let j = 1; j<board[i].length-1; j++){
			board[i][j].show();
			if(board[i][j].CanimationOn){
				board[i][j].changeStoneAnimation();
			}
		}
	}
}
