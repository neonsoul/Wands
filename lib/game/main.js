ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
  'game.levels.starting',
  'game.levels.outside',
  'game.levels.underwater',
  'game.levels.underwatercave',
  'game.levels.tunnels',
  'game.entities.player',
  'game.entities.enemy',
  'game.entities.water',
  'game.entities.levelchange'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 300,

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
    // Bind some keys
    ig.input.bind(ig.KEY.A, 'left');
    ig.input.bind(ig.KEY.D, 'right');
    ig.input.bind(ig.KEY.SPACE, 'jump');
    
		// Initialize your game here; bind keys etc.
    this.loadLevel(LevelStarting);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// screen follows the player
 		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
      if(this.screen.x < 0) this.screen.x = 0;
      var maxX = (this.collisionMap.width * this.collisionMap.tilesize) - ig.system.width;
      if(this.screen.x > maxX) this.screen.x = maxX;
      var maxY = (this.collisionMap.height * this.collisionMap.tilesize) - ig.system.height;
			this.screen.y = player.pos.y - ig.system.height/2;
      if(this.screen.y > maxY) this.screen.y = maxY;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 160, 3);

});
