import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NectarApi } from '../../providers/nectar-api';

import { SelectMetricPage } from '../select-metric/select-metric';

declare var window: any;

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

    //if user isn't logged in, open oauth page
    if (!this.nectar.isLoggedIn(integrationTitle)) {
      //open oauth page
      this.IntegrationLogin(integrationTitle);
      //once they login, continue to the metric page
    }

    this.navCtrl.push(SelectMetricPage, {
      integration: integrationTitle,
      metrics: integrationMetrics
    });
  }

  public IntegrationLogin(integrationTitle): Promise<any> {
    return new Promise(function (resolve, reject) {
      let browserRef = window.cordova.InAppBrowser.open("https://www.beeminder.com/apps/authorize?client_id=4nqs6w7oxdutqq0qg09gq72i8&redirect_uri=http://localhost/callback&response_type=token", "_blank", "location=no");
      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf("http://localhost/callback") === 0) {
          browserRef.close();
          resolve(event.url);
        }
      });
    });
  }
}
