/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AddGoalPage } from '../pages/add-goal/add-goal';
import { LoginPage} from '../pages/login/login';
import { SettingsPage} from '../pages/settings/settings';

import { User } from '../providers/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public alertCtrl: AlertController, public menu: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen, public user: User) {
    this.user.getLoginStatus().then(isLoggedIn  => {
      //If true then go page1 else go into login page
	  if(isLoggedIn){
		this.user.getUser().subscribe((auser) => {
			this.user.setbeeminderUserObject(auser);
			this.rootPage = HomePage;
		}, err => {
			if(err){
			  console.error(err);
			  this.rootPage = LoginPage;
			}
			else{
			  this.rootPage = HomePage;
			}
		});
	  }else{
		this.rootPage = LoginPage;
	  }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage , icon:'home'},
	    { title: 'Create New Goal', component: AddGoalPage, icon:'add-circle' },
	    { title: 'Settings', component: SettingsPage, icon:'settings' },
    ];

    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  logoutConfirm() {
    let logout = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
		  role: 'cancel'
        },
        {
          text: 'Log out',
          handler: () => {
            this.user.logout();
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    logout.present();
  }

  checkActive(page) {
    return page == this.activePage;
  }

}
