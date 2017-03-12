/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';

import { AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from 'ionic-native';

import { User } from '../../providers/user';

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
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public user: User
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
      message: 'Help us improve Nectar!',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Next',
          handler: data => {
            SocialSharing.canShareViaEmail().then(() => {
              SocialSharing.shareViaEmail("", 'User Feedback: ' + this.username, ['nectarapp.feedback@gmail.com'])
                .then(() => { this.createToast('Thank you for your feedback!'); })
                .catch(() => { this.createToast('Failed to send message!'); });
            }).catch(() => {
              this.createToast('Error connecting to e-mail app');
            });
          }
        }
      ]
    });
    prompt.present();
  }

  createToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
}
