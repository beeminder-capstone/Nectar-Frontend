import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { User } from '../providers/user';

import { HomePage } from '../pages/home/home';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Page4 } from '../pages/page4/page4';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public alertCtrl: AlertController,
              public user: User) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Goals', component: Page1 },
      { title: 'Add New Integration', component: Page2 },
	    { title: 'Create New Goal', component: Page3 },
	    { title: 'Settings', component: Page4 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logoutConfirm() {
    let logout = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.user.logout();
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    logout.present();
  }


}
