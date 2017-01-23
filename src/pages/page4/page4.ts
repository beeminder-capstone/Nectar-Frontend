import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html'
})

export class Page4 {

  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController) {

  }

  showAbout() {
    let about = this.alertCtrl.create({
      title: 'Project Nectar',
      subTitle: 'Copyright 2016-2017',
      buttons: ['OK']
    });
    about.present();
  }

  showOpenSource() {
    let openSource = this.alertCtrl.create({
      title: 'Android Open Source Project',
      subTitle: 'ADD LICENSE INFO',
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
