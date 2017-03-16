import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { NectarApi } from '../../providers/nectar-api';
import { User } from '../../providers/user';

import { CreateGoalSettingsPage } from '../create-goal-settings/create-goal-settings';

@Component({
  selector: 'page-select-metric',
  templateUrl: 'select-metric.html'
})

export class SelectMetricPage {
  integration: any;
  metrics: string[];
  metricKeys: any;

  constructor(public navCtrl: NavController, private params: NavParams, public nectar: NectarApi, public user: User) {
    this.integration = this.params.get('integration');
    this.metrics = this.integration.metrics;
    this.metricKeys = Object.keys(this.metrics);
 //  this.user.getMetrics(this.integration.icon);
  }

  selectMetric(metric) {
    this.navCtrl.push(CreateGoalSettingsPage, {
      integration: this.integration.title,
      metric: metric,
      manualGoal: false
    });
  }
}
