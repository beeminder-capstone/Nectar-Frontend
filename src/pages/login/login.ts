/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';
import { NavController, Platform, MenuController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { User } from '../../providers/user';

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

declare var window: any;

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	private isLoggedIn: boolean;

	public constructor(
		public navCtrl: NavController,
		private platform: Platform,
		public menu: MenuController,
		public user: User,
		@Inject(EnvVariables) public envVariables
	) {
		this.menu.swipeEnable(false);
		
		this.user.getLoginStatus().then(isLoggedIn  => {
			this.isLoggedIn = isLoggedIn;
		});
	}

	public getParameterByName(name, url) {
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	public login(baseUrl, client_id) {
		let url;
		
		this.platform.ready()
			.then(() => this.BeeminderLogin(baseUrl, client_id, this.isLoggedIn))
			.then(success => url = success)
			//.then(() => this.user.setaccess_token(this.getParameterByName('code', url), baseUrl, client_id, client_secret))
			.then(() => this.user.setLoginStatus(this.getParameterByName('username', url), this.getParameterByName('access_token', url)))			
			.then(() => this.navCtrl.setRoot(HomePage))
			.catch(error => console.error(error));
	}

	public BeeminderLogin(baseUrl, client_id, isLoggedIn): Promise<any> {
		return new Promise(function (resolve, reject) {
			//var browserRef = window.cordova.InAppBrowser.open(baseUrl + '/signin', "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
			var browserRef = window.cordova.InAppBrowser.open('https://www.beeminder.com/apps/authorize?client_id=' + client_id + '&redirect_uri=http://localhost/callback&response_type=token', "_blank", isLoggedIn ? "location=no" : "location=no,clearsessioncache=yes,clearcache=yes");
			browserRef.addEventListener("loadstart", (event) => {
				//if ((event.url).indexOf(baseUrl + '/auth/beeminder/callback') === 0) {
				if ((event.url).indexOf("http://localhost/callback") === 0) {
					browserRef.close();
					resolve(event.url);
				}
			});
		});
	}

}
