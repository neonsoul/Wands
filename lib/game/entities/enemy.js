ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntityEnemy = ig.Entity.extend({
	size: {x: 8, y:16},
  offset: {x: 4, y:0},
	
	friction: {x: 600, y: 0},
	
	type: ig.Entity.TYPE.B, // Enemy group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet('media/enemy.png', 16, 16),
	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Enemy
	flip: false,
	walkAccel: 600,
	jumpAccel: 150,
	health: 10,
  swimming: false,

  visionRange: 8 * 12,
  desiredPlayerDistance: 8 * 5, // We want to be 5 tiles from player
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0]);
		this.addAnim( 'run', 0.07, [0,1,2,1]);
	},
	
	update: function() {
    var player = ig.game.getEntityByName('player');
    if(this.distanceTo(player) < this.visionRange) {
      var playerDX = this.pos.x - player.pos.x;
      if(playerDX > this.desiredPlayerDistance) {
        this.accel.x = -this.walkAccel;
      } else if(-playerDX > this.desiredPlayerDistance) {
        this.accel.x = this.walkAccel;
      } else {
        this.accel.x = 0;
      }

      this.flip = !!(playerDX > 0);
      
    } else { // Can't see player
      this.accel.x = 0;
    }
		/*
		// jump
		if(this.standing && ig.input.pressed('jump')) {
			this.vel.y = -this.jumpAccel;
		}

    // swim up
    if(this.swimming && ig.input.state('jump')) {
      this.vel.y = -this.jumpAccel;
    }
    */

		// set the current animation, based on the enemy's speed
		if( this.vel.x != 0 ) {
			this.currentAnim = this.anims.run;
		} else {
			this.currentAnim = this.anims.idle;
		}
		
		this.currentAnim.flip.x = this.flip;

    if(this.swimming) {
      this.maxVel = {x: 20, y: 20};
      this.swimming = false; // If enemy is still swimming, this will be reset
                             // to true before the next call to update().
    } else {
      this.maxVel = {x: 75, y: 200};
    }

		// move!
		this.parent();
	},

  setSwimming: function() {
    this.swimming = true;
  }
});
});