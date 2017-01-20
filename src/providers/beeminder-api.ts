import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { InAppBrowser } from 'ionic-native';

/*
  Generated class for the BeeminderApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BeeminderApi {
  const BASEURL:string = https://www.beeminder.com/apps/authorize?;
  const client_id: string = '4nqs6w7oxdutqq0qg09gq72i8';
  callback_uri: string = 'https://localhost/callback';
  reponse_token: string = 'token';
  url: string = this.BASEURL + this.client_id + this.callback_uri + 'token'
  access_token: string;

  constructor(public http: Http) {}

 login(): Observable<any> {
   let browser = new InAppBrowser(this.url, '_blank');
		return new Observable((resolve, reject) => {
			browser.on("loadstart", (event) => {
				if ((event.url).indexOf("http://localhost/callback") === 0) {
					browserRef.close();
					resolve(event.url);
          this.access_token = event.url.split('&', '=');
				}
			});
		});
	}


}
