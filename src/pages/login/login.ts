/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { NavController, Platform, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

import { BeeminderApi } from '../../providers/beeminder-api';
import { NectarApi } from '../../providers/nectar-api';
import { User } from '../../providers/user';

declare var window: any;

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	private url;

	public constructor(
		public navCtrl: NavController,
		private platform: Platform,
		public menu: MenuController,
		public storage: Storage,
		public beeminder: BeeminderApi,
    public nectar: NectarApi,
		public user: User
	) {}

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
			.then(url => this.url = url)
			.then(() => this.storage.set('username', this.getParameterByName('username', this.url)))
			.then(() => this.storage.set('access_token', this.getParameterByName('access_token', this.url)))
			.then(token => this.beeminder.access_token = token)
      .then(username => this.nectar.username = username)
      .then(() => this.user.setLoginStatus())
			.then(() => this.navCtrl.setRoot(HomePage))
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
