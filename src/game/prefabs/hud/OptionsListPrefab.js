// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OptionsListPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 971, y ?? 45);

		// optionMenuIconOptionMenuIcon
		const optionMenuIconOptionMenuIcon = scene.add.sprite(7, -1, "OptionMenuIcon", 0);
		optionMenuIconOptionMenuIcon.scaleX = 0.5;
		optionMenuIconOptionMenuIcon.scaleY = 0.5;
		optionMenuIconOptionMenuIcon.play("OptionMenuIconOptionMenuIcon");
		this.add(optionMenuIconOptionMenuIcon);

		// settingsIconSettingsIcon
		const settingsIconSettingsIcon = scene.add.sprite(8, 32, "SettingsIcon", 0);
		settingsIconSettingsIcon.scaleX = 0.5;
		settingsIconSettingsIcon.scaleY = 0.5;
		settingsIconSettingsIcon.play("SettingsIconSettingsIcon");
		this.add(settingsIconSettingsIcon);

		// homeButtonIconHomeButtonIcon
		const homeButtonIconHomeButtonIcon = scene.add.sprite(8, 60, "HomeButtonIcon", 0);
		homeButtonIconHomeButtonIcon.scaleX = 0.5;
		homeButtonIconHomeButtonIcon.scaleY = 0.5;
		homeButtonIconHomeButtonIcon.play("HomeButtonIconHomeButtonIcon");
		this.add(homeButtonIconHomeButtonIcon);

		// inboxIconInboxIcon
		const inboxIconInboxIcon = scene.add.sprite(8, 88, "InboxIcon", 0);
		inboxIconInboxIcon.scaleX = 0.5;
		inboxIconInboxIcon.scaleY = 0.5;
		inboxIconInboxIcon.play("InboxIconInboxIcon");
		this.add(inboxIconInboxIcon);

		// helpBottomIconHelpBottomIcon
		const helpBottomIconHelpBottomIcon = scene.add.sprite(8, 116, "HelpBottomIcon", 0);
		helpBottomIconHelpBottomIcon.scaleX = 0.5;
		helpBottomIconHelpBottomIcon.scaleY = 0.5;
		helpBottomIconHelpBottomIcon.play("HelpBottomIconHelpBottomIcon");
		this.add(helpBottomIconHelpBottomIcon);

		// logoutIconLogoutIcon
		const logoutIconLogoutIcon = scene.add.sprite(8, 144, "LogoutIcon", 0);
		logoutIconLogoutIcon.scaleX = 0.5;
		logoutIconLogoutIcon.scaleY = 0.5;
		logoutIconLogoutIcon.play("LogoutIconLogoutIcon");
		this.add(logoutIconLogoutIcon);

		// trophyIconTrophyIcon
		const trophyIconTrophyIcon = scene.add.sprite(8, 172, "TrophyIcon", 0);
		trophyIconTrophyIcon.scaleX = 0.5;
		trophyIconTrophyIcon.scaleY = 0.5;
		trophyIconTrophyIcon.play("TrophyIconTrophyIcon");
		this.add(trophyIconTrophyIcon);

		/* START-USER-CTR-CODE */
        this.isOpen = false;
        this.icons = [
            settingsIconSettingsIcon,
            homeButtonIconHomeButtonIcon,
            inboxIconInboxIcon,
            helpBottomIconHelpBottomIcon,
            logoutIconLogoutIcon,
            trophyIconTrophyIcon
        ];

        this.icons.forEach(icon => {
            icon.visible = false;
            icon.setInteractive();
        });

        optionMenuIconOptionMenuIcon.setInteractive();
        optionMenuIconOptionMenuIcon.on('pointerdown', () => {
            optionMenuIconOptionMenuIcon.play("OptionMenuIconOptionMenuIcon");
            this.toggleMenu();
        });

        settingsIconSettingsIcon.on('pointerdown', () => {
            settingsIconSettingsIcon.play("SettingsIconSettingsIcon");
            this.handleSettings();
        });

        homeButtonIconHomeButtonIcon.on('pointerdown', () => {
            homeButtonIconHomeButtonIcon.play("HomeButtonIconHomeButtonIcon");
            this.handleHome();
        });

        inboxIconInboxIcon.on('pointerdown', () => {
            inboxIconInboxIcon.play("InboxIconInboxIcon");
            this.handleInbox();
        });

        helpBottomIconHelpBottomIcon.on('pointerdown', () => {
            helpBottomIconHelpBottomIcon.play("HelpBottomIconHelpBottomIcon");
            this.handleHelp();
        });

        logoutIconLogoutIcon.on('pointerdown', () => {
            logoutIconLogoutIcon.play("LogoutIconLogoutIcon");
            this.handleLogout();
        });

        trophyIconTrophyIcon.on('pointerdown', () => {
            trophyIconTrophyIcon.play("TrophyIconTrophyIcon");
            this.handleTrophy();
        });

        this.scene.events.on('update', this.onSceneUpdate, this);

        /* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
    onSceneUpdate() {
    if (!this.visible) return;

    const cam = this.scene.cameras.main;
    let newX = cam.worldView.right - 40;
    let newY = cam.worldView.top + 30;

    this.setPosition(
        Phaser.Math.Linear(this.x, newX, 1),
        Phaser.Math.Linear(this.y, newY, 1)
    );
}

toggleMenu() {
    this.isOpen = !this.isOpen;
    this.icons.forEach((icon, index) => {
        if (this.isOpen) {
            this.scene.time.delayedCall(index * 50, () => {
                icon.visible = true;
                this.scene.tweens.add({
                    targets: icon,
                    alpha: { from: 0, to: 1 },
                    duration: 200,
                    ease: 'Power2'
                });
            });
        } else {
            icon.visible = false;
        }
    });
}

handleSettings() {
    if (this.scene.reactEvent) {
        this.scene.reactEvent.emit("show-settings-modal");
    }
}

handleHome() {
    if (this.scene.reactEvent) {
        
        this.scene.time.delayedCall(10, () => {
            this.scene.reactEvent.emit("show-navigate-modal");
        });
    }
}
handleInbox() {
    if (this.scene.reactEvent) {
        
        this.scene.time.delayedCall(10, () => {
            this.scene.reactEvent.emit("show-mail-modal");
        });
    }
}

handleHelp() {
    
    if (this.scene.reactEvent) {
        
        this.scene.time.delayedCall(10, () => {
            this.scene.reactEvent.emit("show-help-modal");
        });
    }
}

handleLogout() {
    if (this.scene.reactEvent) {
        
        this.scene.time.delayedCall(10, () => {
            this.scene.reactEvent.emit("show-signout-modal");
        });
    }
}

handleTrophy() {
    if (this.scene.reactEvent) {
        
        this.scene.time.delayedCall(10, () => {
            this.scene.reactEvent.emit("show-leaderboard-modal");
        });
    }
}

destroy() {
    this.scene.events.off('update', this.onSceneUpdate, this);
    super.destroy();
}
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here