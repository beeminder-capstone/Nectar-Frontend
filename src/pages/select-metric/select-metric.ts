import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { BeeminderApi } from '../../providers/beeminder-api';

import { CreateGoalSettingsPage } from '../create-goal-settings/create-goal-settings';

@Component({
  selector: 'page-select-metric',
  templateUrl: 'select-metric.html'
})

export class SelectMetricPage {
  integration: string;
  metric: string;
  metrics: string[];

  constructor(public navCtrl: NavController, private params: NavParams, public beeminder: BeeminderApi) {
    // this.integration = this.params.get('integration');

    // dummy variable till Integration from Goal Wizard is figured out
    this.integration = "Facebook";
    this.metrics = this.getIntegrationMetrics();
  }

  getIntegrationMetrics() {
    /* assuming that this function from Beeminder API returns a string array of metrics
    return this.beeminder.getMetrics(this.integration);
     */
    return ['Posts Per Day', 'Likes Per Day', 'Login Per Week'];
  }
  selectMetric(metric) {
    this.metric = metric;
    this.goToCreateGoal();
  }

  goToCreateGoal() {
    this.navCtrl.push(CreateGoalSettingsPage, {
      integration: this.integration,
      metric: this.metric
    })
  }
}
