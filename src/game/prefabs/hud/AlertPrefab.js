
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class AlertPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 2, y ?? 3);

		this.scaleX = 0.5807462389444868;
		this.scaleY = 0.5807462389444868;

		// bg
		const bg = scene.add.image(150.81828568909967, 47.456869152431125, "MessageBox3");
		bg.scaleX = 0.36023565316852846;
		bg.scaleY = 0.36023565316852846;
		this.add(bg);

		// msg
		const msg = scene.add.text(150.81828568909967, 47.456869152431125, "", {});
		msg.setOrigin(0.5, 0.5);
		msg.text = "New text";
		msg.setStyle({ "align": "center", "fixedWidth": 250, "fontSize": "12px", "maxLines": 3 });
		msg.setLineSpacing(3);
		msg.setWordWrapWidth(250, true);
		this.add(msg);

		// exitButton
		const exitButton = scene.add.sprite(292, 3, "ExitButtonIcon", 0);
		exitButton.scaleX = 0.29620092938938364;
		exitButton.scaleY = 0.29620092938938364;
		this.add(exitButton);

		this.bg = bg;
		this.msg = msg;
		this.exitButton = exitButton;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.visible = false


		exitButton.setInteractive({ useHandCursor: true })
		exitButton.on('pointerdown', () => this.hide(),this)
		exitButton.on('pointerover', () => exitButton.preFX.addGlow(16777215, 4, 0, false),this);
		exitButton.on('pointerout', () => exitButton.preFX.clear(),this);

		this.scene.events.on('update', this.onSceneUpdate, this);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	bg;
	/** @type {Phaser.GameObjects.Text} */
	msg;
	/** @type {Phaser.GameObjects.Sprite} */
	exitButton;

	/* START-USER-CODE */

	// Write your code here.

	onSceneUpdate(){
		if(this.visible){
			const cam = this.scene.cameras.main;

			let fullWidth = Math.floor(this.getBounds().width)
			let fullHeight = Math.floor(this.getBounds().height)

			let newX = cam.worldView.right - fullWidth - 60
			let newY = cam.worldView.top + 10

			this.setPosition(
				Phaser.Math.Linear(this.x, newX, 1),
				Phaser.Math.Linear(this.y, newY, 1),
			);
		}
	}


	alert(msg = "demo"){
		this.fadeInAnim()

		this.msg.text = msg;

		// this.scene.time.delayedCall(5000, () => {
		// 	if(this.visible == true) this.fadeOutAnim()
		// },{}, this);
	}

	hide(){
		this.fadeOutAnim()
	}

	fadeOutAnim(){
		this.scene.tweens.add({
			targets: this,
			alpha: { start: 1, to: 0 },
			ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
			duration: 500,
			repeat: 0,            // -1: infinity
			yoyo: false,
			onComplete: () => {
				this.visible = false
				this.apha = 1
			},
		});		
	}

	fadeInAnim(){
		this.visible = true
		this.alpha = 0;

		this.scene.tweens.add({
			targets: this,
			alpha: { start: 0, to: 1 },
			ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
			duration: 500,
			repeat: 0,            // -1: infinity
			yoyo: false,
		});		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
