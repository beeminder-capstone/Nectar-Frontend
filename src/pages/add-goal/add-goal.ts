import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

// temp import till Create Goal Settings path is known
import { SelectMetricPage } from '../select-metric/select-metric';

import { GoalWizardPage } from '../goal-wizard/goal-wizard';

@Component({
	selector: 'page-add-goal',
	templateUrl: 'add-goal.html'
})

export class AddGoalPage {

	constructor(public navCtrl: NavController, public storage: Storage) {}

  // linking to Goal Details Page temporarily till path is known for Create Goal Settings
	goToCreateManualGoal() {
	  this.storage.set('isManualGoal', true);
    this.navCtrl.push(SelectMetricPage);
  }

  goToIntegrations() {
	  this.storage.set('isManualGoal', false);
    this.navCtrl.push(GoalWizardPage);
  }
}
