ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntityPlayer = ig.Entity.extend({
  name: 'player',

	size: {x: 8, y: 14},
  offset: {x: 4, y: 2},
	
	friction: {x: 600, y: 0},
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet('media/player.png', 16, 16),
	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	walkAccel: 400,
	jumpAccel: 150,
	health: 10,
  swimming: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0]);
		this.addAnim( 'run', 0.1, [0,1,2,1]);
	},
	
	update: function() {
		// move left or right
		if( ig.input.state('left') ) {
			this.accel.x = -this.walkAccel;
			this.flip = true;
		}
		else if( ig.input.state('right') ) {
			this.accel.x = this.walkAccel;
			this.flip = false;
		}
		else {
			this.accel.x = 0;
		}
		
		// jump
		if(this.standing && ig.input.pressed('jump')) {
			this.vel.y = -this.jumpAccel;
		}

    // swim up
    if(this.swimming && ig.input.state('jump')) {
      this.vel.y = -this.jumpAccel;
    }

		// set the current animation, based on the player's speed
		if( this.vel.x != 0 ) {
			this.currentAnim = this.anims.run;
		} else {
			this.currentAnim = this.anims.idle;
		}
		
		this.currentAnim.flip.x = this.flip;

    if(this.swimming) {
      this.maxVel = {x: 20, y: 20};
      this.swimming = false; // If player is still swimming, this will be reset
                             // to true before the next call to update().
    } else {
      this.maxVel = {x: 50, y: 200};
    }

		// move!
		this.parent();
	},

  setSwimming: function() {
    this.swimming = true;
  }
});
});
