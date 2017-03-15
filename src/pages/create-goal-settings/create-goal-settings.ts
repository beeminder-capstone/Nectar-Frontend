import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

import { HomePage } from '../home/home'

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

    var decade = 60 * 60 * 24 * 365 * 10;
    var d = new Date();
    var t = Math.floor(d.getTime() / 1000);
    var goaldate = t + decade;

    let goal = {
      slug: formData.goalName,
      title: formData.goalName,
      goaldate: goaldate,
      goal_type: "hustler",
      datasource: "api",
      rate: formData.rate,
      gunit: formData.gunit,
      runit: formData.runit
    };


		this.user.addGoal(goal);
		this.presentToast();
    this.navCtrl.popToRoot();
    this.navCtrl.push(HomePage);
  }

	presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Goal created successfully',
			duration: 3000,
			position: 'bottom'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
}
