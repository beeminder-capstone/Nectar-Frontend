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
	manualGoalParam: boolean;
  icon: string;
  integration: string;

	constructor(public navCtrl: NavController, public storage: Storage, private params: NavParams, public user: User, private toastCtrl: ToastController ) {
    this.metricParam = params.get("metric");
    this.manualGoalParam = params.get("manualGoal");
    this.integrationParam = this.manualGoalParam==true ? "Manual" : params.get("integration");
    this.icon = this.manualGoalParam==true ? "assets/logos/nectar.png" : "assets/logos/" + this.integrationParam + ".png"
  }

  ionViewDidLoad() {
    // console.log(this.integrationParam);
    // console.log(this.metricParam);
	}


	onSubmit(formData) {
    console.log(formData);
    let integration = this.manualGoalParam == null ? null : formData.integration;


    let goal = {
      title: formData.goalName,
      selected_integration: integration,
      unit: formData.unit,
      rate: formData.rate
    };
		this.user.addGoal(goal);
		this.presentToast();
	}

	presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Goal Was Set Successfully',
			duration: 3000,
			position: 'bottom'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
}
