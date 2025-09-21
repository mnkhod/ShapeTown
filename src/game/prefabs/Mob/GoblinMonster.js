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
		        }
		    }
		});

		scene.events.once('update', () => {
		    this.createAnimations();
		    // Check if animation exists before playing to prevent Phaser warnings
		    if (this.scene.anims.exists('goblin-walking')) {
		        this.play('goblin-walking');
		    }
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
	        { key: 'walking', frames: 6, frameRate: 8, texture: 'GoblinWalking96x96_V01', repeat: -1 },
			{ key: 'death', frames: 10, frameRate: 10, texture: 'Goblin_Death96x96', repeat: 0, hideOnComplete: true }
	    ];
	
	    animations.forEach(({ key, frames, frameRate, texture, repeat, hideOnComplete }) => {
	        if (this.scene.textures.exists(texture)) {
	            try {
	                this.scene.anims.create({
	                    key: `goblin-${key}`,
	                    frames: this.scene.anims.generateFrameNumbers(texture, { 
	                        start: 0, 
	                        end: frames - 1 
	                    }),
	                    frameRate,
	                    repeat,
                        hideOnComplete
	                });
	                console.log(`Created animation: goblin-${key} using texture ${texture}`);
	            } catch (error) {
	                console.warn(`Failed to create animation for ${key}:`, error);
	            }
	        } else {
	            console.warn(`Texture does not exist: ${texture} for animation ${key}`);
	        }
	    });
	}

    updateAI() {
	    if (!this.scene || !this.body || this.state === 'dead' || this.isHurt) return;
	
	    const player = this.scene.children.list.find(
	        child => child.constructor.name === 'PlayerPrefab'
	    );
	    if (!player) return;
	
	    const distanceToPlayer = Phaser.Math.Distance.Between(
	        this.x, this.y, player.x, player.y
	    );
	
	    if (!this.isAttacking && !this.isHurt) {
	        this.state = distanceToPlayer <= this.attackRange ? 'attack' 
	               : distanceToPlayer <= this.detectionRange ? 'chase' 
	               : 'patrol';
	    }
	
	    this[`handle${this.state.charAt(0).toUpperCase() + this.state.slice(1)}`](player);
	}

	handlePatrol() {
	    if (this.isChangingDirection) return;

	    if ((this.direction > 0 && this.x >= this.patrolEndX) ||
	        (this.direction < 0 && this.x <= this.patrolStartX)) {
			
	        this.isChangingDirection = true;
	        this.body.setVelocity(0, 0);
	        this.play('goblin-idle');
	
	        this.scene.time.delayedCall(1500, () => {
	            if (this.active) {
	                this.direction *= -1;
	                this.isChangingDirection = false;
	                this.play('goblin-walking');
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

	    this.play('goblin-walking');
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

        if (this.health <= 0) {
            this.die();
            return;
        }

        this.isHurt = true;
        this.play('goblin-hurt');

        this.once('animationcomplete', () => {
            if (this.active) {
                this.isHurt = false;
                this.state = 'chase';
            }
        });
    }

    die() {
        if (this.state === 'dead') return;
        
        this.state = 'dead';
        this.body.setVelocity(0, 0);
        this.disableInteractive();
        
        this.scene.events.off('update', this.updateAI, this);
        this.createDrops();
        this.anims.stop();
        
        this.setTexture('Goblin_Death96x96', 0);
        
        this.removeAllListeners('animationcomplete');
        
        const deathAnim = this.play('goblin-death');
        
        this.once('animationcomplete', () => {
            if (this.active && this.state === 'dead') {
                this.destroy();
            }
        });
        
        this.scene.time.delayedCall(2000, () => {
            if (this.active && this.state === 'dead') {
                this.destroy();
            }
        });
    }

    createDrops() {
        const possibleDrops = [
            { id: "Goblin ear", icon: "Icon_Goblin_Ear", chance: 0.50, quantity: 1 },
            { id: "Goblin eye ball", icon: "Icon_Goblin_Eye", chance: 0.02, quantity: 1 }
        ];
        
        possibleDrops.forEach(item => {
            if (Math.random() <= item.chance) {
                this.dropItem(item);
            }
        });
    }

    dropItem(item) {
        if (!this.scene || !this.scene.newItemHudPrefab) {
            return;
        }

        this.scene.newItemHudPrefab.addItem(item.id, item.icon, 0, item.quantity);

        this.scene.alertPrefab.alert(`Got ${item.quantity} ${item.id}!`);

        this.createFloatingItemEffect(item);
    }

    createFloatingItemEffect(item) {
        const player = this.scene.playerPrefab;
        if (!player) return;
        const floatingItem = this.scene.add.sprite(this.x, this.y, item.icon);
        floatingItem.setScale(0.5);
        floatingItem.setDepth(100);

        this.scene.tweens.add({
            targets: floatingItem,
            x: player.x,
            y: player.y,
            duration: 800,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                floatingItem.destroy();
            }
        });
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here