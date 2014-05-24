
TournamentRunner = (function(){

    var padTrimString =function(value, length, char, leftPad) {

        if (value.length > length){
            return value.slice(0, length);
        }

        if (value.toString().length < length){
            var newVal = leftPad ? char+value : value+char;
            return padTrimString(newVal, length, char, leftPad);
        }
        return value;
    };

    var formatPlayerDisplay = function(player, roundId){
        var playerName = '(bye)';
        if (!!player && typeof player == 'object'){
            var score = '-';
            if (typeof player.eliminationRound[roundId] !== 'undefined'){ //player might not have played the round
                score = player.eliminationRound[roundId].score
            }

            playerName = player.player.getName() +" "+score;
        }

        return padTrimString(playerName, 10, ' ');
    };

    var printTournamentBoard = function(seedingResults, eliminationResults){

        var header =
            " _____ _        _____            _____          \n"+
            "|_   _(_) ___  |_   _|_ _  ___  |_   _|__   ___\n"+
            "  | | | |/ __|   | |/ _` |/ __|   | |/ _ \\ / _ \\\n"+
            "  | | | | (__    | | (_| | (__    | | (_) |  __/\n"+
            "  |_| |_|\\___|   |_|\\__,_|\\___|   |_|\\___/ \\___|\n"+

            "_____                                                 _\n"+
            "|_   _|__  _   _ _ __ _ __   __ _ _ __ ___   ___ _ __ | |_\n"+
            "  | |/ _ \\| | | | '__| '_ \\ / _` | '_ ` _ \\ / _ \\ '_ \\| __|\n"+
            "  | | (_) | |_| | |  | | | | (_| | | | | | |  __/ | | | |_\n"+
            "  |_|\\___/ \\__,_|_|  |_| |_|\\__,_|_| |_| |_|\\___|_| |_|\\__|\n"
        ;

        console.log(header);

        var seedingTemplate = 
            "+------+------------+------+-------+--------+--------+\n"+
            "| Rank | Name       | Wins | Draws | Losses | Points |\n"+
            "+------+------------+------+-------+--------+--------+\n";

        var logArgs = [];

        for (var i = 0; i<seedingResults.length; i++){

            var playerRef = seedingResults[i];

            if (!playerRef) continue;

            logArgs.push.apply(logArgs, [
                padTrimString(i+1, 2, ' ', true),
                padTrimString(playerRef.player.getName(), 10, ' ', false),
                padTrimString(playerRef.seedingRound[0].wins, 3, ' ', true),
                padTrimString(playerRef.seedingRound[0].draws, 3, ' ', true),
                padTrimString(playerRef.seedingRound[0].losses, 3, ' ', true),
                padTrimString(playerRef.seedingRound[0].score, 3, ' ', true)
            ]);

            seedingTemplate +=
                "|  %s  | %s |  %s |  %s  |    %s |    %s |\n"+
                "+------+------------+------+-------+--------+--------+\n" ;

        }

        logArgs.unshift(seedingTemplate); //push the template to the front

        console.log.apply(console, logArgs);

        var tournamentTemplate =
            "\nSeed\n"+
            "1 | %s\n" +
            "----------------\\\n" +
            "16| %s  | %s\n" +
            "                |\n" +
            "                |--------------\\\n" +
            "                |              |\n" +
            "8 | %s  | %s   |\n" +
            "----------------/              |\n" +
            "9 | %s                 | %s\n" +
            "                               |\n" +
            "                               |------------------\\\n" +
            "                               |                  |\n" +
            "4 | %s                 | %s       |\n" +
            "----------------\\              |                  |\n" +
            "13| %s  | %s   |                  |\n" +
            "                |              |                  |\n" +
            "                |--------------/                  |\n" +
            "                |                                 |\n" +
            "5 | %s  | %s                      |\n" +
            "----------------/                                 |\n" +
            "12| %s                                    | %s\n" +
            "                                                  |\n" +
            "                                                  |----------------------- %s\n" +
            "                                                  |\n" +
            "2 | %s                                    | %s\n" +
            "----------------\\                                 |\n" +
            "15| %s  | %s                      |\n" +
            "                |                                 |\n" +
            "                |--------------\\                  |\n" +
            "                |              |                  |\n" +
            "7 | %s  | %s   |                  |\n" +
            "----------------/              |                  |\n" +
            "10| %s                 | %s       |\n" +
            "                               |                  |\n" +
            "                               |------------------/\n" +
            "                               |\n" +
            "3 | %s                 | %s\n" +
            "----------------\\              |\n" +
            "14| %s  | %s   |\n" +
            "                |              |\n" +
            "                |--------------/\n" +
            "                |\n" +
            "6 | %s  | %s\n" +
            "----------------/\n" +
            "11 | %s\n" +
            "\n"
            ;

        console.log(tournamentTemplate,
            formatPlayerDisplay(eliminationResults[0][0], 0),
            formatPlayerDisplay(eliminationResults[0][1], 0),
            formatPlayerDisplay(eliminationResults[1][0], 1),
            formatPlayerDisplay(eliminationResults[0][2], 0),
            formatPlayerDisplay(eliminationResults[1][1], 1),
            formatPlayerDisplay(eliminationResults[0][3], 0),
            formatPlayerDisplay(eliminationResults[2][0], 2),
            formatPlayerDisplay(eliminationResults[0][4], 0),
            formatPlayerDisplay(eliminationResults[2][1], 2),
            formatPlayerDisplay(eliminationResults[0][5], 0),
            formatPlayerDisplay(eliminationResults[1][2], 1),
            formatPlayerDisplay(eliminationResults[0][6], 0),
            formatPlayerDisplay(eliminationResults[1][3], 1),
            formatPlayerDisplay(eliminationResults[0][7], 0),
            formatPlayerDisplay(eliminationResults[3][0], 3),
            formatPlayerDisplay(eliminationResults[4][0], 4),
            formatPlayerDisplay(eliminationResults[0][8], 0),
            formatPlayerDisplay(eliminationResults[3][1], 3),
            formatPlayerDisplay(eliminationResults[0][9], 0),
            formatPlayerDisplay(eliminationResults[1][4], 1),
            formatPlayerDisplay(eliminationResults[0][10], 0),
            formatPlayerDisplay(eliminationResults[1][5], 1),
            formatPlayerDisplay(eliminationResults[0][11], 0),
            formatPlayerDisplay(eliminationResults[2][2], 2),
            formatPlayerDisplay(eliminationResults[0][12], 0),
            formatPlayerDisplay(eliminationResults[2][3], 2),
            formatPlayerDisplay(eliminationResults[0][13], 0),
            formatPlayerDisplay(eliminationResults[1][6], 1),
            formatPlayerDisplay(eliminationResults[0][14], 0),
            formatPlayerDisplay(eliminationResults[1][7], 1),
            formatPlayerDisplay(eliminationResults[0][15], 0)
        );
    };

    return function(GameClass, players, CONFIG){

        var playerCount = players.length,
            tournamentPlayers = []
        ;

        // initialise players
        for (var i=0; i<playerCount; i++){
            tournamentPlayers.push({
                player: new players[i](i+1)
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

        var generateElimination = function(playerCount){

            var getRound = function(playersInRound, matches){
                var newMatches = [];
                matches.forEach(function(playerOrMatch){
                    if (typeof playerOrMatch == 'number'){
                        newMatches.push([playerOrMatch, playersInRound+1-playerOrMatch]);
                    }else{
                        newMatches.push(getRound(playersInRound, playerOrMatch));
                    }

                });
                return newMatches;
            };

            var flattenList = function(matches, playerList){
                matches.forEach(function(playerOrMatch){
                    if (typeof playerOrMatch =='number'){
                        playerList.push(playerOrMatch);
                    }else{
                        flattenList(playerOrMatch, playerList);
                    }
                });
                return playerList;
            };

            var roundCount = Math.log(playerCount) / Math.log(2); //get log2(playerCount)
            if (Math.floor(roundCount) !== roundCount){
                console.error("Player count must be a power of 2");
            }
            var playersInRound = 1, //winning player to work backwards from
                matches = [1]
            ;
            while(playersInRound != playerCount){
                playersInRound *= 2;
                matches = getRound(playersInRound, matches);
            }

            return flattenList(matches, []);

        };



        var sortPlayersForSeeding = function(players, seedingCount){
            var orderedPlayers = players.sort(function(a, b){
                return b.seedingRound[0].score - a.seedingRound[0].score;
            });

            if  (orderedPlayers.length > seedingCount) {
                orderedPlayers = orderedPlayers.slice(0, seedingCount); //chop out players that didn't qualify
            }

            while (orderedPlayers.length != seedingCount){
                orderedPlayers.push(null); //pad it out
            }

            var seededPlayers = [];

            var seedOrder = generateElimination(seedingCount);
            for (var i = 0; i<seedOrder.length; i++){
                seededPlayers[i] = orderedPlayers[seedOrder[i] - 1];
            }

            return seededPlayers;
        };

        var calculatePlayerScores = function(players, roundName, roundId){
            var win = 3,
                draw = 1,
                loss = -1
            ;
            for (var playerId=0; playerId<players.length;playerId++){
                var player = players[playerId][roundName][roundId];
                player.score =
                    (player.wins * win) +
                    (player.draws * draw ) +
                    (player.losses * loss);
            }
        };

        var initialisePlayerScores = function(players, roundName, roundId){
            for (var playerId=0; playerId<players.length;playerId++){

                var player = players[playerId];

                if (typeof player[roundName] == 'undefined'){
                    player[roundName] = [];
                }

                player[roundName][roundId] = {
                    wins: 0,
                    losses: 0,
                    draws: 0,
                    score: 0,
                    games: 0
                };
            }
        };
        
        var runPlayerMatch = function(player1, player2, roundName, roundId, matchCount){

            var fixture = player1.player.getName() + " v " + player2.player.getName();

            console.groupCollapsed(fixture);

            for (var gameId=0; gameId<matchCount; gameId++){

                var game = new GameClass(3);

                //switch player 1 position every second game, as tic tac toe is biased to the first player
                var playerArray = (gameId % 2) ? [player1.player, player2.player] : [player2.player, player1.player];

                var result = game.run(playerArray);

                if (result.winner){
                    if (result.winner == player1.player.getId())   player1[roundName][roundId].wins++;
                    if (result.winner == player2.player.getId())   player2[roundName][roundId].wins++;
                }

                if (result.loser){
                    if (result.loser == player1.player.getId())   player1[roundName][roundId].losses++;
                    if (result.loser == player2.player.getId())   player2[roundName][roundId].losses++;
                }

                if (result.draw === true){
                    player1[roundName][roundId].draws ++;
                    player2[roundName][roundId].draws ++;
                }

                player1[roundName][roundId].games ++;
                player2[roundName][roundId].games ++;

                var reportString = 'Game ran: '+ fixture + ", result was "+ result.message;
                result.success ? console.log(reportString) : console.error(reportString);
            }

            console.groupEnd();
            
        };

        this.run = function(){

            var rounds = generateRoundRobin(playerCount);

            console.groupCollapsed("SEEDING ROUND");

            initialisePlayerScores(tournamentPlayers, 'seedingRound', 0); //initialise scores
            for (var i=0; i<rounds.length; i++){

                var player1 = tournamentPlayers[rounds[i][0]],
                    player2 = tournamentPlayers[rounds[i][1]]
                ;

                runPlayerMatch(player1, player2, 'seedingRound', 0, CONFIG.gameCounts.seeding);

            }

            calculatePlayerScores(tournamentPlayers, 'seedingRound', 0);

            console.groupEnd();

            console.groupCollapsed("ELIMINATION ROUND");

            var playersSeeded = sortPlayersForSeeding(tournamentPlayers, 16);

            var round = [];
            round[0] = playersSeeded;

            for (roundId = 0; roundId < 4; roundId++){

                round[roundId+1] = [];
                for (playerId = 0; playerId < round[roundId].length; playerId+=2){
                    var player1 = round[roundId][playerId];
                    var player2 = round[roundId][playerId+1];

                    if (!player1){
                        round[roundId+1].push(player2); //bye
                        continue;
                    }
                    if (!player2){
                        round[roundId+1].push(player1); //bye
                        continue;
                    }

                    var tieBreakerCount = 0,
                        roundCount = CONFIG.gameCounts.elimination,
                        winner = null;
                    do {

                        initialisePlayerScores([player1, player2], 'eliminationRound', roundId);
                        runPlayerMatch(player1, player2, 'eliminationRound', roundId, roundCount);
                        calculatePlayerScores([player1, player2], 'eliminationRound', roundId);

                        if (player1.eliminationRound[roundId].score > player2.eliminationRound[roundId].score){
                            winner = player1;
                            break;
                        }else if (player1.eliminationRound[roundId].score < player2.eliminationRound[roundId].score){
                            winner = player2;
                            break;
                        }

                        roundCount = CONFIG.gameCounts.tieBreaker; //only do 2 rounds for tiebreakers
                        tieBreakerCount++;
                    }while(tieBreakerCount<CONFIG.tieBreakerRounds);

                    round[roundId+1].push(winner); //winner could be null if tiebreaker round count exceeded

                }

            }

            console.groupEnd();

            printTournamentBoard(tournamentPlayers, round);



        };

    };
}());



