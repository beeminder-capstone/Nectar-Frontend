import { Component } from '@angular/core';

import { NavController, AlertController, ToastController} from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html'
})

export class Page4 {
  username: string;
  access_token: string;
  notification_toggle: boolean;
  sound_toggle: boolean;
  vibration_toggle: boolean;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public user: User) {

    this.storage.get('username').then((value) => {
		  this.username = value;
	  });

    this.storage.get('access_token').then((value) => {
		  this.access_token = value;
	  });

    this.notification_toggle = this.user.getSettings().enableNotifications;
    this.sound_toggle = this.user.getSettings().enableSound;
    this.vibration_toggle = this.user.getSettings().enableVibration;
  }

  toggleNotification() {
    user.changeSetting('enableNotifications', this.notification_toggle);
  }

  toggleSound() {
    user.changeSetting('enableSounds', this.sound_toggle);
  }

  toggleVibration() {
    user.changeSetting('enableVibration', this.vibration_toggle);
  }

  showAbout() {
    let about = this.alertCtrl.create({
      title: 'About Nectar',
      message: 'Nectar adds support for more integrations on <a target="_blank" href="https://beeminder.com">Beeminder</a>.<br>Automatically gets data from supported integrations and adds it to Beeminder goals.',
      buttons: ['OK']
    });
    about.present();
  }

  showOpenSource() {
    let openSource = this.alertCtrl.create({
      title: 'Nectar Licence',
      message: '&copy; <a href="https://www.pdx.edu/" target="_blank">PSU</a> <a href="https://www.pdx.edu/computer-science/" target="_blank">CS</a> <a target="_blank" href="http://wiki.cs.pdx.edu/capstone/fall_2016/fall_2016.html">Capstone</a>. Source Code: <a target="_blank" href="https://github.com/beeminder-capstone/Nectar-Frontend">https://github.com/beeminder-capstone/Nectar-Frontend</a>.',
      buttons: ['OK']
    });
    openSource.present();
  }

  showFeedback() {
    let prompt = this.alertCtrl.create({
      title: 'Send Feedback',
      inputs: [
        {
          name: 'Feedback',
          placeholder: 'Message'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Send',
          handler: () => {
            // temp handler(), working on sending to email
            let toast = this.toastCtrl.create({
              message: 'Feedback Message Sent',
              duration: 3000
            });
            toast.present();
          }
        }
      ]
    });
    prompt.present();
  }
}
