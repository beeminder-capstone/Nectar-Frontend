import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Storage} from '@ionic/storage';

@Injectable()
export class NectarApi {
  username: string;
  secretKeyBase: string;
  baseUrl: string = 'https://beemindernectar.herokuapp.com/api/v1';
  mockIntegrations = [
    {title: 'Facebook', icon: 'facebook', metrics: ['Posts Per Day', 'Likes Per Week', 'Logins Per Month']},
    {title: 'Flickr', icon: 'flickr', metrics: ['Uploads Per Week', 'Visits Per Month', 'Comments Per Week']},
    {title: 'Instagram', icon: 'instagram', metrics: ['Uploads Per Day', 'Likes Per Week', 'Followers Per Month']},
    {title: 'Github', icon: 'github', metrics: ['Commits Per Day', 'Pull Requests Per Week', 'New Repos Per Month']},
    {title: 'Pocket', icon: 'pocket', metrics: ['Articles Read Per Week', 'Articles Added Per Day', 'Something Something Articles']},
    {title: 'Slack', icon: 'slack', metrics: ['Logins Per Week', 'Direct Messages Read', 'GIFs Uploaded']}
  ];

  userObject = {credentials:{id: String, provider_name:String},
                providers:[String,{metrics_repo:{collection:{key:String,description:String,title:String}}}]};
  private user;
  private integrations;

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

  //Returns list of all integrations that work with Nectar
  getIntergrations() {
    this.user = this.getUserObject();
    this.integrations = [];
    let integration = {title:String, icon:String, metrics:[]};
    for (let provider of this.user.providers) {
      integration.title=provider.provider_name;
      integration.icon=provider.provider_name;
      integration.metrics=provider.metrics_repo.collection

      this.integrations.push(integration);
    }

    return this.integrations;
  }


  //Returns list of all integrations that work with Nectar
  getLoggedInIntergrations() {
    this.user = this.getUserObject();
    this.integrations = [];
    let integration = {title:String, icon:String, metrics:[]};
    for (let credential of this.user.credentials) {
      integration.title=credential.provider_name;
      integration.id = credential.id;
    }

    return this.mockIntegrations;
  }

  //Checks if user is logged in to an integration, if the user isn't, returns false
  isLoggedIn(integration: String){
    for (let user of this.user) {
      if (user.credentials.provider_name==integration) {
        return true;
      }
    }
    return false;
  }





  // getMetrics(integration: string) {
  //
  //   return ['Posts Per Day', 'Likes Per Day', 'Logins Per Month'];
  // }
}
