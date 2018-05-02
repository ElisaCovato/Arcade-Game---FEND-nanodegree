/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;



    const  overlayCollisions = document.querySelector(".overlayCollisions");
    const  overlayLevelUp = document.querySelector(".overlayLevelUp");


    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        lastTime = Date.now();
        reset();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. 
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    // The following two functions make an overlay appear/disappear
    function onOverlay(overlay) {
        overlay.style.display = "block";
    }

    function offOverlay(overlay) {
        overlay.style.display = "none";
    }

    //Life points
    let lifePoints = 3;
    const hearts = document.querySelector(".hearts");

    function lifePointsMinus() {
        if (lifePoints >= 1) {
            hearts.children[lifePoints-1].children[0].classList.replace("fa-heart", "fa-heart-o");
            lifePoints -= 1;            
        } else {
            gameOverModal();
        };
    }

    // This function check for collisions. If there is one, the player re-starts from startinf position and looses life points
   function checkCollisions() {
    //creates a virtual rectangular box around the player 
        var playerLeft = player.x + 10;
        var playerRight = player.x + 70;
        var playerTop = player.y + 50;
        var playerBottom = player.y + 120;

    allEnemies.forEach(function(enemy) {
        // creates a virtual rectangular box around the enemies
        var enemyLeft = enemy.x + 2;
        var enemyRight = enemy.x + 90;
        var enemyTop = enemy.y + 70;
        var enemyBottom = enemy.y + 100;

        // when the two virtual box intersect we have the collision
        if ( enemyRight > playerLeft && enemyLeft < playerRight && enemyBottom > playerTop && enemyTop < playerBottom) {
            if (lifePoints >1 ) {
            // The "oops!" message appears on the screen / An overlay is showns and then it disappears
            onOverlay(overlayCollisions);
            setInterval( function() {
                offOverlay(overlayCollisions);
            }, 1000);
            // The player start again from the initial position
            player.x=200; 
            player.y=400;
        };
            // The player looses life points
            lifePointsMinus();
        };
    });
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. .
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* This function reset the game. It is 
     * only called once by the init() method.
     */
    function reset() {
        var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
    }

    /* It loads all the images., Then set init as the callback method, so that when
     * all of these images are properly loaded and you choose your 
     * character, the game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ]);

    // This function creates a div block containing all the characters the player can choose 
    function characterBlock() {
        let charBlock = document.createElement("div");
        let characters = document.querySelector(".characters");
        charBlock.appendChild(characters.content.cloneNode(true));
        return charBlock;
    }

    // This function make you choose a character
    function chooseCharacter() {
        let charBlock = characterBlock();
        swal({
            title: "Choose a character",
            button: "Start",
            closeOnEsc: false,
            closeOnClickOutside: false,
            content: charBlock,
        }).then(function(isConfirm) {
            if (isConfirm) {
                init();
            }
        });    
        // When a character is clicked/selected, we get the src of the image and updated the sprite of the player
        var characters = document.querySelector('.characters');
        var selectedBefore = null;
        charBlock.addEventListener('click', function(event) {
            if (event.target.matches(".charElement") && !event.target.matches(".charSelected")) {
                if (selectedBefore !== null) {
                    selectedBefore.classList.remove("charSelected");
                };
                event.target.classList.add("charSelected");
                selectedBefore = event.target;
                player.sprite = event.target.getAttribute("src");            
            }
        });
    }

    // This makes you to choose a character and then the game starts
    Resources.onReady(chooseCharacter);


/*
 * RESTART the game
 */

// If the restart button is clicked a modal appears asking the player to restart or keep playing

    const restart = document.querySelector(".restart");
    restart.addEventListener('click', function() {
        var speeds = pauseEnemies();
        warningModal(speeds);
    });

// This function shows a warning sweet alert when pressing the restart button
    function warningModal(speeds) {
    swal({
        title: "Are you sure?",
        text: "Your progresses will be lost!",
        icon: "warning",
        closeOnEsc: false,
        closeOnClickOutside: false,
        buttons: {
            cancel: "Cancel",
            confirm: {
                text: "Yes, restart",
                value: "restart",
            },
        }
    }).then((value) => {
        switch (value) {
            case "restart":
            location.reload(true);
                break;
            default:
              for (var i = 0; i < 3; i++) {
                allEnemies[i].speed = speeds[i]; 
              };  
                break;
        }
    });
    }
// This function pause the speed of the enemies when pressing the restart button
function pauseEnemies() {
    var enemiesCurrentSpeeds = [];
    for (var i = 0; i < 3; i++) {
        var enemySpeed = allEnemies[i].speed;
        enemiesCurrentSpeeds.push(enemySpeed);
        allEnemies[i].speed = 0;   
    };
    return enemiesCurrentSpeeds;
}

/*
 * GAME OVER
 */

 // When the player doesn't have more life points, a game over modal appears. The player can then play again

function getScore() {
    let points = document.querySelector(".points").cloneNode(true);
    let levels = document.querySelector(".levels").cloneNode(true);
    let showScore = document.createElement("div");
    //let textScore = document.createTextNode("Your score :");
    //showScore.appendChild(textScore);
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
        text : "Your score:",
        icon: "error",
        closeOnEsc: false,
        closeOnClickOutside: false,
        content : showScore,
        className : "gameOverText",
        buttons: "Play again!"
    }).then(function(isConfirm) {
        if (isConfirm) {
            location.reload(true);
        }
    });
}

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser).
     */
    global.ctx = ctx;
})(this);




