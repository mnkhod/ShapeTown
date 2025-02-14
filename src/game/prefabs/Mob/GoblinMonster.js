// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GoblinMonster extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 48, y ?? 48, texture || "GoblinWalking96x96_V01", frame ?? 0);

		/* START-USER-CTR-CODE */
		scene.physics.add.existing(this);
        this.body.setSize(32, 32);
        
        this.moveSpeed = 100;
        this.chaseSpeed = 150;
        this.detectionRange = 200;
        this.attackRange = 35;
        this.direction = 1;
        this.patrolTimer = 0;
        this.patrolDuration = 1500;
        this.lastAttackTime = 0;
        this.attackCooldown = 1200;
		this.patrolStartX = x;
		this.patrolEndX = x + 200;
        this.state = 'patrol';
        this.health = 100;
		this.isAttacking = false;

		this.setInteractive();
		this.on('pointerdown', () => {
		    const player = this.scene.children.list.find(
		        child => child.constructor.name === 'PlayerPrefab'
		    );

		    if (player) {
		        const distance = Phaser.Math.Distance.Between(
		            this.x, this.y,
		            player.x, player.y
		        );

		        if (distance <= 50) {
		            this.takeDamage(20);
		            this.playAnimation('hurt', true);
		        }
		    }
		});

		scene.events.once('update', () => {
		    this.createAnimations();
		    this.playAnimation('walking');
		    scene.events.on('update', this.updateAI, this);
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	createAnimations() {
	    if (this.scene.anims.exists('goblin-idle')) return;
	
	    const animations = [
	        { key: 'idle', frames: 6, frameRate: 8, texture: 'GoblinIdle96x96_V01', repeat: -1 },
	        { key: 'attack', frames: 6, frameRate: 10, texture: 'GoblinAttack128x96_V01', repeat: 0 },
	        { key: 'hurt', frames: 8, frameRate: 8, texture: 'GoblinHurt96x96_V01', repeat: 0 },
	        { key: 'walking', frames: 6, frameRate: 8, texture: 'GoblinWalking96x96_V01', repeat: -1 }
	    ];
	
	    animations.forEach(({ key, frames, frameRate, texture, repeat }) => {
	        if (this.scene.textures.exists(texture)) {
	            try {
	                this.scene.anims.create({
	                    key: `goblin-${key}`,
	                    frames: this.scene.anims.generateFrameNumbers(texture, { 
	                        start: 0, 
	                        end: frames - 1 
	                    }),
	                    frameRate,
	                    repeat
	                });
	            } catch (error) {
	                console.warn(`Failed to create animation for ${key}:`, error);
	            }
	        }
	    });
	}

	playAnimation(key, returnToIdle = false) {
	    const animKey = `goblin-${key}`;
	    if (this.scene.anims.exists(animKey)) {
	        if (!this.anims.isPlaying || this.anims.currentAnim.key !== animKey) {
	            this.play(animKey);
	        }
	        if (returnToIdle) {
	            this.once('animationcomplete', () => {
	                if (this.active) this.playAnimation('idle');
	            });
	        }
	    }
	}

    updateAI() {
        if (!this.scene || !this.body) return;

        const player = this.scene.children.list.find(
            child => child.constructor.name === 'PlayerPrefab'
        );
        if (!player) return;

        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.x, this.y, player.x, player.y
        );

        this.state = distanceToPlayer <= this.attackRange ? 'attack' 
                   : distanceToPlayer <= this.detectionRange ? 'chase' 
                   : 'patrol';

        this[`handle${this.state.charAt(0).toUpperCase() + this.state.slice(1)}`](player);
    }

	handlePatrol() {
	    if (this.isChangingDirection) return;

	    if ((this.direction > 0 && this.x >= this.patrolEndX) ||
	        (this.direction < 0 && this.x <= this.patrolStartX)) {
			
	        this.isChangingDirection = true;
	        this.body.setVelocity(0, 0);
	        this.playAnimation('idle');
	
	        this.scene.time.delayedCall(1500, () => {
	            if (this.active) {
	                this.direction *= -1;
	                this.isChangingDirection = false;
	                this.playAnimation('walking');
	            }
	        });
	    } else if (!this.isChangingDirection && this.anims.currentAnim && this.anims.currentAnim.key !== 'goblin-idle') {
	        this.body.setVelocityX(this.moveSpeed * this.direction);
	        this.body.setVelocityY(0);
	        this.flipX = this.direction < 0;
	    }
	}

	handleChase(player) {
	    if (this.anims.currentAnim && 
	        (this.anims.currentAnim.key === 'goblin-hurt' || 
	         this.anims.currentAnim.key === 'goblin-attack')) {
	        return;
	    }

	    const distanceToPlayer = Phaser.Math.Distance.Between(
	        this.x, this.y, player.x, player.y
	    );

	    if (distanceToPlayer <= this.attackRange) {
	        this.body.setVelocity(0, 0);
	        this.state = 'attack';
	        return;
	    }
	    const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
	    this.body.setVelocityX(Math.cos(angle) * this.chaseSpeed);
	
	    if (Math.abs(this.x - player.x) < 70) {
	        this.body.setVelocityY(Math.sin(angle) * this.chaseSpeed);
	    } else {
	        this.body.setVelocityY(0);
	    }

	    this.playAnimation('walking', false);
	    this.flipX = this.body.velocity.x < 0;
	}

	handleAttack(player) {
	    if (!this.isAttacking && 
	        this.scene.time.now - this.lastAttackTime >= this.attackCooldown) {
			
	        this.isAttacking = true;
	        this.body.setVelocity(0, 0);
	        this.lastAttackTime = this.scene.time.now;
	
	        this.play('goblin-attack');
	
	        if (typeof player.takeDamage === 'function') {
	            player.takeDamage(7);
	        }
	
	        this.once('animationcomplete', () => {
	            if (this.active) {
	                this.isAttacking = false;
	                this.play('goblin-idle');
	            }
	        });
	    } else if (!this.isAttacking) {
	        this.play('goblin-idle');
	    }
	}
	takeDamage(amount) {
	    this.health -= amount;
	
	    this.body.setVelocity(0, 0);
	
	    this.playAnimation('hurt', false);

	    this.once('animationcomplete', () => {
	        if (this.active && this.health > 0) {
	            this.state = 'chase';
	        }
	    });

	    if (this.health <= 0) {
	        this.die();
	    }
	}
	die() {
	    this.body.setVelocity(0, 0);
	    this.state = 'dead';
	
	    // this.playAnimation('death');
	    // this.once('animationcomplete', () => {
	    //     this.destroy();
	    // });

	    this.playAnimation('hurt');
	    this.scene.time.delayedCall(500, () => {
	        this.destroy();
	    });
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here