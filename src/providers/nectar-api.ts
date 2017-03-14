import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';

@Injectable()
export class NectarApi {
  username: string;
  secretKeyBase: string;
  baseUrl: string = 'https://beemindernectar.herokuapp.com/api/v1';

  userObject = {
    credentials: { id: String, provider_name: String },
    providers: [String, { metrics_repo: { collection: { key: String, description: String, title: String } } }]
  };
  private user;
  private integrations = [];

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


}
