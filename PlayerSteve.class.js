
var Steve = (function(playerTemplate){

    return function(){
        this.prototype = Object.create(playerTemplate.prototype); //inherit from parent
        playerTemplate.apply(this, arguments); // run constructor with args

        this.getName = function(){
            return 'Steve';
        };

        function sleep(milliSeconds){
            var startTime = new Date().getTime(); // get the current time
            while (new Date().getTime() < startTime + milliSeconds); // hog cpu
        }

        var superMove = this.setMove; //get parent fn
        this.setMove = function(){ //override function call
//            sleep(60); //be a bad player
            return superMove(); //call parent fn
        };
    };

}(DefaultPlayer)); //Pass in the parentTemplate dependency