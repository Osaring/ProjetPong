game.control = {
  onKeyDown : function(event) {
    /*if ( event.keycode == game.keycode.KEYDOWN && game.playerOne.posY < game.groundHeight - game.playerOne.height ) {
      playerOne.posY+=5;
    } else if ( event.keyCode == game.keycode.KEYUP && game.playerOne.posY > 0 ) {
      playerOne.posY-=5;
    }*/
    console.log(event);
  },

  onKeyUp : function(event) {
  	if ( event.keyCode == game.keycode.KEYDOWN ) {
    } else if ( event.keyCode == game.keycode.KEYUP ) {
    }
  }
}