var game = {
  groundWidth : 700,
  groundHeight : 400,
  groundColor: "#000000",
  netWidth : 6,
  netColor : "#FFFFFF",

  groundLayer : null,

  scoreLayer : null,
  playersBallLayer : null,

  scorePosPlayer1 : 300,
  scorePosPlayer2 : 365,

  scoreEquip1 : 0,
  scoreEquip2 : 0,

  playerOne : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 10,
    posY : 200,
    goUp: false,
    goDown: false,
  },
   
  playerTwo : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 675,
    posY : 200,
    goUp :false,
    goDown: false,
  },

  playerThree: {
    width: 10,
    height: 50,
    color: "#FFFFFF",
    posX: 60,
    posY: 200,
    goUp: false,
    goDown: false,
  },

  playerFour: {
    width: 10,
    height: 50,
    color: "#FFFFFF",
    posX: 625,
    posY: 200,
    goUp: false,
    goDown: false,
  },

  ball : {
    width : 10,
    height : 10,
    color : "#FFFFFF",
    posX : 200,
    posY : 200,
    directionX : 1,
    directionY : 1,
    speed : 1,

    move : function() {
    	console.log(this.directionX, this.directionY);
      this.posX += this.directionX * this.speed;
      this.posY += this.directionY * this.speed;
      
    },

    bounce: function () {
      if (this.posX > game.groundWidth){
        game.scoreEquip1++;
        this.RecentrerBalle();
      }
      if (this.posX < 0){
        game.scoreEquip2++;
        this.RecentrerBalle();
      }
      if (this.posY > game.groundHeight || this.posY < 0)
        this.directionY = -this.directionY;
    },

    collide : function(anotherItem) {
      if (!(this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
          || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height)) {
        return true;
      }
      return false;
    },

    RecentrerBalle : function (){
      this.posX = 200;
      this.posY = 200;
      this.directionX = 1;
      this.directionY = 1;
      game.clearLayer(game.scoreLayer);
      game.displayScore(game.scoreEquip1, game.scoreEquip2);
    },

  },


  initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
    window.onkeydown = onKeyDownFunction;
    window.onkeyup = onKeyUpFunction;
  },
 
 displayScore : function(scorePlayer1, scorePlayer2) {
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);

  },

  displayBall : function() {
  game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
},

displayPlayers : function() {
  game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
  game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
  game.display.drawRectangleInLayer(this.playersBallLayer, this.playerThree.width, this.playerThree.height, this.playerThree.color, this.playerThree.posX, this.playerThree.posY);
  game.display.drawRectangleInLayer(this.playersBallLayer, this.playerFour.width, this.playerFour.height, this.playerFour.color, this.playerFour.posX, this.playerFour.posY);
},

moveBall : function() { 
    this.ball.move();
    this.ball.bounce();
    this.displayBall();
  }, 

  clearLayer : function(targetLayer) {
    targetLayer.clear();
  },
 
  init : function() {
  this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
  game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
 
  this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
  game.display.drawTextInLayer(this.scoreLayer, "SCORE", "10px Arial", "#FF0000", 10, 10);
  
  this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  
  game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);

    this.displayScore(game.scoreEquip1, game.scoreEquip2);

    this.displayBall(this.ball.posX, this.ball.posY);

    this.displayPlayers();

    this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
  },

  DeplacementPlayer1: function () {
    if (game.playerOne.goUp && game.playerOne.posY > 0)
      game.playerOne.posY -= 5;
    else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
      game.playerOne.posY += 5;
  },
  DeplacementPlayer2: function () {
    if (game.playerTwo.goUp && game.playerTwo.posY > 0)
      game.playerTwo.posY -= 5;
    else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height)
      game.playerTwo.posY += 5;
  },

  DeplacementPlayer3: function () {
    if (game.playerThree.goUp && game.playerThree.posY > 0)
      game.playerThree.posY -= 5;
    else if (game.playerThree.goDown && game.playerThree.posY < game.groundHeight - game.playerThree.height)
      game.playerThree.posY += 5;
  },
  DeplacementPlayer4: function () {
    if (game.playerFour.goUp && game.playerFour.posY > 0)
      game.playerFour.posY -= 5;
    else if (game.playerFour.goDown && game.playerFour.posY < game.groundHeight - game.playerFour.height)
      game.playerFour.posY += 5;
  },
  collideBallWithPlayersAndAction: function () {
    if (this.ball.collide(game.playerOne))
      game.ball.directionX = -game.ball.directionX;
    if (this.ball.collide(game.playerTwo))
      game.ball.directionX = -game.ball.directionX;
    if (this.ball.collide(game.playerThree))
      game.ball.directionX = -game.ball.directionX;
    if (this.ball.collide(game.playerFour))
      game.ball.directionX = -game.ball.directionX;
  }


};