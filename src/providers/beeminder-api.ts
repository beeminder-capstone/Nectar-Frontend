import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { InAppBrowser } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BeeminderApi {
  BaseUrl:string = '';
  private client_id: string = '4nqs6w7oxdutqq0qg09gq72i8';
  
  callback_uri: string = 'https://localhost/callback';
  reponse_token: string;
  loginUrl: string = this.loginUrl + this.client_id + this.callback_uri + 'token'
  apiUrl: string = 'https://www.beeminder.com/api/v1/';
  access_token: string;
  user_name: string;

  constructor(private http: Http, private storage: Storage) {
    storage.get('access_token').then((token) => {
      if (token) {
        this.access_token = token;
      } else {
        this.access_token = this.login();
      }
    })
    
  }

 login(): string {
      let browser = new InAppBrowser(this.loginUrl, '_blank');
      browser.show();
      let listener = browser.on("loadstart").subscribe((event) => {
				if ((event.url).indexOf("http://localhost/callback") === 0) {
					listener.unsubscribe();
          return event.url.split('&')[0].split('=')[1];
				}
			});
      return "Error";
	}

  logout() {
    this.storage.remove('access_token');
    this.storage.remove('user_name');
  }

  fetchGoals() {
    let url = this.callback_uri + 'users/me/goals.json?access_token=' + this.access_token;
    return this.http.get(url)
      .map(res => res.json());
  }

  updateGoals() {

  }

  createGoal() {
    
  }


}
