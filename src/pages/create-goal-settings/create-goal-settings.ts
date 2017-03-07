import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

@Component ({
  selector: 'page-create-goal-settings',
  templateUrl: 'create-goal-settings.html'
})

export class CreateGoalSettingsPage {
  integration: string;
  metric: string;
  isManualGoal: boolean;

  constructor(public params: NavParams) {
    this.isManualGoal = this.params.get('manualGoal');

    if (this.isManualGoal) {
      this.integration = "Manual";
      this.manualGoal();
    }
    else {
      this.integration = this.params.get('integration');
      this.metric = this.params.get('metric');
      this.integrationGoal();
    }
  }

  manualGoal() {

  }

  integrationGoal() {

  }
}
