import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { InAppBrowser } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class BeeminderApi {
  callback_uri: string = 'https://localhost/callback';
  baseUrl: string = 'https://www.beeminder.com/api/v1';
  access_token: string = '817a8xagha46ctr85ivwgjtkq';
  user_name: string;
 
  private client_id: string = '4nqs6w7oxdutqq0qg09gq72i8';
  
  constructor(private http: Http, private storage: Storage) {
    storage.get('access_token').then((token) => {
      if (token) {
        this.access_token = token;
      } else {
        this.login();
      }
    })

  }

  login() {
    let url = 'https://www.beeminder.com/apps/authorize?client_id=' + this.client_id + 
      '&redirect_uri' + this.callback_uri + '&response_type=token'; 
    let browser = new InAppBrowser(url, '_blank');

    let listener = browser.on("loadstart").subscribe(event => {
      if (event.url.indexOf("http://localhost/callback") > -1) {
        listener.unsubscribe();
        browser.close();
        this.access_token = event.url.split('=')[1].split('&')[0];
      }
      else {
        return console.error("Failed to authenticate");
      }
    });
  }

  logout() {
    this.storage.remove('access_token');
    this.storage.remove('user_name');
  }

  fetchGoals() {
    let url = this.baseUrl + '/users/me/goals.json?access_token=' + this.access_token;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().error));
  }

  updateGoal(goal) {
    let url = `${this.baseUrl}/users/me/goals/${goal.slug}.json`;
    this.http.put(url, goal)
             .map(res => res.json())
             .catch(err => Observable.throw(err.json().error));
  }

  createGoal(goal) {
    let url = this.baseUrl + '/users/me/goals.json?';
    this.http.post(url, goal)
             .map(res => res.json())
             .catch(error => Observable.throw(error.json().error));
  }
}
