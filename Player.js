/**
 * Player.js
 * Dummy player for TicTacToeGame.js
 *
 * @author Zak Henry (https://github.com/xiphiaz) - 2014
 */

/*
GameState - representation of the game board
format:

var GameState = [
    [2, 0, 1],
    [2, 2, 1],
    [1, 1, 2]
];
represents
+---+---+---+
| O |   | X |
+---+--+---+
| O | O | X |
+---+---+---+
| X | X | O |
+---+---+---+
Note: 0 is no move, numbers 1 - n are the player ids
*/

Player = (function(){

    //Private helper functions
    var randBetween = function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Constructor function
     * @param playerNumber
     * @param boardSize
     */
    return function(playerId, boardSize){

        var thisPlayer = this;

        this.playerId = playerId; //make it public
        this.name = 'Zak';

        /**
         * Receives the game state
         * @param GameState
         * @returns {*[]}
         */
        this.setMove = function(GameState){

            var x = randBetween(0,boardSize-1),
                y = randBetween(0,boardSize-1)
            ;
            return [x, y];

        };

    };

})();