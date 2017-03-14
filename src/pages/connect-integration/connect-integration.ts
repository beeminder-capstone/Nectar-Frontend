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
  constructor(public navCtrl: NavController, public user: User) {}
  integrations: any;


  ionViewWillEnter() {
    this.integrations = this.user.getIntergrations();
  }

  selectIntegration(integrationTitle, integrationMetrics) {
    //if user isn't logged in, open oauth page
    // if (!this.nectar.isLoggedIn(integrationTitle,this.user.getLoggedInIntergrations())) {
    //   //open oauth page
    //   this.IntegrationLogin(integrationTitle);
    //   //once they login, continue to the metric page
    // }

    this.navCtrl.push(SelectMetricPage, {
      integration: integrationTitle,
      metrics: integrationMetrics
    });
  }

  public IntegrationLogin(integrationTitle): Promise<any> {
    return new Promise(function (resolve, reject) {
      for (let provider of this.providers){
        if (integrationTitle == provider.shortname) {
          this.url = provider.url;
        }
      }
      let browserRef = window.cordova.InAppBrowser.open('https://beemindernectar.herokuapp.com/credentials/new?provider_name=' + this.url, "_self", "location=no");
      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf("http://localhost/callback") === 0) {
          browserRef.close();
          resolve(event.url);
        }
      });
    });
  }

}
