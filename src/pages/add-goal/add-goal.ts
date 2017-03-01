import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { CreateGoalSettingsPage } from '../create-goal-settings/create-goal-settings';

import { GoalWizardPage } from '../goal-wizard/goal-wizard';

@Component({
	selector: 'page-add-goal',
	templateUrl: 'add-goal.html'
})

export class AddGoalPage {

	constructor(public navCtrl: NavController, public storage: Storage) {}

	goToCreateManualGoal() {
	  this.storage.set('isManualGoal', true);
    this.navCtrl.push(CreateGoalSettingsPage);
  }

  goToIntegrations() {
	  this.storage.set('isManualGoal', false);
    this.navCtrl.push(GoalWizardPage);
  }
}
