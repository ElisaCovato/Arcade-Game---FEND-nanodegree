/*
Enemies
*/

// Enemies our player must avoid 
var Enemy = function(x, y, speed) {
    // Enemy initial position
    this.x = x;
    this.y = y;
    //Enemy initial speed
    this.speed = speed;
    //Loading the enemey image
    this.sprite = 'images/enemy-bug.png';
};


// This function updates the enemy's position during the game (the enemies "move" on the screen)
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Any movement is multiplied by the dt parameter which will ensure the game runs at the same speed for all computers.
    // To update the position, we use the formula  position = orginal_position + (velocity)*(time variation)
    this.x = this.x + this.speed * dt;
 
    // After the bugs go off screen they will appear again on the left and with some random speed 
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
        this.speed = randomSpeed();
    }

    // Handle collisions bugs-character


};

// This function creates random speeds for the bugs
var speedMultiplier = 5;

function randomSpeed() {
     //startSpeed is a random number from 1-10 times speedMultiplier
    var startSpeed = speedMultiplier*Math.floor(Math.random() * 10 + 1);
    return startSpeed;
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*****************************************************************************************************************/

/*
Player
*/

var Player = function(x,y) {
    // Player initial position
    this.x = x;
    this.y = y;
    //Loading the player  image
    this.sprite = 'images/char-boy.png';
};

// This functions updates player position on the screen
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// this fucntion handles the input method : pressind the arrows on the keyboard the player can move the character on the screen
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left":
            //check for wall, otherwise move left
            if (this.x > 0) {
                this.x -= 50;
            }
            break;
        case "right":
            //check for wall, otherwise move right
            if (this.x < 400) {
                this.x += 50;
            }
            break;
        case "up":
            //check if player reached top of water
            if (this.y > 0) {
                this.y -= 50;
            }
            break;
        case "down":
            //check for bottom, otherwise move down
            if (this.y < 400) {
                this.y += 50;
            }
            break;
    }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});




/*****************************************************************************************************************/

/*
Instantiate objects
*/

var player = new Player(200,400);

var allEnemies = [];



// Instantiate all enemies (set to 3) with random speed, push to allEnemies array
for (var i = 0; i < 3; i++) {
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    var startSpeed = randomSpeed();
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}







