import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

declare var window: any;

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }
  
    public open(url) {
		window.cordova.InAppBrowser.open(url, "_self", "location=no");
	}

}
