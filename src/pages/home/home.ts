import { Component } from '@angular/core';
import { NavController, Platform, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Page1 } from '../page1/page1';
import { BeeminderApi } from '../../providers/beeminder-api';

declare var window: any;

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public constructor(
		public navCtrl: NavController,
		private platform: Platform,
		public menu: MenuController,
		public storage: Storage,
		private beeminder: BeeminderApi
	) {
		this.menu.swipeEnable(false);
	}

	public getParameterByName(name, url) {
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	public login() {
		this.platform.ready()
			.then(() => this.BeeminderLogin())
			.then(token => this.storage.set('access_token', this.getParameterByName('access_token', token)))
			.then(token => this.beeminder.access_token = token)
			.then(username => this.storage.set('username', this.getParameterByName('username', username)))
			.then(() => this.navCtrl.setRoot(Page1))
			.catch(error => console.error(error))
	}

	public BeeminderLogin(): Promise<any> {
		return new Promise(function (resolve, reject) {
			var browserRef = window.cordova.InAppBrowser.open("https://www.beeminder.com/apps/authorize?client_id=4nqs6w7oxdutqq0qg09gq72i8&redirect_uri=http://localhost/callback&response_type=token", "_blank", "location=no");
			browserRef.addEventListener("loadstart", (event) => {
				if ((event.url).indexOf("http://localhost/callback") === 0) {
					browserRef.close();
					resolve(event.url);
				}
			});
		});
	}

}
