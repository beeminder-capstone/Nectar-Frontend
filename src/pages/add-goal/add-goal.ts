/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
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
