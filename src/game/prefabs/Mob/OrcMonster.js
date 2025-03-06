// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OrcMonster extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 48, y ?? 48, texture || "OrcIdle_V01", frame ?? 0);

		/* START-USER-CTR-CODE */
		scene.physics.add.existing(this);
        this.body.setSize(32, 32);
        
        this.moveSpeed = 80;
        this.chaseSpeed = 130;
        this.detectionRange = 200;
        this.attackRange = 40;
        this.direction = 1;
        this.patrolTimer = 0;
        this.patrolDuration = 1800;
        this.lastAttackTime = 0;
        this.attackCooldown = 1500;
		this.patrolStartX = x;
		this.patrolEndX = x + 200;
        this.state = 'patrol';
        this.health = 150;
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
		    this.play('orc-walking');
		    scene.events.on('update', this.updateAI, this);
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	createAnimations() {
	    if (this.scene.anims.exists('orc-idle')) return;
	
	    const animations = [
	        { key: 'idle', frames: 8, frameRate: 8, texture: 'OrcIdle_V01', repeat: -1 },
	        { key: 'attack', frames: 16, frameRate: 10, texture: 'OrcAttack_V01', repeat: 0 },
	        { key: 'hurt', frames: 7, frameRate: 8, texture: 'OrcHurt_V01', repeat: 0 },
	        { key: 'walking', frames: 8, frameRate: 8, texture: 'OrcWalking_V01', repeat: -1 },
			{ key: 'death', frames: 11, frameRate: 10, texture: 'OrcDeath_V01', repeat: 0, hideOnComplete: true }
	    ];
	
	    animations.forEach(({ key, frames, frameRate, texture, repeat, hideOnComplete }) => {
	        if (this.scene.textures.exists(texture)) {
	            try {
	                this.scene.anims.create({
	                    key: `orc-${key}`,
	                    frames: this.scene.anims.generateFrameNumbers(texture, { 
	                        start: 0, 
	                        end: frames - 1 
	                    }),
	                    frameRate,
	                    repeat,
                        hideOnComplete
	                });
	                console.log(`Created animation: orc-${key} using texture ${texture}`);
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
	        this.play('orc-idle');
	
	        this.scene.time.delayedCall(1500, () => {
	            if (this.active) {
	                this.direction *= -1;
	                this.isChangingDirection = false;
	                this.play('orc-walking');
	            }
	        });
	    } else if (!this.isChangingDirection && this.anims.currentAnim && this.anims.currentAnim.key !== 'orc-idle') {
	        this.body.setVelocityX(this.moveSpeed * this.direction);
	        this.body.setVelocityY(0);
	        this.flipX = this.direction < 0;
	    }
	}

	handleChase(player) {
	    if (this.anims.currentAnim && 
	        (this.anims.currentAnim.key === 'orc-hurt' || 
	         this.anims.currentAnim.key === 'orc-attack')) {
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

	    if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'orc-walking') {
	        this.play('orc-walking');
	        console.log("Playing orc walking animation during chase");
	    }
	    
	    this.flipX = this.body.velocity.x < 0;
	}

	handleAttack(player) {
	    if (!this.isAttacking && 
	        this.scene.time.now - this.lastAttackTime >= this.attackCooldown) {
			
	        this.isAttacking = true;
	        this.body.setVelocity(0, 0);
	        this.lastAttackTime = this.scene.time.now;
	
	        this.play('orc-attack');
	
	        if (typeof player.takeDamage === 'function') {
	            player.takeDamage(12);
	        }
	
	        this.once('animationcomplete', () => {
	            if (this.active) {
	                this.isAttacking = false;
	                this.play('orc-idle');
	            }
	        });
	    } else if (!this.isAttacking) {
	        this.play('orc-idle');
	    }
	}
	
	takeDamage(amount) {
        this.health -= amount;
        console.log("Orc health:", this.health);

        this.body.setVelocity(0, 0);

        if (this.health <= 0) {
            this.die();
            return;
        }

        this.isHurt = true;
        this.play('orc-hurt');

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
        
        this.createDrops();;
        this.anims.stop();
        console.log("Setting texture to OrcDeath_V01");
        this.setTexture('OrcDeath_V01', 0);
        this.removeAllListeners('animationcomplete');
        const deathAnim = this.play('orc-death');
        
        this.once('animationcomplete', () => {
            if (this.active && this.state === 'dead') {
                console.log("Destroying orc");
                this.destroy();
            }
        });
        
        this.scene.time.delayedCall(2000, () => {
            if (this.active && this.state === 'dead') {
                console.log("Backup timer: destroying orc");
                this.destroy();
            }
        });
    }

    createDrops() {
        const possibleDrops = [
            { id: "Orc Tooth", icon: "Icon_Orc_teeth", chance: 0.30, quantity: 1 },
            { id: "Orc Potion", icon: "Icon_Orc_Potion", chance: 0.01, quantity: 1 }
        ];
        
        possibleDrops.forEach(item => {
            if (Math.random() <= item.chance) {
                this.dropItem(item);
            }
        });
    }

    dropItem(item) {
        if (!this.scene || !this.scene.newItemHudPrefab) {
            console.warn('Cannot drop item: missing scene or inventory component');
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