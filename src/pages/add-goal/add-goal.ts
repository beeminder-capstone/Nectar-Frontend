import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { IntegrationsPage } from '../integrations/integrations';

// temp import till Create Goal Settings path is known
import { GoalDetailsPage } from '../goal-details/goal-details';

@Component({
	selector: 'page-add-goal',
	templateUrl: 'add-goal.html'
})

export class AddGoalPage {

	constructor(public navCtrl: NavController,
              public storage: Storage) {
	  this.storage.set('isManualGoal', false);
  }

  // linking to Goal Details Page temporarily till path is known for Create Goal Settings
	goToCreateManualGoal() {
	  this.storage.set('isManualGoal', true);
    this.navCtrl.push(GoalDetailsPage);
  }

  goToIntegrations() {
    this.navCtrl.push(IntegrationsPage);
  }
}
