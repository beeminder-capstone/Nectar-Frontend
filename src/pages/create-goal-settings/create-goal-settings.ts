/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

import { HomePage } from '../home/home'

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Component({
	selector: 'page-create-goal-settings',
	templateUrl: 'create-goal-settings.html'
})
export class CreateGoalSettingsPage {
	access_token: string;
	integrationParam: any;
	metricParam: any;
	manualGoalParam: boolean;
  icon: string;

	constructor(public navCtrl: NavController, public storage: Storage, private params: NavParams, public user: User, private toastCtrl: ToastController, @Inject(EnvVariables) public envVariables) {
    this.metricParam = params.get("metric");
    this.manualGoalParam = params.get("manualGoal");
    this.integrationParam = this.manualGoalParam==true ? "Manual" : params.get("integration");
    this.icon = this.manualGoalParam==true ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + this.integrationParam.name + ".png"
  }

	onSubmit(formData, baseUrl, secretKeyBase) {
    let credentialId = this.user.getCredentialID(this.integrationParam.name);
    let datasource = this.manualGoalParam==true ? 'manual' : 'api';
    let integration = this.manualGoalParam==true ? null : this.integrationParam.title;
    let decade = 60 * 60 * 24 * 365 * 10;
    let d = new Date();
    let t = Math.floor(d.getTime() / 1000);
    let goaldate = t + decade;


    let beemindergoal = {
      slug: formData.slug,
      title: formData.title,
      goaldate: goaldate,
      datasource: datasource,
      description: integration,
      goal_type: "hustler",
      rate: formData.rate,
      gunit: formData.gunit,
      runit: formData.runit
    };
	
	let active = 1;

	this.user.addIntegration(beemindergoal, this.metricParam.key, credentialId, active, baseUrl, secretKeyBase);
	this.presentToast();
	this.navCtrl.popToRoot();
    this.navCtrl.setRoot(HomePage);
  }

	presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Goal created successfully',
			duration: 3000,
			position: 'bottom'
		});

		toast.present();
	}
}
