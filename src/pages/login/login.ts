import { Component } from '@angular/core';
import { NavController, Platform, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import { BeeminderApi } from '../../providers/beeminder-api';
import { User } from '../../providers/user';

declare var window: any;

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	public constructor(
		public navCtrl: NavController,
		private platform: Platform,
		public menu: MenuController,
		public storage: Storage,
		public beeminder: BeeminderApi,
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
	
	public getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
    }
    return myJson;
}

	public login() {
		this.platform.ready()
			.then(() => this.BeeminderLogin())
			.then(token => this.storage.set('access_token', this.getParameterByName('access_token', token)))
			.then(token => this.beeminder.access_token = token)
			.then(() => this.user.setLoginStatus())			
			.then((username) => { 
			  if(username && username !== null) {
			  	  this.storage.set('username', this.getParameterByName('username', username))
			  }
			})
			.then(() => this.navCtrl.setRoot(HomePage))
			.catch(error => console.error(error))
	}

	public BeeminderLogin(): Promise<any> {
	  var that = this;
	  

		return new Promise(function (resolve, reject) {
			var browserRef = window.cordova.InAppBrowser.open("https://www.beeminder.com/apps/authorize?client_id=4nqs6w7oxdutqq0qg09gq72i8&redirect_uri=http://localhost/callback&response_type=token", "_blank", "location=no");
			browserRef.addEventListener("loadstart", (event) => {
				if ((event.url).indexOf("http://localhost/callback") === 0) {
				  console.log(event.url)
				  var creds:any = that.getUrlVars(event.url);

				  that.storage.set('access_token', creds['access_token']);
				  that.storage.set('username', creds['username']);
				  console.log(creds['username'])
					browserRef.close();
					resolve(event.url);
				}
			});
		});
	}

}
