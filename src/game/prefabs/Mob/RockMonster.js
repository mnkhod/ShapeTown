
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class RockMonster extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 35, y ?? 43, texture || "RockIdle_v01", frame ?? 0);

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
        this.patrolStartX = x;
        this.patrolEndX = x + 200;
        this.attackCooldown = 1000;
        this.state = 'patrol';
        this.health = 150;

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
                    this.takeDamage(15);
                }
            }
        });

        scene.events.once('update', () => {
    	    this.createAnimations();
    	    this.play('rockMonster-walking');
    	});

        scene.events.on('update', this.updateAI, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

    createAnimations() {
        if (this.scene.anims.exists('rockMonster-idle')) return;

        const animations = [
            { key: 'idle', frames: 7, frameRate: 10, texture: 'RockIdle_v01', repeat: -1 },
            { key: 'attack', frames: 19, frameRate: 12, texture: 'RockAttack_V01', repeat: 0 },
            { key: 'death', frames: 14, frameRate: 10, texture: 'RockDeath_V01', repeat: 0 },
            { key: 'walking', frames: 6, frameRate: 10, texture: 'RockWalking_V01', repeat: -1 },
            { key: 'hurt', frames: 14, frameRate: 10, texture: 'RockHurt_V01', repeat: 0 }
        ];

        animations.forEach(({ key, frames, frameRate, texture, repeat }) => {
            if (this.scene.textures.exists(texture)) {
                this.scene.anims.create({
                    key: `rockMonster-${key}`,
                    frames: this.scene.anims.generateFrameNumbers(texture, { 
                        start: 0, 
                        end: frames - 1 
                    }),
                    frameRate,
                    repeat,
                    hideOnComplete: key === 'death'
                });
            }
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
        if (!this.scene || !this.body || this.state === 'dead') return; 

        const player = this.scene.children.list.find(
            child => child.constructor.name === 'PlayerPrefab'
        );
        if (!player) return;

        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.x, this.y, player.x, player.y
        );

        if (this.state !== 'dead') {
            this.state = distanceToPlayer <= this.attackRange ? 'attack' 
                       : distanceToPlayer <= this.detectionRange ? 'chase' 
                       : 'patrol';

            this[`handle${this.state.charAt(0).toUpperCase() + this.state.slice(1)}`](player);
        }
    }


    handlePatrol() {
        if (this.patrolTimer >= this.patrolDuration) {
            this.direction *= -1;
            this.patrolTimer = 0;
            this.body.setVelocity(0, 0);
            this.playAnimation('idle');
            if (this.scene && this.active) {
                this.scene.time.delayedCall(1500, () => {
                    if (this.active) {
                        this.playAnimation('walking');
                    }
                });
            }
        } else {
            if (this.anims.currentAnim && this.anims.currentAnim.key !== 'rockMonster-idle') {
                if ((this.direction > 0 && this.x >= this.patrolEndX) ||
                    (this.direction < 0 && this.x <= this.patrolStartX)) {
                    this.direction *= -1;
                }
                this.body.setVelocityX(this.moveSpeed * this.direction);
                this.body.setVelocityY(0);
                this.flipX = this.direction < 0;
            }
        }
    }

    handleChase(player) {
        if (this.anims.currentAnim && this.anims.currentAnim.key === 'rockMonster-hurt') {
            return;
        }

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
        this.body.setVelocity(0, 0);
        this.playAnimation('attack', true);
        this.lastAttackTime = this.scene.time.now;

        if (typeof player.takeDamage === 'function') {
            player.takeDamage(10);
        }
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
        this.disableInteractive();

        const deathAnim = this.play('rockMonster-death');
        if (deathAnim) {
            deathAnim.repeat = 0; 
        }

        this.generateDrops();

        this.once('animationcomplete', () => {
            if (this.active && this.state === 'dead') {
                this.destroy();
            }
        });
    }

    generateDrops() {
        const possibleDrops = [
            { id: "Stone", icon: "Icon_Stone", chance: 0.30, quantity: 1 },
            { id: "Iron ore", icon: "Icon_Iron_Ore", chance: 0.01, quantity: 1 },
            { id: "Coal", icon: "Icon_Coal", chance: 0.19, quantity: 1 }
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
