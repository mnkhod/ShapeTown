
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class RockMonster extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 32, y ?? 32, texture || "RockIdle_v01", frame ?? 0);

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.physics.add.existing(this);
        this.body.setSize(24, 24);
        
        this.moveSpeed = 60;
        this.chaseSpeed = 100;
        this.detectionRange = 150;
        this.attackRange = 40;
        this.direction = 1;
        this.patrolTimer = 0;
        this.patrolDuration = 2000;
        this.lastAttackTime = 0;
        this.attackCooldown = 1000;
        this.state = 'patrol';
        
        scene.events.once('update', () => {
    	    this.createAnimations();
    	    this.play('rockMonster-idle');
    	});

        scene.events.on('update', this.updateAI, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	createAnimations() {
        if (this.scene.anims.exists('rockMonster-idle')) return;

        const animations = [
            { key: 'idle', frames: 7, frameRate: 10, texture: 'RockIdle_v01' },
            { key: 'attack', frames: 19, frameRate: 12, texture: 'RockAttack_V01' },
            { key: 'death', frames: 14, frameRate: 10, texture: 'RockDeath_V01' },
            { key: 'walking', frames: 6, frameRate: 10, texture: 'RockWalking_V01' },
            { key: 'hurt', frames: 14, frameRate: 10, texture: 'RockHurt_V01' }
        ];

        animations.forEach(({ key, frames, frameRate, texture }) => {
            this.scene.anims.create({
                key: `rockMonster-${key}`,
                frames: this.scene.anims.generateFrameNumbers(texture, { 
                    start: 0, 
                    end: frames - 1 
                }),
                frameRate,
                repeat: -1
            });
        });
    }

    playAnimation(key, returnToIdle = false) {
        const animKey = `rockMonster-${key}`;
        if (this.scene.anims.exists(animKey)) {
            this.play(animKey);
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
        this.patrolTimer += this.scene.game.loop.delta;

        if (this.patrolTimer >= this.patrolDuration) {
            this.direction *= -1;
            this.patrolTimer = 0;
            this.playAnimation('idle');
            if (this.scene && this.active) {
                this.scene.time.delayedCall(500, () => {
                    if (this.active) this.playAnimation('walking');
                });
            }
        } else {
            this.body.setVelocityX(this.moveSpeed * this.direction);
            this.body.setVelocityY(0);
            this.flipX = this.direction < 0;
        }
    }

    handleChase(player) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
        this.body.setVelocityX(Math.cos(angle) * this.chaseSpeed);
        
        if (Math.abs(this.x - player.x) < 50) {
            this.body.setVelocityY(Math.sin(angle) * this.chaseSpeed);
        } else {
            this.body.setVelocityY(0);
        }

        this.playAnimation('walking');
        this.flipX = this.body.velocity.x < 0;
    }

    handleAttack(player) {
        if (this.scene.time.now - this.lastAttackTime >= this.attackCooldown) {
            this.playAnimation('attack', true);
            this.lastAttackTime = this.scene.time.now;

            if (typeof player.takeDamage === 'function') {
                player.takeDamage(10);
            }

            this.body.setVelocity(0, 0);
        }
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
