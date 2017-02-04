import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { Vibration } from 'ionic-native';

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html'
})

export class Page4 {
  username: string;
  access_token: string;

  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController) {
	this.storage.get('username').then((value) => {
		this.username = value;
	});

	this.storage.get('access_token').then((value) => {
		this.access_token = value;
	});
  }

  onSubmit(formData) {

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
