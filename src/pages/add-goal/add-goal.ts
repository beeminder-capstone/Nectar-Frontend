import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ConnectIntegrationPage } from '../connect-integration/connect-integration';

import { CreateGoalSettingsPage } from '../create-goal-settings/create-goal-settings';

@Component({
	selector: 'page-add-goal',
	templateUrl: './add-goal.html'
})

export class AddGoalPage {

	constructor(public navCtrl: NavController) {}

	goToCreateManualGoal() {
    this.navCtrl.push(CreateGoalSettingsPage, {manualGoal: true});
  }

  goToConnectIntegration() {
    this.navCtrl.push(ConnectIntegrationPage);
  }
}
