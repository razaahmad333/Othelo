class Cell{
	constructor( i , j , size, xmargin, ymargin) {
		this.toChange = [];
		this.i = i;  // cell x position can be evaluated by =  this.i*this.size + xmargin
		this.j = j;  // cell y position can be evaluated by =  this.j*this.size + ymargin
		this.n = 2;  // n = 0 player1 (black) , n = 1 green player2 , n = 2 for empty cell
		this.xmargin = xmargin;
		this.ymargin = ymargin;

		this.animationOn = false; // when stone is placed then it controls animation	
		this.countToChange = 0;  // counter for showing its converting animation
		this.parentStone = [];  
		this.size = size;
		this.notOn = true;   
		
		this.ordinaryShow = true;
		this.animationCounter = 0;
		this.CanimationCounter = 0;
		this.CanimationOn = false;
		this.cn = 0;
		this.toChange[0] = []; /// this array contains oppostion's stones whose stones would be changed to n = 0 when player0 places its stone on this  cell 
		this.toChange[1] = []; /// this array contains oppostion's stones whose stones would be changed to n = 1 when player1 places its stone on this  cell 
	}
	showAsOptions(n){ // player call to show his possible options to put his stones
		noStroke();
		strokeWeight(2);
		if(n===0) fill(222,22,22,50);
		if(n===1) fill(22,222,22,50);
		fill(11,11,111,50);
		ellipse((this.i-1)*this.size + this.xmargin + 0.5*this.size, (this.j-1)*this.size + this.ymargin  + 0.5*this.size, 0.8*this.size ,0.8*this.size );

	}
	gotStoneAnimation(n, player){
		noStroke();
		if(n===0) fill(200, 22,22);
		if(n===1) fill(20,220,20);
		this.ordinaryShow = false;
		this.animationCounter++;
		if(this.animationCounter<100){
		ellipse((this.i-1)*this.size + this.xmargin + 0.5*this.size, (this.j-1)*this.size + this.ymargin  + 0.5*this.size, 0.8*this.size*0.01*this.animationCounter ,0.8*this.size*0.01*this.animationCounter );
		}
		if(this.animationCounter>100){
			this.animationCounter = 0;
			this.ordinaryShow = true;
			this.animationOn = false;
		}
	}

	changeStoneAnimation(){
		noStroke();
		if(this.cn===0) fill(200, 22,22);
		if(this.cn===1) fill(20,220,20);
		this.ordinaryShow = false;
		this.CanimationCounter++;
		if(this.CanimationCounter<100){
		ellipse((this.i-1)*this.size + this.xmargin + 0.5*this.size, (this.j-1)*this.size + this.ymargin  + 0.5*this.size, 0.8*this.size*0.01*this.CanimationCounter ,0.8*this.size*0.01*this.CanimationCounter );
		}
		if(this.CanimationCounter>100){
			this.CanimationCounter = 0;
			this.ordinaryShow = true;
			this.CanimationOn = false;
		}
	}
	show(){
		noStroke();
		// this.ordinaryShow = true;
		if(this.n===0)  fill(222,2,0);
		if(this.n===1)  fill(0,200,2);
		if(this.n===2)  noFill();
		if(this.ordinaryShow)	ellipse((this.i-1)*this.size + this.xmargin + 0.5*this.size, (this.j-1)*this.size + this.ymargin  + 0.5*this.size, 0.8*this.size ,0.8*this.size );
	}

	placedByPlayer(n, player){
		// console.log(n);
		this.countToChange+=1;

		if(this.countToChange>80&&!this.animationOn){
		for(let cell of this.toChange[n]){
			cell.n = n;
			if(cell.notOn){
			cell.CanimationCounter = 0;
			cell.cn = n;
			cell.CanimationOn = true;
			cell.notOn = false;
			// console.log(n);
		}
		}

		let cnt = 0;
		for(let singleCell of this.toChange[n]){
			if(!singleCell.CanimationOn){
			     cnt+=1;
			}
		}
		if(cnt === this.toChange[n].length){
			for(let c of this.toChange[n]) c.notOn = true;
		this.countToChange = 0;
		changeEmpty();
		player.placed = true;
		player.placing = false;
		for(let cell of player.possibleCellsToPlace){
			cell.parentStone = [];
		}
		player.placedAtCell.parentStone = [];
		// this.notOn = true;
		player.placedAtCell = undefined;
	}
	}
	}
}

function changeEmpty(){
for(let i =  1; i<col+1; i++){
	for(let j = 1; j<row+1; j++){
		board[i][j].toChange[0] = [];
		board[i][j].toChange[1] = [];
	}
}
}