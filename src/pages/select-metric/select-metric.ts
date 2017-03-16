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
  integration: string;
  metrics: string[];

  constructor(public navCtrl: NavController, private params: NavParams, public nectar: NectarApi) {
    this.integration = this.params.get('integration');
    this.metrics = this.params.get('metrics');
  }

  selectMetric(metric) {
    this.navCtrl.push(CreateGoalSettingsPage, {
      integration: this.integration,
      metric: metric,
      manualGoal: false
    });
  }
}
