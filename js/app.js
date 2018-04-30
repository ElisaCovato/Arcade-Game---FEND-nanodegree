/*
Enemies
*/

// Enemies our player must avoid 
var Enemy = function() {
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
    // Any movement is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // We use the formula from Phisycs to keep track of the position
    // In other words:  position = orginal-position + (velocity)*(time variation)

    //updates position
    this.x = this.x + this.speed * dt;

    // TODO : Handle collision with the player

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
