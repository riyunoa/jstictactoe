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
    this.TicTacToeGame = function (playerObjects, gameWidth){

        var boardSize = gameWidth,
            players = [],
            gameState = [[0,0,0],[0,0,0],[0,0,0]]
        ;

        var initialisePlayers = function(){

            for(var playerId = 0; playerId<playerObjects.length; playerId++){
                NewPlayer = playerObjects[playerId];

                players.push(
                    new NewPlayer(playerId + 1, boardSize)
                ); //initialise the player
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
            }while(!moveIsValid(position) && attempts < 5); //only allow 5 failed attempts

            if (moveIsValid(position)){
                gameState[position[0]][position[1]] = player.playerId;
                return true;
            }
            return false;
        };

        var getGameSymbol = function(id){

            var symbolMap = ' XO?';

            return (id > symbolMap.length) ? symbolMap[symbolMap.length-1] : symbolMap[id];
        };

        var printGameState = function(){
            var a = getGameSymbol(gameState[0][0]),
                b = getGameSymbol(gameState[1][0]),
                c = getGameSymbol(gameState[2][0]),
                d = getGameSymbol(gameState[0][1]),
                e = getGameSymbol(gameState[1][1]),
                f = getGameSymbol(gameState[2][1]),
                g = getGameSymbol(gameState[0][2]),
                h = getGameSymbol(gameState[1][2]),
                i = getGameSymbol(gameState[2][2])
            ;
            console.log(
                '+---+---+---+\n' +
                '| '+a+' | '+b+' | '+c+' |\n' +
                '+---+---+---+\n' +
                '| '+d+' | '+e+' | '+f+' |\n' +
                '+---+---+---+\n' +
                '| '+g+' | '+h+' | '+i+' |\n' +
                '+---+---+---+\n'
            )
        };

        var gameComplete = function(){
            return false;
        };

        var playGame = function(){
            var maxMoves = boardSize * boardSize, //safety net in case of runaway loop
                moveCount = 0;

            do{
                for(var playerIndex in players){

                    moveCount ++;
                    if (moveCount > maxMoves) break;

                    var thisPlayer = players[playerIndex];

                    if (!setMove(thisPlayer)){
                        return {
                            success: false,
                            reason: thisPlayer.name + " failed to post a valid move"
                        }
                    }

                    console.clear();
                    console.log('game state', gameState);
                    console.log('move count', moveCount);
                    printGameState();
                }
            }while(!gameComplete() && moveCount <= maxMoves);



        };

        this.run = function(){

            initialisePlayers();

            var result = playGame();

            if (!result.success){
                console.error("Game failed: " + result.reason);
            }

        }

    }; //end TicTacToeGame Constructor

})();


