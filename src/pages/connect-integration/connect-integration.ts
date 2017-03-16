import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SelectMetricPage } from '../select-metric/select-metric';

import { User } from '../../providers/user';

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

  selectIntegration(integration) {
    //if user isn't logged in, open oauth page
    // if (!this.nectar.isLoggedIn(integrationTitle,this.user.getLoggedInIntergrations())) {
    //   //open oauth page
    //   this.IntegrationLogin(integrationTitle);
    //   //once they login, continue to the metric page
    // }

    console.log(integration);
    this.navCtrl.push(SelectMetricPage, {
      integration: integration,
      metrics: integration
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
        if ((event.url).indexOf("http://localhost/callback") == 0) {
          browserRef.close();
          resolve(event.url);
        }
      });
    });
  }

}
