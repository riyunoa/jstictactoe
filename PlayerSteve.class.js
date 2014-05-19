
var Steve = (function(){

    return function(){
        this.prototype = Object.create(Player.prototype); //inherit from parent
        Player.apply(this, arguments); // run constructor with args
    };

}());