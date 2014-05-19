
TournamentRunner = (function(){

    return function(GameClass, players){

        var playerCount = players.length,
            tournamentPlayers = []
        ;

        for (var i=0; i<playerCount; i++){

            var newPlayer = new players[i](i+1);
            tournamentPlayers.push({
                player: newPlayer,
                wins: 0,
                losses: 0,
                draws: 0
            });
        }

        var generateRoundRobin = function(playerCount){

            var rounds = [];

            for (var i=0; i<playerCount; i++){
                for (var j=0; j<playerCount; j++){
                    if (i<=j){
                        continue;
                    }
                    rounds.push([i,j]);
                }
            }
            return rounds;
        };

        this.run = function(){

            var rounds = generateRoundRobin(playerCount);

            for (var i=0; i<rounds.length; i++){

                var game = new GameClass(3);

                var player1 = tournamentPlayers[rounds[i][0]],
                    player2 = tournamentPlayers[rounds[i][1]];

                for (var gameId=0; gameId<100; gameId++){

                    var result = game.run([player1.player, player2.player]);

                    if (result.winner){
                        if (result.winner == player1.player.getId())   player1.wins++;
                        if (result.winner == player2.player.getId())   player2.wins++;
                    }

                    if (result.loser){
                        if (result.loser == player1.player.getId())   player1.losses++;
                        if (result.loser == player2.player.getId())   player2.losses++;
                    }

                    if (result.draw === true){
                        player1.draws ++;
                        player2.draws ++;
                    }

                }

                console.log('Game ran: '+ player1.player.getName() + " v " + player2.player.getName() + ", result was ", result);
            }

            console.log('Players', tournamentPlayers);

        };

    };
}());