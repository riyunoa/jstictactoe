/**
 * TicTacToeGame.js
 * Game runner for the TicTacToe game. Requires two players
 *
 * @author Zak Henry (https://github.com/xiphiaz) - 2014
 */




;
(function(){

    /**
     *
     * @param playerObjects
     * @param gameWidth
     * @constructor
     */
    this.TicTacToeGame = function (gameWidth){

        var boardSize = gameWidth,
            players = [],
            gameState = []
        ;

        var reset = function(){
            for (var i = 0; i < boardSize; i++){
                gameState[i] = [];
                for (var j = 0; j < boardSize; j++){
                    gameState[i].push(0);
                }
            }
        };


        var initialisePlayers = function(playerObjects){

            for(var playerId = 0; playerId<playerObjects.length; playerId++){
                NewPlayer = playerObjects[playerId];

                NewPlayer.initialise(boardSize); //initialise the player
                players.push(NewPlayer);
            }

        };

        var moveIsValid = function(position){
            return gameState[position[0]][position[1]] === 0; //field is empty
        };

        var setMove = function(player){
            var position,
                attempts = 0;

            do {
                attempts ++;
                position = player.setMove(gameState);
            }while(!moveIsValid(position) && attempts < 100); //only allow 5 failed attempts

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

                console.log('Win on vertical');
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

                console.log('Win on horizontal');
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
                        console.log('Win on diagonal');
                        return true; //winner found
                    }
                }

                //check top right to bottom left
                for (var i=0; i<boardSize; i++){
                    if (gameState[i][boardSize-1 - i] != gameChecker.id){
                        break; //not found
                    }
                    if (i == boardSize - 1){ //all checks were the matched value
                        console.log('Win on diagonal');
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
                lastMove,
                lastPlayer,
                winner = false
            ;

            reset();

            do{
                for(var playerIndex in players){

                    moveCount ++;
                    if (moveCount > maxMoves) break;

                    var thisPlayer = players[playerIndex];

                    lastMove = setMove(thisPlayer);

                    if (!lastMove){
                        return {
                            success: false,
                            loser: thisPlayer.getId(),
                            message: "Player " + thisPlayer.getId()+ " (" + thisPlayer.getName() + ") failed to post a valid move"
                        }
                    }

                    winner = gameChecker.isWinner(lastMove, thisPlayer);


                    if (winner){
                        return {
                            success: true,
                            winner: thisPlayer.getId(),
                            loser: lastPlayer.getId(), //this should be refactored to make the game two player ONLY
                            message: "Winner found: Player " + thisPlayer.getId()+" (" +  thisPlayer.getName()+") ["+getGameSymbol(thisPlayer.getId())+"]"
                        }
                    }

                    lastPlayer = thisPlayer;


                }
            }while(moveCount <= maxMoves); //escape condition

            return {
                success: true,
                winner: null,
                draw: true,
                message: "Game is a draw"
            }

        };

        this.run = function(players){

            initialisePlayers(players);

            var result = playGame();

            printGameState();

            reset();

            return result;

        }

    }; //end TicTacToeGame Constructor

})();


