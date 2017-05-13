/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';
//import { Component, Inject } from '@angular/core';
//import { EnvVariables } from '../app/environment-variables/environment-variables.token';


@Injectable()
export class NectarApi {
  username: string;
  //secretKeyBase: string;
  //baseUrl: string;

  userObject = {
    credentials: { id: String, provider_name: String },
    providers: [String, { metrics_repo: { collection: { key: String, description: String, title: String } } }]
  };

  constructor(public http: Http, storage: Storage/*, @Inject(EnvVariables) public envVariables*/) {
    //this.secretKeyBase = this.envVariables.SECRET_KEY;
    //this.baseUrl = this.envVariables.DOMAIN_NAME;
	
	storage.get('username').then(user => {
      if (user == null) {
      } else {
        this.username = user;
      }
    });
  }

  getUserObject(baseUrl: string, secretKeyBase: string) {
    // https://beemindernectar.herokuapp.com/api/v1/users/show?username=[beeminder_username]&secret_key=[heroku_secret_key_base]
    let url = baseUrl + '/api/v1/users/show?username=' + this.username + '&secret_key=' + secretKeyBase;
    return this.http.get(url)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().error));
  }

  createGoal(goal: any, baseUrl: string, secretKeyBase: string){
      // https://beemindernectar.herokuapp.com/api/v1/goals?username=[beeminder_username]&credential_id=[credential_id]&metric_key=[metric_key]&slug=[beeminder_slug]&active=1&secret_key=[heroku_secret_key_base]
      let url = baseUrl + '/api/v1/goals?username=' + this.username + '&secret_key=' + secretKeyBase;
      return this.http.post(url, goal)
        .map(res => res.json())
		.catch(err => Observable.throw(err.json().error));
  }

  updateGoal(goal: any, id: number, baseUrl: string, secretKeyBase: string){
    // https://beemindernectar.herokuapp.com/api/v1/goals/[goal_id]?username=[beeminder_username]&credential_id=[credential_id]&metric_key=[metric_key]&slug=[beeminder_slug]&active=[1_to_enable,_0_to_disable]&secret_key=[heroku_secret_key_base]
    let url = baseUrl + '/api/v1/goals/' + id + '?username=' + this.username + '&secret_key=' + secretKeyBase;
    return this.http.put(url, goal)
      .map(res => res.json())
	  .catch(err => Observable.throw(err.json().error));
  }


}
