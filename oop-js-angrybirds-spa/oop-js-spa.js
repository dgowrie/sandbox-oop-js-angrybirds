// OOP Javascript & JS Architecture
// http://orizens.com/tools/oopjs/

// ! Step 1: The Red Bird
//RedAngryBird.js

//- 1. properties
var color = "red";
var birdName = "redHat";
var powers = ["emptyHands"];
var isAttacked = false;
//- 2. behaviour functions
function attack($bird, animationConfig) {
    isAttacked = true;
    arm($bird);
    $bird.animate(animationConfig);
}
function removeBird($bird, removeConfig) {
    if (isAttacked)
        $bird.animate(removeConfig);
}
function getBirdHitScore ($bird) {
    return calculateScore($bird.position() + $nowPig.position());
}
//- 3. creating red bird
var redBird = $("#redBird");
//- 4. attaching events
redBird.on("click", function(this){
    //- pseudo dynamic animationConfig
    attack($(this), {left: 1000, top: 250});
});


// ! Step 1: The Red Bird - Revisited

//- 1. class definition
function RedAngryBird(htmlId, config) {
    //- 2. properties
    this.color = "red";
    this.name = config.name;
    this.powers = config.powers;
    this.animate = {attack: {}, destroy: {}};
    this.isAttacked = false;
    this.htmlId = htmlId;
    this.$bird = $("#" + htmlId);
}
 
//- 3. methods of the class
RedAngryBird.prototype = {
    attack: function () {
        this.isAttacked = true;
        this.arm();
        this.$bird.animate(this.animate.attack);
    },
     
    remove: function () {
        if (this.isAttacked) {
            this.$bird.animate(this.animate.destroy);
        }
    }
};

// mainAppSomwhere.js
//- creating instances of the class
var redHat = new RedAngryBird("jim", {name: "jim"});
var redNosed = new RedAngryBird("red", {name: "red"});
redHat.attack();
redNosed.attack();
redHat.remove();



// ! Step 2: Enter The Blue Bird
// http://orizens.com/tools/oopjs/#slide-13
// AngryBird.js

//- 1. class definition
function AngryBird(htmlId, config) {
    //- 2. properties
    //- NEW dyanmic color
    this.color = config.color;
    this.name = config.name;
    this.powers = config.powers;
    this.animate = {attack: {}, destroy: {}};
    this.isAttacked = false;
    this.$bird = $(htmlId);
}
//
//- 3. methods of the class
AngryBird.prototype = {
    attack: function () {
        this.isAttacked = true;
        this.arm();
        this.$bird.animate(this.animate.attack);
    },
     
    remove: function () {
        if (this.isAttacked) {
            this.$bird.animate(this.animate.destroy);
        }
    }
};

// mainAppSomewhere.js
// http://orizens.com/tools/oopjs/#slide-15
//- creating instances of the class
var twitter = new AngryBird("#twitter", {color: "blue", name: "jim"});
var redHat = new AngryBird("#red", {color: "red", name: "red"});
twitter.attack();
redHat.attack();
redHat.remove(); //- removes only "redHat" from the DOM


// ! Step 2: Blue Bird - New Powers
// http://orizens.com/tools/oopjs/#slide-22
// BlueAngryBird.js
//- 1. define a class
function BlueAngryBird () { this.color = 'blue' }

//- 2. define the inheritance
BlueAngryBird.prototype = new AngryBird;

//- 3. fix the constructor
BlueAngryBird.prototype.constructor = BlueAngryBird;

//- 4.1 overide the arm method with a special arm
BlueAngryBird.prototype.arm = function() {
    this.powers.push(new AngryBird(/*..*/));
    this.powers.push(new AngryBird(/*..*/));
    this.powers.push(new AngryBird(/*..*/));
    this.$bird.on("click", this.split.bind(this));
}
//- 4.2 adding NEW method - split birds
BlueAngryBird.prototype.split = function() {
    for(var i = 0; i < this.powers.length; i++) {
        this.usePower(this.power[i]);
    }
}

//- 5. create the bird
var twitter = new BlueAngryBird("#twitter", {name: "twitter"});
console.log(twitter.color); //- outputs "blue"
twitter.arm(); //- invokes the special method