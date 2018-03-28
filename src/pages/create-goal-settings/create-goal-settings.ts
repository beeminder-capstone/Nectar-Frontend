/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

import { HomePage } from '../home/home'
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import { NetworkService } from '../../providers/network-service';

@Component({
	selector: 'page-create-goal-settings',
	templateUrl: 'create-goal-settings.html'
})
export class CreateGoalSettingsPage {
	access_token: string;
	integration: string;
	metric: string;
	description: string;
	slug: string;
	title: string;
	integrationParam: any;
	metricParam: any;
	manualGoalParam: boolean;
	icon: string;

	constructor(public navCtrl: NavController, public storage: Storage, private params: NavParams, public user: User, @Inject(EnvVariables) public envVariables, private networkService: NetworkService) {
		this.manualGoalParam = this.params.get("manualGoal");
		this.metricParam = this.manualGoalParam == true ? null : this.params.get("metric");
		this.integrationParam = this.manualGoalParam == true ? "Manual" : this.params.get("integration");
		this.icon = this.manualGoalParam == true ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + this.integrationParam.name + ".png"
		this.integration = this.manualGoalParam == true ? "Manual Goal" : 'Integration: ' + this.integrationParam.title;
		this.metric = this.manualGoalParam == true ? null : 'Metric: ' + this.metricParam.title;
		this.description = this.manualGoalParam == true ? null : 'Description: ' + this.metricParam.description;
		this.slug = this.manualGoalParam == true ? "nectar" : this.integrationParam.title.toLowerCase();
		this.title = this.manualGoalParam == true ? "Nectar" : this.integrationParam.title + ' ' + this.metricParam.title;
	}

	ngOnInit() {
		if (this.networkService.noConnection())
			this.networkService.showNetworkAlert();
	}

	onSubmit(formData, baseUrl, secretKeyBase) {
		let decade = 60 * 60 * 24 * 365 * 10;
		let d = new Date();
		let t = Math.floor(d.getTime() / 1000);
		let goaldate = t + decade;

		let beemindergoal = {
			slug: formData.slug,
			title: formData.title,
			goaldate: goaldate,
			datasource: 'manual',
			goal_type: "hustler",
			rate: formData.rate,
			gunit: formData.gunit,
			runit: formData.runit,
			secret: formData.secret
		};

		this.user.addbeeminderGoal(beemindergoal);

		if (this.manualGoalParam == true) {
			this.navCtrl.popToRoot();
			this.navCtrl.setRoot(HomePage);
		} else {
			this.navCtrl.pop();
		}
	}
}
