import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// currently using Goal Details page as a stub page till Create Goal Settings is sorted out.
import { GoalDetailsPage } from '../goal-details/goal-details';

@Component({
  selector: 'page-select-metric',
  templateUrl: 'select-metric.html'
})

export class SelectMetricPage {
  integration: string;
  metric: string;
  metrics: string[];

  constructor(public navCtrl: NavController, private params: NavParams) {
    // this.integration = this.params.get('integration');

    // dummy variables till Integration is figured out
    this.integration = "Facebook";
    this.metrics = ['Posts Per Day', 'Likes Per Day', 'Login Per Week'];
  }

  selectMetric(metric) {
    this.metric = metric;
    this.goToCreateGoal();
  }

  // being sent to Goal Details Page (needs to be changed to Create Goal Settings Page
  // passes in the integration and metric types
  goToCreateGoal() {
    this.navCtrl.push(GoalDetailsPage, {
      integration: this.integration,
      metric: this.metric
    })
  }
}
