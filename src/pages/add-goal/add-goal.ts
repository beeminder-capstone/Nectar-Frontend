/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { ConnectIntegrationPage } from '../connect-integration/connect-integration';

import { CreateGoalSettingsPage } from '../create-goal-settings/create-goal-settings';

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

declare var window: any;

@Component({
	selector: 'page-add-goal',
	templateUrl: './add-goal.html'
})

export class AddGoalPage {

	constructor(public navCtrl: NavController, private platform: Platform, @Inject(EnvVariables) public envVariables) {}

	goToCreateManualGoal() {
    this.navCtrl.push(CreateGoalSettingsPage, {manualGoal: true});
  }

  goToConnectIntegration(baseUrl) {
	this.platform.ready()
		.then(() => this.BeeminderLogin(baseUrl))
		.then(() => this.navCtrl.push(ConnectIntegrationPage))
		.catch(() => {
			alert('You must login to Nectar before you can create a new goal.');
			return;
		});
  }
  
  public BeeminderLogin(baseUrl): Promise<any> {
		return new Promise(function (resolve, reject) {
			var browserRef = window.cordova.InAppBrowser.open(baseUrl + '/signin', "_blank", "location=no");
			browserRef.addEventListener("loadstart", (event) => {
				if ((event.url).indexOf(baseUrl + '/auth/beeminder/callback') === 0) {
					browserRef.close();
					resolve();
				}
			});
			
			browserRef.addEventListener("exit", function(event) {
				reject();
			});
		});
	}
}
