/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

import { HomePage } from '../home/home'

import { CreateGoalSettingsPage } from '../create-goal-settings/create-goal-settings';

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Component({
	selector: 'select-goal',
	templateUrl: 'select-goal.html'
})
export class SelectGoalPage {
	integrationParam: any;
	metricParam: any;
	public goals: any = [];

	constructor(public navCtrl: NavController, public loading: LoadingController, public storage: Storage, private params: NavParams, public user: User, @Inject(EnvVariables) public envVariables) {
	this.metricParam = this.params.get("metric");
    this.integrationParam = this.params.get("integration");
	
	let loader = this.loading.create({
      content: 'Loading&hellip;',
    });
	
	loader.present().then(() => {
	  user.getUser().subscribe((auser) => {
        this.goals = auser.goals;
      }, err => {
		if(err){
		  console.error(err);
		}
	  }, () => {
		loader.dismiss();
	  });
	});
  }

  onSubmit(formData, baseUrl, secretKeyBase) {
	let credentialId = this.user.getCredentialID(this.integrationParam.name);
	  
	this.user.addnectarGoal(formData.slug, this.metricParam.key, credentialId, formData.active, baseUrl, secretKeyBase);
	
	this.navCtrl.popToRoot();
    this.navCtrl.setRoot(HomePage);
  }
  
  createGoal() {
    this.navCtrl.push(CreateGoalSettingsPage, {
      integration: this.integrationParam,
      metric: this.metricParam,
      manualGoal: false
    });
  }
}
