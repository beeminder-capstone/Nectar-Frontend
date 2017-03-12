/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NectarApi {
  mockIntegrations = [
  { title: 'Facebook', icon: 'facebook', metrics: ['Posts Per Day', 'Likes Per Week', 'Logins Per Month'] },
  { title: 'Flickr', icon: 'flickr', metrics: ['Uploads Per Week', 'Visits Per Month', 'Comments Per Week'] },
  { title: 'Instagram', icon: 'instagram', metrics: ['Uploads Per Day', 'Likes Per Week', 'Followers Per Month'] },
  { title: 'Github', icon: 'github', metrics: ['Commits Per Day', 'Pull Requests Per Week', 'New Repos Per Month'] },
  { title: 'Pocket', icon: 'pocket', metrics: ['Articles Read Per Week', 'Articles Added Per Day', 'Something Something Articles'] },
  { title: 'Slack', icon: 'slack', metrics: ['Logins Per Week', 'Direct Messages Read', 'GIFs Uploaded'] }
  ];

  constructor(public http: Http) { }

  //Stub class to emulate what might be returned
  getIntergrations() {
    return this.mockIntegrations;
  }

  // getMetrics(integration: string) {
  //
  //   return ['Posts Per Day', 'Likes Per Day', 'Logins Per Month'];
  // }
}
