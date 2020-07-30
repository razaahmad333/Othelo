class Player{
	constructor(n, board, row, col){
		this.n = n; // n = 0 for red , n = 1 for green and act as its id
		this.won = false; // true when he wons 
		this.row = row;	
		this.col = col;

		this.chance = false;
		this.placed = false; // true when he placed his stones
		this.stones = [];   
		this.placedAtCell = undefined;
		this.board = board;
		this.possibleCellsToPlace = [];
		this.demoi = undefined;  // used when showing demo 
		this.demoj = undefined; // used when showing demo
		this.placing = false;   // duration between he got chance and he placed
	}

	drawBordersAroundStonesInBetween(i=this.demoi,  j = this.demoj){
		if(i>0&&j>0&&i<this.row+1&&j<this.col+1){
		for(let cell of this.board[i][j].parentStone){
			if(true){
				strokeWeight(10);
				stroke(0);

				let xx = (cell.i*size+xmargin-size + i*size+xmargin-size)/2;
				let yy= (cell.j*size+ymargin-size + j*size+ymargin-size)/2;

				let dx = cell.i*size - i*size;
				let dy = cell.j*size - j*size;

				let len = sqrt(dx*dx + dy*dy);

				let angle = Math.atan(dy/dx);
				push();
				translate(xx + size/2, yy+size/2);
				rotate(angle);
				rectMode(CENTER);
				noFill();
				stroke(22,22,222);
				strokeWeight(6);
				rect(0, 0, len+1.5*size, 105, 30);
				pop();
			}
		}
	}

	}

	showPossibleCell(){
		let x = mouseX - xmargin + size;
		let y = mouseY - ymargin + size;
		let i = floor(x/size);
		let j = floor(y/size);

		if(this.chance){
					this.drawBordersAroundStonesInBetween(i, j);
				if(this.placedAtCell!=undefined&&!this.placed){
					this.placedAtCell.gotStoneAnimation(this.n, this); // plays animation of growing stones when player places stone
					this.placedAtCell.placedByPlayer(this.n, this);   // converts opposition intermediate stones
			}
			for(let cell of this.possibleCellsToPlace){
				cell.showAsOptions(this.n);
			}
		}
	}
	placeAt(i, j){
		if(this.possibleCellsToPlace.includes(this.board[i][j])){
			this.board[i][j].placedByPlayer(this.n, this);
			this.placedAtCell = this.board[i][j];
			this.placedAtCell.animationOn = true;
			maxArshad = this.placedAtCell.toChange[this.n].length*100;
			this.placing = true;
			this.board[i][j].n = this.n	;
		}
	}

	checkPossibilitiesToPlaceStones(){
			for(let cell of this.possibleCellsToPlace){
				cell.parentStone = [];
			}
		this.possibleCellsToPlace = [];

		for(let stone of this.stones){
			this.checkPossibleCell(stone);
		}

	}

	checkPossibleCell(stone){
		// console.log('dd');
		for(let dx = -1; dx<=1; dx++){
			for(let dy = -1; dy<=1; dy++){
				if(dx + stone.i < this.col + 1 &&  dx + stone.i  > 0 && dy + stone.j < this.row +1&& dy + stone.j > 0){
					if(this.board[ dx + stone.i ][ dy + stone.j ].n === 1 - this.n){
						this.goFurther( stone.i , stone.j, dx , dy, stone);
					}
				}
			}
		}
	}

	goFurther(ii, jj, dx, dy, parentStone){
		let toChange = [];
		toChange.push(this.board[ii+dx][jj+dy]);
		let i = ii + 2*dx;
		let j = jj + 2*dy;

		if(i> 0&&i<this.col+1&&j > 0&&j<this.row+1){
			let count = 0;
			while( this.board[i][j].n  === 1 - this.n){
				toChange.push(board[i][j]);
					 i = i + dx;
					 j = j + dy;
					 count++;
					if(i < 1 && i > this.col && j < 1 && j > this.row){
						break;
					}
				if(i > 0 && i < this.col+1 && j > 0 && j < this.row+1){

					if(this.board[i][j].n!=1-this.n){
						break;
					}
					if(this.board[i][j].n === this.n){
						return;
					}
				}
					if(count>100){
						break;
					}
			}					
		}
		// console.log(toChange.length);
				if(i > 0 && i < this.col+1 && j > 0 && j < this.row+1){

		this.toChangeLength =toChange.length;
		this.board[i][j].toChange[this.n] = this.board[i][j].toChange[this.n].concat(toChange); // toChange contains those stone which would be converted
		if(this.board[i][j].n ===2){
			this.board[i][j].parentStone.push(parentStone); /// parentStone is from where this cell is selected as possible cell
		this.possibleCellsToPlace.push(this.board[i][j]);
	}
}
	}

	assignStonesFromCurrentBoard(){
		this.stones = [];
		for(let i = 1; i<this.col+1; i++){
			for(let j = 1; j<this.row+1; j++){
				if(this.board[i][j].n === this.n){
					this.stones.push(this.board[i][j]);
				}
			}
		}
	}
}