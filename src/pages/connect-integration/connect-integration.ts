/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SelectMetricPage } from '../select-metric/select-metric';

import { User } from '../../providers/user';

let window: any;

@Component({
  selector: 'page-connect-integration',
  templateUrl: 'connect-integration.html'
})

export class ConnectIntegrationPage {
  constructor(public navCtrl: NavController, public user: User) {}
  integrations: any;


  ionViewWillEnter() {
    this.integrations = this.user.getIntergrations();
  }

  selectIntegration(integration) {
    //if user isn't logged in, open oauth page
    if (!this.user.getIntergrationStatus(integration)) {
      //open oauth page
      this.IntegrationLogin(integration.title);
    }

    if (integration.metrics == null) {
      integration.metrics = [];
    }

    this.navCtrl.push(SelectMetricPage, {
      integration: integration,
      metrics: integration
    });
  }

  public IntegrationLogin(integrationTitle) {
      let browserRef = window.cordova.InAppBrowser.open('https://beemindernectar.herokuapp.com/credentials/new?provider_name=' + integrationTitle, "_self", "location=no");

      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf('https://beemindernectar.herokuapp.com/credentials/' + integrationTitle) == 0) {
          browserRef.close();
        }
      });
  }

}
