/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

import { User } from '../../providers/user';

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

declare var window: any;

@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})

export class SettingsPage {
	username: string;
	access_token: string;
	notification_toggle: boolean;
	sound_toggle: boolean;
	vibration_toggle: boolean;

	constructor(
		public storage: Storage,
		private socialSharing: SocialSharing,
		public alertCtrl: AlertController,
		public user: User,
		@Inject(EnvVariables) public envVariables
	) {
		this.storage.get('username').then((value) => {
			this.username = value;
		});

		this.storage.get('access_token').then((value) => {
			this.access_token = value;
		});


	}

	ionViewWillEnter() {
		this.notification_toggle = this.user.getSettings().enableNotifications;
		this.sound_toggle = this.user.getSettings().enableSound;
		this.vibration_toggle = this.user.getSettings().enableVibration;
	}

	toggleNotification() {
		this.user.changeSetting('enableNotifications', this.notification_toggle);
	}

	toggleSound() {
		this.user.changeSetting('enableSound', this.sound_toggle);
	}

	toggleVibration() {
		this.user.changeSetting('enableVibration', this.vibration_toggle);
	}

	showAbout(domain_name) {
		let about = this.alertCtrl.create({
			title: 'About Nectar',
			message: 'Nectar adds support for more integrations on <a target="_blank" href="https://beeminder.com">Beeminder</a>.<br>Automatically gets data from supported integrations and adds it to Beeminder goals.<br>Visit <a target="_blank" href="' + domain_name + '">' + domain_name + '</a> for more information.',
			buttons: ['OK']
		});
		about.present();
	}

	showOpenSource() {
		let attribution = '<div><br>Nectar icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>';
		let openSource = this.alertCtrl.create({
			title: 'Nectar License',
			message: '&copy; <a href="https://www.pdx.edu/" target="_blank">PSU</a> <a href="https://www.pdx.edu/computer-science/" target="_blank">CS</a> <a target="_blank" href="http://wiki.cs.pdx.edu/capstone/fall_2016/fall_2016.html">Capstone</a>. Source Code: <a target="_blank" href="https://github.com/beeminder-capstone/Nectar-Frontend">https://github.com/beeminder-capstone/Nectar-Frontend</a>.' + attribution,
			buttons: ['OK']
		});
		openSource.present();
	}

	showFeedback() {
		let prompt = this.alertCtrl.create({
			title: 'Submit Feedback',
			message: 'Help us improve Nectar!',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Next',
					handler: data => {
						this.socialSharing.canShareViaEmail().then(() => {
							this.socialSharing.shareViaEmail("", 'User Feedback: ' + this.username, ['nectarapp.feedback@gmail.com'])
								.then(() => { this.user.presentToast('Thank you for your feedback!'); })
								.catch(() => { alert('An error occurred sending feedback.'); });
						}).catch(() => {
							alert('Sending feedback via email is not available.');
						});
					}
				}
			]
		});
		prompt.present();
	}
	
	showSupport(){
		window.cordova.InAppBrowser.open('https://www.tealdulcet.com/','_system');
	}
}
