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

        var boardSize = 3,
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

        var setMove = function(player, position){
            if (moveIsValid(position)){
                gameState[position[0]][position[1]] = player.playerId;
            }
            return false;
        };

        var getGameSymbol = function(id){
            switch(id){
                case 0:
                    return ' ';
                    break;
                case 1:
                    return 'X';
                break;
                case 2:
                    return 'O';
                break;
                default:
                    return '?'
                break
            }
        };

        var printGameState = function(){
            console.log(
                '+---+---+---+\n' +
                '| '+getGameSymbol(gameState[0][0])+' | '+getGameSymbol(gameState[1][0])+' | '+getGameSymbol(gameState[2][0])+' |\n' +
                '+---+---+---+\n' +
                '| '+getGameSymbol(gameState[0][1])+' | '+getGameSymbol(gameState[1][1])+' | '+getGameSymbol(gameState[2][1])+' |\n' +
                '+---+---+---+\n' +
                '| '+getGameSymbol(gameState[0][2])+' | '+getGameSymbol(gameState[1][2])+' | '+getGameSymbol(gameState[2][2])+' |\n' +
                '+---+---+---+\n'
            )
        };

        this.run = function(){

            initialisePlayers();

            var player = players[1];

            var move = player.setMove(gameState);

            setMove(player,move);

            console.log('game state test', gameState);

            printGameState();

        }

    }; //end TicTacToeGame Constructor

})();


