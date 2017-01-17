import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

declare var window: any;

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  username: string;
  access_token: string;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get('username').then((value) => {
		this.username = value;
		
		this.storage.get('access_token').then((value) => {
			this.access_token = value;
			
			var url = "https://beemindernectar.herokuapp.com/auth/beeminder/callback?access_token=" + this.access_token + "&username=" + this.username;
			
			window.cordova.InAppBrowser.open(url, "_self", "location=no");
		});
	});
  }

}
