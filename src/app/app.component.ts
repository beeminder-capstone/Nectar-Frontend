import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { AddGoalPage } from '../pages/add-goal/add-goal';
import { IntegrationsPage } from '../pages/integrations/integrations'
import { LoginPage} from '../pages/login/login'
import { SettingsPage} from '../pages/settings/settings';
import { GoalWizardPage } from '../pages/goal-wizard/goal-wizard';
import { CreateGoalSettingsPage } from '../pages/goal-details-form/create-goal-settings';

import { User } from '../providers/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage;
  activePage : any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public alertCtrl: AlertController, public menu: MenuController, public user: User) {
    this.user.getLoginStatus().then(isLoggedIn  => {
      //If true then go page1 else go into login page
      isLoggedIn ? this.rootPage = HomePage : this.rootPage = LoginPage;
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Add New Integration', component: IntegrationsPage },
	    { title: 'Create New Goal', component: AddGoalPage },
	    { title: 'Settings', component: SettingsPage },
      { title: 'Goal Wizard', component: GoalWizardPage },
      { title: 'Goal Settings', component: CreateGoalSettingsPage }
    ];

    this.activePage = this.pages[0];

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
    this.activePage = page;
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
            this.nav.setRoot(LoginPage);
            this.menu.toggle();
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