import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { BeeminderApi } from '../../providers/beeminder-api';

@Component({
	selector: 'page-goal-details-form',
	templateUrl: 'goal-details-form.html'
})
export class GoalDetailsFormPage {
	access_token: string;
	private goals = [];

	constructor(public navCtrl: NavController, public storage: Storage, public beeminder: BeeminderApi) {
    
	}

	addGoal(goal) {
    this.beeminder.createGoal(goal)
      .subscribe(() => this.goals.push(goal));
  }

}
