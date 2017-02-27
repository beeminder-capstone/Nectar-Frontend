import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { GoalDetailsPage } from '../goal-details/goal-details';

@Component({
  selector: 'page-select-metric',
  templateUrl: 'select-metric.html'
})

export class SelectMetricPage {
  integration: string;
  metric: string;
  metrics: string[];

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.integration = this.params.get('integration');
    this.metrics = ['Posts Per Day', 'Likes Per Day', 'Login Per Week'];
  }

  selectMetric(metric) {
    this.metric = metric;
    this.goToCreateGoal();
  }

  goToCreateGoal() {
    this.navCtrl.push(GoalDetailsPage, {
      integration: this.integration,
      metric: this.metric
    })
  }
}
