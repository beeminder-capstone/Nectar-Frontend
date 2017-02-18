import { Component } from '@angular/core';

import { AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from 'ionic-native';

import { User } from '../../providers/user';

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html'
})

/* Constructor
   sets username and access_token to value set in storage
   creates notification_toggle, sound_toggle, and vibration_toggle
   creates and sets feedback_email variable */

export class Page4 {
  username: string;
  access_token: string;
  notification_toggle: boolean;
  sound_toggle: boolean;
  vibration_toggle: boolean;
  feedback_email = 'nectarapp.feedback@gmail.com';

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

  /* ionViewWillEnter() function 
     sets notificaion_toggle, sound_toggle, and vibration_toggle to
	 user's variables in user.ts page */
  ionViewWillEnter() {
    this.notification_toggle = this.user.getSettings().enableNotifications;
    this.sound_toggle = this.user.getSettings().enableSound;
    this.vibration_toggle = this.user.getSettings().enableVibration;
  }

  /* toggleNotifcation() function
     Function called when user changes Enable toggle in Settings page
     calls changeSettings() fuction in user.ts
     sets enableNotification variable to changed state */
  toggleNotification() {
    this.user.changeSetting('enableNotifications', this.notification_toggle);
  }

  /* toggleSound() function
     Function called when user changes Sound toggle in Settings page
     calls changeSettings() fuction in user.ts
     sets enableSound variable to changed state */
  toggleSound() {
    this.user.changeSetting('enableSound', this.sound_toggle);
  }


 /* toggleVibration() function
     Function called when user changes Vibration toggle in Settings page
     calls changeSettings() fuction in user.ts
     sets enableVibration variable to changed state */
  toggleVibration() {
    this.user.changeSetting('enableVibration', this.vibration_toggle);
  }

  /* showAbout() function
     Function called when user clicks on About button in Settings page
     Displays information in popup window */
   showAbout() {
    let about = this.alertCtrl.create({
      title: 'About Nectar',
      message: 'Nectar adds support for more integrations on <a target="_blank" href="https://beeminder.com">Beeminder</a>.<br>Automatically gets data from supported integrations and adds it to Beeminder goals.',
      buttons: ['OK']
    });
    about.present();
  }

  /* showOpenSource() function
     Function called when user clicks on License button in Settings page
     Displays information in popup window */
  showOpenSource() {
    let openSource = this.alertCtrl.create({
      title: 'Nectar Licence',
      message: '&copy; <a href="https://www.pdx.edu/" target="_blank">PSU</a> <a href="https://www.pdx.edu/computer-science/" target="_blank">CS</a> <a target="_blank" href="http://wiki.cs.pdx.edu/capstone/fall_2016/fall_2016.html">Capstone</a>. Source Code: <a target="_blank" href="https://github.com/beeminder-capstone/Nectar-Frontend">https://github.com/beeminder-capstone/Nectar-Frontend</a>.',
      buttons: ['OK']
    });
    openSource.present();
  }


  /* showFeedback() function
     Function called when user clicks on Send Feedback button in Settings page
     Opens email client from user's default email provider with username in subject field
	 and Nectarapp.feedback@gmail in To field */
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
              SocialSharing.shareViaEmail("", 'User Feedback: ' + this.username, [this.feedback_email])
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

 /* createToast function
    In: message to be displayed to user
    displays message passed in at bottom of page
    mostly called by sendFeedback() to send information to user
 */
  createToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
}
