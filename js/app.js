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
};
// This function creates random speeds for the bugs
var speedMultiplier = 10;

function randomSpeed() {
    //startSpeed is a random number from 1-10 times speedMultiplier
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
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
var Player = function(x, y) {
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
// this fucntion handles the input method : pressing the arrows on the keyboard the player can move the character on the screen
Player.prototype.handleInput = function(allowedKeys) {
    this.moveX = 0;
    this.moveY = 0;
    switch (allowedKeys) {
        case "left":
            //check for wall, otherwise move left
            if (this.x > 0) {
                this.x -= 50;
                this.moveX = -50;
            }
            break;
        case "right":
            //check for wall, otherwise move right
            if (this.x < 400) {
                this.x += 50;
                this.moveX = 50;
            }
            break;
        case "up":
            //check if player reached top of water, if yes then restarts, otherwise keeps going
            if (this.y > 0) {
                this.y -= 50;
                this.moveY = -50;
            } else {
                levelUp();
                player.x = 200;
                player.y = 400;
            }
            break;
        case "down":
            //check for bottom, otherwise move down
            if (this.y < 400) {
                this.y += 50;
                this.moveY = 50;
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
Heart / lives
*/
var Heart = function(x, y) {
    // heart initial position
    this.x = x;
    this.y = y;
    //Loading heart  image
    this.sprite = 'images/Heart.png';
};
// Draw the heart on the screen
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70.7, 119.7);
};

/*****************************************************************************************************************/
/*
Gems
*/
var Gem = function(x, y) {
    this.x = x;
    this.y = y;
    this.randomGem();
};
// Draw the Gem on screen.
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 60.60, 102.6);
};
//Randomly generates a different color for the gem with corrispective point value
Gem.prototype.randomGem = function() {
    var randIdx = Math.floor(Math.random() * 3);
    if (randIdx === 0) {
        this.sprite = 'images/Gem-Blue.png';
        this.worth = 10;
    } else {
        if (randIdx === 1) {
            this.sprite = 'images/Gem-Green.png';
            this.worth = 30;
        } else {
            this.sprite = 'images/Gem-Orange.png';
            this.worth = 50;
        }
    }
};

/*****************************************************************************************************************/
/*
Rock
*/
var Rock = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Rock.png'
};
// Draw the Gem on screen.
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*****************************************************************************************************************/
/*
Instantiate objects
*/

var cordinateMatrix = []; //Creates a matrix with all the coordinates of the canvas
var player = new Player(200, 400);
var allEnemies = [];
var allGems = [];
var heart;
var allRocks = [];

// this function generates a random x position
function randomCordX(rand, randPlus) {
    var cordX = 100 * Math.floor(Math.random() * rand + randPlus) + 18;
    return cordX;
}

// this function generates a random y position
function randomCordY(rand, randPlus) {
    var cordY = 100 * Math.floor(Math.random() * rand + randPlus) - 10;
    return cordY;
}

// this function checks if a position on the screen is already taken by a gem/rock/heart
function isPositionTaken(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;
        }
    }
    return false;
}

function gemsDraw() {
    var randX = [];
    var randY = [];
    for (var i = 0; i < 3; i++) {
        var gemXY = [randomCordX(5, 0), randomCordY(2, 1)];
        if (!isPositionTaken(cordinateMatrix, gemXY)) {
            randX.push(gemXY[0]);
            randY.push(gemXY[1]);
            cordinateMatrix.push(gemXY);
        } else {
            i--;
        }
    }
    // Levels 2,3,4,5 have one gem, levels 6,7,8 have 2 gems, levels 9 and 10 have 3 gems
    if (levelScore > 1) {
        allGems.push(new Gem(randX[0], randY[0] + 90));
        if (levelScore > 5) {
            allGems.push(new Gem(randX[1], randY[1] + 90));
        };
        if (levelScore > 8) {
            allGems.push(new Gem(randX[2], randY[2] + 90));
        };
    };
}

function heartsDraw() {
    if (levelScore % 3 === 0) {
        var heartX, heartY;
        for (var i = 0; i < 1; i++) {
            var heartXY = [randomCordX(5, 0), randomCordY(2, 1)];
            if (!isPositionTaken(cordinateMatrix, heartXY)) {
                heartX = heartXY[0];
                heartY = heartXY[1];
                heart = new Heart(heartX, heartY);
                cordinateMatrix.push(heartXY);
            } else {
                i--;
            }
        }
    } else {
        heart = null;
    };
}

