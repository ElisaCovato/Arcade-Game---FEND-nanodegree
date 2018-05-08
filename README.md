# Arcade Game :  frogger 


This game was built as part of the Udacity FEND nanodegree. 

## How to Load the game

- Clone the **[repo](https://github.com/ElisaCovato/Arcade-Game---FEND-nanodegree.git)** and open index.html -- or --
- Play on GitHub.io: **[Arcade Game](https://elisacovato.github.io/Arcade-Game---FEND-nanodegree/)**

## How the game works

In this game you have a Player and Enemies (Bugs). The goal of the player is to reach the water, without colliding into any one of the enemies. The player can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene, from left to right. 

 
### Starting of the game 

At the start of the game the player can choose the character to play with. The possible characters to choose from are shown below :

![boy](images/char-boy.png)
![cat-girl](images/char-cat-girl.png)
![horn-girl](images/char-horn-girl.png)
![pink-girl](images/char-pink-girl.png)
![princess-girl](images/char-princess-girl.png)

If no character is selected, the game will automatically select the first character.

### Level Up
The game consists of 10 levels. In each level the player should reach the water without colliding into any of the bugs. If the player reaches the water, 100 points are added to the score and a new level starts. At the start of any new level, the enemies get an increased random speed.

### Collectables and obstacles
In some of the levels, the player will be able to collect life points and gems. Some of these levels, contains also obstacles in the shape of rocks.

#### Life points
![Heart](images/Heart.png)

Each heart collected increase of 1 the player life points. The player starts with 3 life points.

#### Gems - extra points
![Gem-Orange](images/Gem-Orange.png) = 50 points
![Gem-Green](images/Gem-Green.png)  = 30 points
![Gem-Blue](images/Gem-Blue.png) = 10 points

The player can also collect gems of different colors. Each time the player collects a gem,  a certain amount of points (as indicated above) is added to the player score.

#### Rock - obstacles
![Rock](images/Rock.png)

The rocks block the way of the player. If a rock is on a tile the player cannot move on that tile. 

### Loosing the game - collision with enemies
Once  the player collides with an enemy, the player looses a life point and moves back to the starting square. The player looses the game when the life points reach zero.

### Winning the game
The player wins the game after getting to the water in all 10 levels. The final score will depend on how many gems the player has collected during the game.

### How to play - recap

- Choose your character
- Get to the water
- Avoid bugs
- Collect gems or hearts to gain  extra points or lives
- Watch out for the rocks
- You win when you reach level 10




## Special Features

- Every time the player collides a red  "oops!" overlay appears.
- When the player gets to the water, a green "great!" overlay appears.
- The game can be restarted. When clicking the restart button the game is paused and  a pop-up appears asking the player to confirm the choice. If the "Cancel" button is pressed, the player can go back to the paused game; if the player press "Yes, restart" the game is restarded and the player can choose a new character to play with.
- When the game ends, a pop-up appears with the score rating and a "Play again" button.
- If the player looses all the life points, a "Game Over" pop-up appears. 

## Resources used to create the game:

- Udacity Resources: 
	- [Project Rubric](https://review.udacity.com/#!/rubrics/591/view)
	- [Game engine](https://github.com/udacity/frontend-nanodegree-arcade-game)

- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

- [Object-Oriented JavaScript](https://docs.google.com/document/d/1F9DY2TtWbI29KSEIot1WXRqqao7OCd7OOC2W3oubSmc/pub?embedded=true)

- [Modal / Sweet Alert](https://sweetalert.js.org)




## License
[MIT License](LICENSE.MIT)