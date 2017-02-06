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
  notification_enabled: boolean;
  vibration_enabled: boolean;

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

    this.storage.get ('notification_enabled').then((value) => {
	    this.notification_enabled = value;
    });

	  this.storage.get('vibration_enabled').then((value) => {
	    this.vibration_enabled = value;
    });
  }

  onSubmit(formData) {
    // the second parameter needs to get the actual value being set when the user changes it.
    // something like:
    // this.storage.set('notification_enabled', currentEnabledState('notification_enabled'));
    this.storage.set('notification_enabled', false);
    this.storage.set('vibration_enabled', true);
  }


  currentEnabledState(name) {
    // I'm thinking if we just use a function to pass in the variable we need to look up and return the boolean value
  }

  // this function will be called when the state of the toggle changes and presents a toast to notify the change
  vibrateToast() {
    let toast = this.toastCtrl.create({
      message: 'Vibrate Enabled',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
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
      message: 'Is this app better than Beeminder?',
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