function rocksDraw() {
    var randRockX = [];
    var randRockY = [];
    for (var i = 0; i < 2; i++) {
        var rockXY = [randomCordX(5, 2)-200, randomCordY(2, 1)-100];
        if (!isPositionTaken(cordinateMatrix, rockXY)) {
            randRockX.push(rockXY[0]);
            randRockY.push(rockXY[1]);
            cordinateMatrix.push(rockXY);
        } else {
            i--;
        }
    };
    // In levels 7, 8 and 9 there is one rock, on level 10 there are 2 rocks
    if (levelScore > 6) {
        allRocks.push(new Rock(randRockX[0] - 15, randRockY[0] + 55));
        if (levelScore === 10) {
            allRocks.push(new Rock(randRockX[1] - 15, randRockY[1] + 55));
        };
    };
}

// Instantiate all enemies (= 3, 1 per line) with random speed, push to allEnemies array
function allEnemiesDraw() {
    for (var i = 0; i < 3; i++) {
        //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
        var startSpeed = randomSpeed();
        allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
    }
}
allEnemiesDraw();

/*****************************************************************************************************************/
/*
 * LEVEL UP
 */
let pointScore = 0;
let levelScore = 1;
const levelUpPointsIncrement = 100;
const points = document.querySelector(".points");
const overlayLevelUp = document.querySelector(".overlayLevelUp");
const levels = document.querySelector(".levels");

// The following two functions make an overlay appear/disappear
function onOverlay(overlay) {
    overlay.style.display = "block";
}

function offOverlay(overlay) {
    overlay.style.display = "none";
}

function levelUp() {
    if (levelScore < 10) {
        // level up
        levelScore += 1;
        levels.innerHTML = levelScore;
        // the "great!" overlay appears
        onOverlay(overlayLevelUp);
        setInterval(function() {
            offOverlay(overlayLevelUp);
        }, 900);
        // we increment the points
        pointScore += levelUpPointsIncrement;
        points.innerHTML = pointScore;
        // Generates hearts on screen
        heartsDraw();
        // Generates gems on screen
        allGems = [];
        gemsDraw();
        // Generates rocks on the screen
        allRocks = [];
        rocksDraw();
        // generates new coordinates
        cordinateMatrix = [];
        // the enemies got an increased in their speed
        speedMultiplier += 7;
        allEnemies = [];
        allEnemiesDraw();
    } else {
        winningModal();
    }
}

/*****************************************************************************************************************/
/*
 * GAME OVER
 */
// When the player doesn't have more life points, a game over modal appears. The player can then play again
function getScore() {
    let points = document.querySelector(".points").cloneNode(true);
    let levels = document.querySelector(".levels").cloneNode(true);
    let showScore = document.createElement("div");
    showScore.appendChild(points);
    showScore.appendChild(document.createTextNode(" Points"));
    showScore.appendChild(levels);
    showScore.appendChild(document.createTextNode(" Level"));
    showScore.className = "scoreModal";
    return showScore;
}

function gameOverModal() {
    let showScore = getScore();
    swal({
        title: "Game Over!",
        text: "Your score:",
        icon: "error",
        closeOnEsc: false,
        closeOnClickOutside: false,
        content: showScore,
        className: "gameOverText",
        buttons: "Play again!"
    }).then(function(isConfirm) {
        if (isConfirm) {
            location.reload(true);
        }
    });
}

/*****************************************************************************************************************/
/*
 * Winning
 */
// When the player reaches level 10 a winning modal appears asking the player if wants to plays again
function getScoreWinning() {
    let points = document.querySelector(".points").cloneNode(true);
    let showScore = document.createElement("div");
    let textScore = document.createTextNode("Your score : ");
    showScore.appendChild(textScore);
    showScore.appendChild(points);
    showScore.appendChild(document.createTextNode(" Points"));
    showScore.className = "scoreModal";
    return showScore;
}

function winningModal() {
    let showScore = getScoreWinning();
    swal({
        title: "Congratulations! You won!",
        icon: "success",
        closeOnEsc: false,
        closeOnClickOutside: false,
        content: showScore,
        className: "winningText",
        buttons: "Play again!"
    }).then(function(isConfirm) {
        if (isConfirm) {
            location.reload(true);
        }
    });
}