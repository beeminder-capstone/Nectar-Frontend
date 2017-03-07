import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NectarApi } from '../../providers/nectar-api';

import { SelectMetricPage } from '../select-metric/select-metric';

@Component({
  selector: 'page-connect-integration',
  templateUrl: 'connect-integration.html'
})

export class ConnectIntegrationPage {
  integrations: any[];

  constructor(public navCtrl: NavController, public nectar: NectarApi) {
    this.integrations = this.nectar.getIntergrations();
  }

  selectIntegration(integrationTitle, integrationMetrics) {
    this.navCtrl.push(SelectMetricPage, {
      integration: integrationTitle,
      metrics: integrationMetrics
    });
  }
}
