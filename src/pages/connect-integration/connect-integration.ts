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
    if (this.user.getIntergrationStatus(integration)) {
      //open oauth page
      this.IntegrationLogin(integration.title);
      //once they login, continue to the metric page
    }

    this.navCtrl.push(SelectMetricPage, {
      integration: integration,
      metrics: integration
    });
  }

  public IntegrationLogin(integrationTitle) {
      let browserRef = window.cordova.InAppBrowser.open('https://beemindernectar.herokuapp.com/credentials/new?provider_name=' + integrationTitle, "_self", "location=no");
      
      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf("http://localhost/callback") == 0) {
          browserRef.close();
        }
      });
  }

}
