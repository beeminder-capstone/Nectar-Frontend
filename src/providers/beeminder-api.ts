import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { InAppBrowser } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { GoalDetails } from '../pages/goal-details/goal-details.ts';
import 'rxjs/Rx';

@Injectable()
export class BeeminderApi {
  callback_uri: string = 'https://localhost/callback';
  baseUrl: string = 'https://www.beeminder.com/api/v1';
  access_token: string;
  client_id: string = '4nqs6w7oxdutqq0qg09gq72i8';

  constructor(private http: Http, storage: Storage) {
    storage.get('access_token').then(token => {
      if (token == null) {
        // Intial startup will always output a error until dependency in login.ts is removed
      } else {
        this.access_token = token;
      }
    });
  }

  login() {
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
  }

  fetchGoals() {
    let url = this.baseUrl + '/users/me/goals.json?access_token=' + this.access_token;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().error));
  }

  editGoal(goal) {
    let url = `${this.baseUrl}/users/me/goals/${goal.slug}.json?access_token=${this.access_token}`;
    return this.http.put(url, goal)
             .map(res => res.json())
             .catch(err => Observable.throw(err.json().error));
  }

  createGoal(goal) {
    let url = this.baseUrl + '/users/me/goals.json?access_token=' + this.access_token;
    return this.http.post(url, goal)
             .map(res => res.json())
             .catch(error => Observable.throw(error.json().error));
  }

  addDataPoint(goal, datapoint){
    let url = this.baseUrl + '/users/me/goals/' + goal.slug + '/datapoints.json?timestamp=' + datapoint.timestamp + 'value=' + datapoint.value + 'comment=' + datapoint.comment;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().error));
  }

  fetchDatapoints(slug) {
    let url = this.baseUrl + '/users/me/goals/' + slug + '/datapoints.json?access_token=' + this.access_token;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().error));
  }

}
