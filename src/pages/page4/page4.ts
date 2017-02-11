import { Component } from '@angular/core';

import { NavController, AlertController, ToastController} from 'ionic-angular';

import { Storage } from '@ionic/storage';

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
    public toastCtrl: ToastController) {

    this.storage.get('username').then((value) => {
		  this.username = value;
	  });

    this.storage.get('access_token').then((value) => {
		  this.access_token = value;
	  });

    this.storage.get('notification_toggle').then((value) => {
	    this.notification_toggle = value;
    });

    this.storage.get('sound_toggle').then((value) => {
      this.sound_toggle = value;
    });

	  this.storage.get('vibration_toggle').then((value) => {
	    this.vibration_toggle = value;
    });
  }

  toggleNotification() {
    this.storage.set('notification_toggle', this.notification_toggle);
  }

  toggleSound() {
    this.storage.set('sound_toggle', this.sound_toggle);
  }

  toggleVibration() {
    this.storage.set('vibration_toggle', this.vibration_toggle);
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
