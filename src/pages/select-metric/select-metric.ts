/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { NectarApi } from '../../providers/nectar-api';
import { User } from '../../providers/user';

import { SelectGoalPage } from '../select-goal/select-goal';

@Component({
  selector: 'page-select-metric',
  templateUrl: 'select-metric.html'
})

export class SelectMetricPage {
  integration: any;
  metrics: any;
  metricKeys: any;
  metricObject: any = [];

  constructor(public navCtrl: NavController, private params: NavParams, public nectar: NectarApi, public user: User) {
    this.integration = this.params.get('integration');
    this.metrics = this.integration.metrics;
    this.metricKeys = Object.keys(this.metrics);
    for (let m of this.metricKeys) {
      this.metricObject.push({
        title: this.metrics[m].title,
        key: this.metrics[m].key,
        description: this.metrics[m].description
      })
    }
  }

  selectMetric(metric) {
    this.navCtrl.push(SelectGoalPage, {
      integration: this.integration,
      metric: metric,
      manualGoal: false
    });
  }
}
