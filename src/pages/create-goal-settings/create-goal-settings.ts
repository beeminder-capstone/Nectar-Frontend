/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

@Component({
	selector: 'page-create-goal-settings',
	templateUrl: 'create-goal-settings.html'
})
export class CreateGoalSettingsPage {
	access_token: string;
	integrationParam: any;
	metricParam: any;

	constructor(public navCtrl: NavController, public storage: Storage, private params: NavParams, public user: User, private toastCtrl: ToastController, ) {
		this.integrationParam = params.get("integration");
		this.metricParam = params.get("metric")
	}

	ionViewDidLoad() {
		// console.log(this.integrationParam);
		// console.log(this.metricParam);
	}


	onSubmit(formData) {
		console.log(formData)

		let goal = {
			title: formData.goalName,
			selected_integration: formData.integration,
			unit: formData.unit,
			rate: formData.rate
		}
		this.user.addGoal(goal);
		this.presentToast();
	}

	presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Goal Was Set Successfully',
			duration: 3000,
			position: 'top'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
}