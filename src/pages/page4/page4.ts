import { Component } from '@angular/core';

import { NavController, AlertController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { Vibration } from 'ionic-native';

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html'
})

export class Page4 {
  username: string;
  access_token: string;
  notification_toggle: boolean;
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

    this.storage.get ('notification_toggle').then((value) => {
	    this.notification_toggle = value;
    });

	  this.storage.get('vibration_toggle').then((value) => {
	    this.vibration_toggle = value;
    });
  }

  onSubmit(formData) {
    // the second parameter needs to get the actual value being set when the user changes it.
    // something like:
    // this.storage.set('notification_enabled', currentEnabledState('notification_enabled'));
    // this.storage.set('notification_enabled', this.notification_enabled);
    // this.storage.set('vibration_enabled', this.vibration_enabled);
  }

  toggleNotification() {
    this.storage.set('notification_toggle', this.notification_toggle);
    // if (this.notification_toggle) {
    //   let toast = this.toastCtrl.create({
    //     message: 'Notifications Enabled',
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    // }
    // else {
    //   let toast = this.toastCtrl.create({
    //     message: 'Notifications Disabled',
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    // }
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    // toast.present();
  }

  toggleVibration() {
    this.storage.set('vibration_toggle', this.vibration_toggle);
    // if (this.vibration_toggle)
    // {
    //   let toast = this.toastCtrl.create({
    //     message: 'Vibration Enabled',
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    //   toast.onDidDismiss(() => {
    //     console.log('Dismissed toast');
    //   });
    // }
    // else {
    //   let toast = this.toastCtrl.create({
    //     message: 'Vibration Disabled',
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    //   toast.onDidDismiss(() => {
    //     console.log('Dismissed toast');
    //   });
    // }
    // toast.present();
  }

  showAbout() {
    let about = this.alertCtrl.create({
      title: 'About Nectar',
      message: 'Nectar adds support for more integrations on <a target="_blank" href="https://beeminder.com">Beeminder</a>.<br>Automatically gets data from supported integrations and adds it to Beeminder goals.',
      buttons: ['OK']
    });
    Vibration.vibrate(3000);
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
    let feedback = this.alertCtrl.create({
      title: 'Feedback',
      message: 'Send Feedback',
      buttons: [
        {
          text: 'Duh!',
          // role: 'cancel',
          // handler: () => {
          //   console.log('Cancel clicked');
          // }
        },
        {
          text: 'Chyeah!',
          // handler: () => {
          //   console.log('Buy clicked');
          // }
        }
      ]
    });
    feedback.present();
  }
}
