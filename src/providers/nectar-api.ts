import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NectarApi {

  constructor(public http: Http) { }

  //Stub class to emulate what might be returned
  getIntergrations() {
    return [
      { title: 'Facebook', icon: 'facebook' },
      { title: 'Flickr', icon: 'octocat'},
      { title: 'Instragram', icon: 'instragram' },
      { title: 'Github', icon: 'github' },
      { title: 'Pocket', icon: 'octocat' },
      { title: 'Slack', icon: 'octocat' }
    ];
  }

}
