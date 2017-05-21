/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { InAppBrowser } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

@Injectable()
export class BeeminderApi {
  //callback_uri: string = 'https://localhost/callback';
  baseUrl: string = 'https://www.beeminder.com/api/v1';
  access_token: string;
  //client_id: string = '4nqs6w7oxdutqq0qg09gq72i8';

  constructor(private http: Http, storage: Storage) {
    storage.get('access_token').then(token => {
      if (token == null) {
        // Intial startup will always output a error until dependency in login.ts is removed
      } else {
        this.access_token = token;
      }
    });
  }
  
  /*login() {
    let url = 'https://www.beeminder.com/apps/authorize?client_id=' + this.client_id +
      '&redirect_uri' + this.callback_uri + '&response_type=token';
    let browser = new InAppBrowser(url, '_blank');

    let listener = browser.on("loadstart").subscribe(event => {
      if (event.url.indexOf("http://localhost/callback") > -1) {
        listener.unsubscribe();
        browser.close();
        return event.url.split('=')[1].split('&')[0];
      }
      else {
        return console.error("Failed to authenticate");
      }
    });
  }*/
  
  /*getaccess_token(code, nectarbaseUrl, client_id, client_secret) {
    //https://www.beeminder.com/apps/authorize?client_id=YOURCLIENTID&client_secret=YOURCLIENTSECRET&grant_type=authorization_code&code=THISISTHECODE&redirect_uri=YOURREDIRECTURI
	//https://cloud.digitalocean.com/v1/oauth/token?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=CALLBACK_URL
    let url = 'https://www.beeminder.com/apps/authorize?client_id=' + client_id + '&client_secret=' + client_secret + '&grant_type=refresh_token&code=' + code + '&redirect_uri=' + nectarbaseUrl + '/auth/beeminder/callback';
    return this.http.post(url, null)
      .map(res => res.json())
	  .catch(err => Observable.throw(err.json().errors));
  }*/
  
  fetchUser() {
    let url = this.baseUrl + '/users/me.json?access_token=' + this.access_token;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().errors));
  }
  
  fetchGoal(slug: string) {
    let url = this.baseUrl + '/users/me/goals/' + slug + '.json?access_token=' + this.access_token + '&datapoints=true';
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().errors));
  }

  fetchGoals() {
    let url = this.baseUrl + '/users/me/goals.json?access_token=' + this.access_token;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().errors));
  }
  
  refreshGoal(slug: string) {
    let url = this.baseUrl + '/users/me/goals/' + slug + '/refresh_graph.json?access_token=' + this.access_token;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().errors));
  }

  editGoal(goal: any, oldslug: string) {
    let url = `${this.baseUrl}/users/me/goals/${oldslug}.json?access_token=${this.access_token}`;
    return this.http.put(url, goal)
      .map(res => res.json())
	  .catch(err => Observable.throw(err.json().errors));
  }

  createGoal(goal: any) {
    let url = this.baseUrl + '/users/me/goals.json?access_token=' + this.access_token;
    return this.http.post(url, goal)
      .map(res => res.json())
	  .catch(err => Observable.throw(err.json().errors));
  }
  
  editDataPoint(goal: any, id: string, datapoint: any){
    let url = this.baseUrl + '/users/me/goals/' + goal.slug + '/datapoints/' + id + '.json?access_token=' + this.access_token;

    return this.http.put(url, datapoint)
      .map(res => res.json())
	  .catch(err => Observable.throw(err.json().errors));
  }

  addDataPoint(goal: any, datapoint: any){
    let url = this.baseUrl + '/users/me/goals/' + goal.slug + '/datapoints.json?access_token=' + this.access_token;

    return this.http.post(url, datapoint)
      .map(res => res.json())
	  .catch(err => Observable.throw(err.json().errors));
  }

  fetchDatapoints(goal: any) {
    let url = this.baseUrl + '/users/me/goals/' + goal.slug + '/datapoints.json?access_token=' + this.access_token;
    return this.http.get(url)
      .map(res => res.json())
	  .catch(err => Observable.throw(err.json().errors));
  }
  
  redirect(){
    return this.baseUrl + '/users/me.json?access_token=' + this.access_token + '&redirect_to_url=https://www.beeminder.com';
  }

}
