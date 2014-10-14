/**
 * TicTacToeGame.js
 * Game runner for the TicTacToe game. Requires two players
 *
 * @author Zak Henry (https://github.com/xiphiaz) - 2014
 */




;
(function(){

    var getInititalGameBoard = function(size){
        var gameBoard = [];
        for (var i = 0; i < size; i++){
            gameBoard[i] = [];
            for (var j = 0; j < size; j++){
                gameBoard[i].push(0);
            }
        }
        return gameBoard;
    };

    /**
     *
     * @param playerObjects
     * @param gameWidth
     * @constructor
     */
    this.TicTacToeGame = function (gameWidth){

        // Set defaults
        var boardSize = gameWidth,
            players = [],
            gameState = getInititalGameBoard(gameWidth)
        ;

        var initialisePlayers = function(playerObjects){

            if (playerObjects.length !== 2){
                throw "There can only be 2 players for this game";
            }

            for(var playerId = 0; playerId<playerObjects.length; playerId++){
                NewPlayer = playerObjects[playerId];
                NewPlayer.initialise(boardSize); //initialise the player
                players.push(NewPlayer);
            }


        };

        var validatePositionIndex = function(index){
            return (typeof index == 'number'
                && index >= 0
                && index < gameWidth
            );
        };

        var moveIsValid = function(position){
            if (typeof position !== 'object' || position.length !== 2){
                return false;
            }
            var x = position[0],
                y = position[1]
            ;

            if (!validatePositionIndex(x) || !validatePositionIndex(y)){
                return false;
            }

            return gameState[x][y] === 0; //field is empty
        };

        var setMove = function(player){
            var position,
                attempts = 0
                timestamp = new Date().getTime()
            ;

            // let the player make a move. check if it's valid, allow 10 failed attempts
            // valid: must be within the grid bounds
            // if the player takes too long, disqualify
            do {
                attempts ++;
                position = player.setMove(gameState);
            }while(!moveIsValid(position) && attempts < 10); //only allow 10 failed attempts

            var duration = new Date().getTime() - timestamp;
            if (duration > 50){ //allow 50ms to calculate move
                //player is too damn slow
                throw gameResult(false, null, player, false, "Player "+player.getId()+" ("+player.getName()+") took too long ("+duration+"ms) to calculate a move. Aborting");
            }

            // set the position in the grid to the player ID.
            if (moveIsValid(position)){
                gameState[position[0]][position[1]] = player.getId();
                return position;
            }
            return false;
        };

        var getGameSymbol = function(id){

            var symbolMap = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ?';

            return (id > symbolMap.length) ? symbolMap[symbolMap.length-1] : symbolMap[id];
        };

        var printGameState = function(){

            var out = '',
                spacerRow = ''
            ;
            for (var x=0;x<boardSize;x++){

                var values = [],
                    spacers = []
                ;
                for (var y=0;y<boardSize;y++){
                    values.push(getGameSymbol(gameState[y][x]));
                    spacers.push('-');
                }

                spacerRow = '+-' +spacers.join('-+-')+ '-+\n';
                out += '| ' +values.join(' | ')+ ' |\n' + spacerRow;

            }
            console.log(spacerRow + out);
        };

        var gameResult = function(success, winner, loser, draw, message){
            var winnerId = !!winner ? winner.getId() : null;
            var loserId = !!loser ? loser.getId() : null;

            return {
                success: success,
                winner: winnerId,
                loser: loserId,
                draw: draw,
                message: message
            };
        };

        var gameChecker = {

            checkColumns : function(){
                for (var i = 0; i < boardSize; i++){
                    if (gameChecker.move[1] == i){ //y = i
                        continue;
                    }
                    if (gameState[gameChecker.move[0]][i] !== gameChecker.id){
                        return false; //exit early
                    }
                }
                return true; //move was a winner!
            },
            checkRows : function(){
                for (var i = 0; i < boardSize; i++){
                    if (gameChecker.move[0] == i){ //x = i
                        continue;
                    }
                    if (gameState[i][gameChecker.move[1]] !== gameChecker.id){
                        return false; //exit early
                    }
                }
                return true; //move was a winner!
            },
            checkDiagonals : function(){

                if (!(gameChecker.move[0] == gameChecker.move[1] || gameChecker.move[0] == boardSize-1 - gameChecker.move[1])){
                    return false; //move isn't on a diagonal, exit early
                }


                //check top left to bottom right
                for (var i=0; i<boardSize; i++){
                    if (gameState[i][i] != gameChecker.id){
                        break; //not found
                    }
                    if (i == boardSize - 1){ //all checks were the matched value
                        return true; //winner found
                    }
                }

                //check top right to bottom left
                for (var i=0; i<boardSize; i++){
                    if (gameState[i][boardSize-1 - i] != gameChecker.id){
                        break; //not found
                    }
                    if (i == boardSize - 1){ //all checks were the matched value
                        return true; //winner found
                    }
                }

                return false; //no winner :(

            },
            isWinner : function(move, player){
                this.id = player.getId();
                this.move = move;
                return this.checkColumns() || this.checkRows() || this.checkDiagonals();
            }
        };

        var playGame = function(){
            var maxMoves = boardSize * boardSize, //safety net in case of runaway loop
                moveCount = 0,
                winner = false
            ;

            do{
                for(var playerIndex = 0; playerIndex<players.length; playerIndex++){

                    moveCount ++;
                    if (moveCount > maxMoves) break;

                    var thisPlayer = players[playerIndex];

                    var move = setMove(thisPlayer);

                    if (!move){
                        throw gameResult(false, null, thisPlayer, false, "Player " + thisPlayer.getId()+ " (" + thisPlayer.getName() + ") failed to post a valid move");
                    }

                    winner = gameChecker.isWinner(move, thisPlayer);

                    if (winner){
                        return gameResult(true, thisPlayer, players[Math.abs(playerIndex-1)], false, "Winner found: Player " + thisPlayer.getId()+" (" +  thisPlayer.getName()+") ["+getGameSymbol(thisPlayer.getId())+"]");
                    }

                    thisPlayer = null;


                }
            }while(moveCount <= maxMoves); //escape condition

            return gameResult(true, null, null, true, "Game is a draw");

        };

        //run the game
        this.run = function(players){

            initialisePlayers(players);

            try {

                var result = playGame();

            }catch(e){ //invalid game
                return e; //exception is structured as a valid gameResult object
            }

            printGameState();

            return result;
        }

    }; //end TicTacToeGame Constructor

})();


