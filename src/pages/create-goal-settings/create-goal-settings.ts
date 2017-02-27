import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { BeeminderApi } from '../../providers/beeminder-api';

@Component({
	selector: 'create-goal-settings',
	templateUrl: 'create-goal-settings.html'
})
export class CreateGoalSettingsPage {
	access_token: string;
	private goals = [];

	constructor(public navCtrl: NavController, public storage: Storage, public beeminder: BeeminderApi) {

	}

	addGoal(goal) {
    this.beeminder.createGoal(goal)
      .subscribe(() => this.goals.push(goal));
  }

}
