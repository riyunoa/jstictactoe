/**
 * Non-optimal non-tree-based tic-tac-toe solver
 * Yes I know this code is pretty disgusting
 * @author Gillian Ng
 */

function RowStatusHelper() {
    this.numSquaresFilledByMe = 0;
    this.isBlocked = 0;
    this.emptySquares = [];
}

var Gillian = (function(playerTemplate){

    return function(){
        this.prototype = Object.create(playerTemplate.prototype); //inherit from parent
        playerTemplate.apply(this, arguments); // run constructor with args

        this.getName = function(){
            return 'Gillian';
        };

        this.setMove = function(GameState){ //override function call
            //console.log("GameState: " + GameState);

            var move = this.checkLastMove(GameState);

            //console.log("after check move");
            //check if lastMove is an array and return that position
            if (move != 0) {
                //console.log("last move");
                return move;
            }

            //console.log("before get opp win");
            var rowStatusArr = new Array();
            //check if the opponent is one move away from winning and block that
            move = this.getOppWin(GameState, rowStatusArr);

            //console.log("row status arr after function");
            //console.dir(rowStatusArr);

            //console.log("after get opp win");
            //get my id:
            //console.log("My Id: " + this.getId() );

            //console.log("board: " + GameState.length + " X " + GameState[0].length);

            //just pick the first empty square
            var emptySquare = [0,0];
            var maxMySquares = -1;
            var index = -1;

            for (var i = 0; i < rowStatusArr.length; i++) {
                if (!rowStatusArr[i].isBlocked && (rowStatusArr[i].numSquaresFilledByMe > maxMySquares) && (rowStatusArr[i].emptySquares.length > 0)) {
                    maxMySquares = rowStatusArr[i].numSquaresFilledByMe;
                    index = i;
                }

                if ( rowStatusArr[i].emptySquares.length > 0 ) {
                    emptySquare = rowStatusArr[i].emptySquares[0];
                }
            }

            var middle = Math.floor(GameState.length/2);
            //if i am one square away from winning, do it
            if (maxMySquares == (GameState.length-1))
            {
                return rowStatusArr[index].emptySquares[0];
            }
            else if (move != 0) //if the opponent is one square away from winning
            {
                //console.log("opponents last move!");
                //console.log(move);
                //console.log("maxmysquares: " + maxMySquares)
                //console.dir(rowStatusArr);
                return move;
            }
            else if (maxMySquares > 0) { // try to fill in my longest streak
                return rowStatusArr[index].emptySquares[0];
            } else if (GameState[middle][middle] == 0) { //try to fill in the middle square
                return [middle, middle];
            }

            return emptySquare;
        };

        //check if there is only one square left to fill and fill it in if so
        this.checkLastMove = function(GameState) {
            var emptyX = -1, emptyY = -1;
            var zeroCount = 0;
            for (var x=0; x < GameState.length; x++) {
                for (var y=0; y < GameState.length; y++) {
                    if (GameState[x][y] == 0){
                        zeroCount++;
                        emptyX = x;
                        emptyY = y;

                        //if found more than 1 empty square then return.
                        if (zeroCount > 1) {
                            return 0; // ***can JS check for this?
                        }
                    }
                }
            }

            if (zeroCount == 1) {
                return [emptyX, emptyY];
            }
        }

        //get the opponent's winning move
        this.getOppWin = function (GameState, rowStatusArr) {
            //console.log("getOppWin start -------");
            //console.log("arr length: " + rowStatusArr.length);
            //console.log("before");
            //console.dir(rowStatusArr);
            //console.log("after");
            //check opponent's rows
            var oppCount = 0;
            var oppWinX = -1, oppWinY = -1;
            var oppWinRet = -1;

            //console.log("iterating cols");
            //iterate through columns
            for (var x=0; x < GameState.length; x++) {
                rowStatusArr.push(new RowStatusHelper());
                //console.log("rowStatusArr after pushing " + rowStatusArr.length);
                //console.log("row status helper");
                //console.log(rowStatusArr[rowStatusArr.length-1]);

                for (var y=0; y < GameState.length; y++) {
                    if ( (GameState[x][y] != 0) && (GameState[x][y] != this.getId()) ){
                        oppCount++;
                        rowStatusArr[rowStatusArr.length-1].isBlocked = 1;
                        //console.log("opp square: " + x + " " + y);
                    } else if (GameState[x][y] == 0) { //keep track of the last empty square in this row
                        oppWinX = x;
                        oppWinY = y;
                        //console.log("empty square: " + x + " " + y);
                        rowStatusArr[rowStatusArr.length-1].emptySquares.push([x, y]);
                    }
                    else if (GameState[x][y] == this.getId()) {
                        //console.log("my square: " + x + " " + y);
                        rowStatusArr[rowStatusArr.length-1].numSquaresFilledByMe += 1;
                    }
                }

                if ((oppCount == (GameState.length - 1)) && (rowStatusArr[rowStatusArr.length-1].emptySquares.length > 0)) {
                    //console.log("block row " + oppWinX + " " + oppWinY);
                    //filling in this column will cause the opponent to win in the next turn. MUST block the move!
                    oppWinRet = [oppWinX, oppWinY];

                }

                oppCount = 0;
            }

            //console.log("iterating rows");
            oppCount = 0;
            //check opponent's rows
            for (var y=0; y < GameState.length; y++) {
                rowStatusArr.push(new RowStatusHelper());

                for (var x=0; x < GameState.length; x++) {
                    if ((GameState[x][y] != 0) && (GameState[x][y] != this.getId())){
                        oppCount++;
                        //console.log("opp square: " + x + " " + y);
                        rowStatusArr[rowStatusArr.length-1].isBlocked = 1;
                    } else if (GameState[x][y] == 0) {
                        oppWinX = x;
                        oppWinY = y;
                        rowStatusArr[rowStatusArr.length-1].emptySquares.push([x, y]);
                        //console.log("empty square: " + x + " " + y);
                    } else if (GameState[x][y] == this.getId()) {
                        rowStatusArr[rowStatusArr.length-1].numSquaresFilledByMe += 1;
                        //console.log("my square: " + x + " " + y);
                    }
                }

                if ( (oppCount == (GameState.length - 1)) && (rowStatusArr[rowStatusArr.length-1].emptySquares.length > 0) ) {
                    //console.log("block col");
                    //filling in this col will cause the opponent to win in the next turn. MUST block the move!
                    oppWinRet = [oppWinX, oppWinY];
                }
                oppCount = 0;
            }

            //console.log("iterating diag1");
            oppCount = 0;
            rowStatusArr.push(new RowStatusHelper());

            //check diagonal from top left to bottom right
            for (var i=0; i < GameState.length; i++) {
                if ((GameState[i][i] != 0) && (GameState[i][i] != this.getId())){
                    oppCount++;
                    rowStatusArr[rowStatusArr.length-1].isBlocked = 1;
                    //console.log("opp square: " + i + " " + i);
                } else if (GameState[i][i] == 0) {
                    oppWinX = i;
                    oppWinY = i;
                    rowStatusArr[rowStatusArr.length-1].emptySquares.push([i, i]);
                    //console.log("empty square: " + i + " " + i);
                } else if (GameState[i][i] == this.getId()) {
                    rowStatusArr[rowStatusArr.length-1].numSquaresFilledByMe += 1;
                    //console.log("my square: " + i + " " + i);
                }
            }

            if ( (oppCount == (GameState.length - 1)) && (rowStatusArr[rowStatusArr.length-1].emptySquares.length > 0) ) {
                //console.log("block diag1");
                //filling in this col will cause the opponent to win in the next turn. MUST block the move!
                oppWinRet = [oppWinX, oppWinY];
            }

            //console.log("iterating diag2");
            oppCount = 0;
            rowStatusArr.push(new RowStatusHelper());
            var j = -1;
            //check the other diagonal
            for (var i=0; i < GameState.length; i++) {
                j = GameState.length-i-1;
                if ((GameState[i][j] != 0) && (GameState[i][j] != this.getId())) {
                    oppCount++;
                    rowStatusArr[rowStatusArr.length-1].isBlocked = 1;
                    //console.log("opp square: " + i + " " + j);
                } else if (GameState[i][j] == 0) {
                    oppWinX= i;
                    oppWinY = j;
                    rowStatusArr[rowStatusArr.length-1].emptySquares.push([i,j]);
                    //console.log("empty square: " + i + " " + j);
                } else if (GameState[i][j] == this.getId()) {
                    rowStatusArr[rowStatusArr.length-1].numSquaresFilledByMe += 1;
                    //console.log("my square: " + i + " " + j);
                }
            }

            if ( (oppCount == (GameState.length - 1)) && (rowStatusArr[rowStatusArr.length-1].emptySquares.length > 0) ) {
                //console.log("blog diag2");
                oppWinRet = [oppWinX, oppWinY];
            }

            if (oppWinRet != -1) {
                return oppWinRet;
            }

            return 0; //return 0 if it's not the opponent's last move next turn
        }
    };

}(DefaultPlayer)); //Pass in the parentTemplate dependency