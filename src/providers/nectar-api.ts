/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';

@Injectable()
export class NectarApi {
  username: string;
  secretKeyBase: string = '';
  baseUrl: string = 'https://beemindernectar.herokuapp.com/api/v1';

  userObject = {
    credentials: { id: String, provider_name: String },
    providers: [String, { metrics_repo: { collection: { key: String, description: String, title: String } } }]
  };

  constructor(public http: Http, storage: Storage) {
    storage.get('username').then(user => {
      if (user == null) {
      } else {
        this.username = user;
      }
    });
  }

  getUserObject() {
    // https://beemindernectar.herokuapp.com/api/v1/users/show?username=[beeminder_username]&secret_key=[heroku_secret_key_base]
    let url = this.baseUrl + '/users/show?username=' + this.username + '&secret_key=' + this.secretKeyBase;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().error));
  }

  createGoal(credential:string, metricKey:string, slug:string, goal){
      // https://beemindernectar.herokuapp.com/api/v1/goals?username=[beeminder_username]&credential_id=[credential_id]&metric_key=[metric_key]&slug=[beeminder_slug]&active=1&secret_key=[heroku_secret_key_base]
      let url = this.baseUrl + '/goals?username=' + this.username + '&credential_id=' + credential + '&metric_key=' + metricKey + '&slug=' + slug + '&active=1&secret_key=' + this.secretKeyBase;
      return this.http.post(url, goal)
        .map(res => res.json())
        .catch(error => Observable.throw(error.json().error));
  }

  updateGoal(goalID:number, credential:string, metricKey:string, slug:string, goal){
    // https://beemindernectar.herokuapp.com/api/v1/goals?username=[beeminder_username]%id=[goal_id]&credential_id=[credential_id]&metric_key=[metric_key]&slug=[beeminder_slug]&active=[1_to_enable,_0_to_disable]&secret_key=[heroku_secret_key_base]
    let url = this.baseUrl + '/goals?username=' + this.username + '%id=' + goalID + '&credential_id=' + credential + '&metric_key=' + metricKey + '&slug=' + slug + '&active=1&secret_key=' + this.secretKeyBase;
    return this.http.put(url,goal)
      .map(res => res.json())
      .catch(error => Observable.throw(error.json().error));
  }


}
