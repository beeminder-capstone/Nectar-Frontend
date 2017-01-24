import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { BeeminderApi } from './beeminder-api';

@Injectable()
export class User {
  userSettings = [];
  goals: any;

  constructor(public storage: Storage, public beeminder: BeeminderApi) {}



  getUserName() {
    return this.storage.get('username').then(value => {
      return value;
    })
  }

  getGoals() {
    return this.storage.get('goals').then(value => {
      if (value) {
        return value;
      } else {
        return this.beeminder.fetchGoals();
      }
    });
  }

  
  changeSetting(settingName: string, value: any) {
    this.userSettings[settingName] = value;
    this.storage.set('userSettings', this.userSettings);
  }

  logout() {
    this.storage.remove('loggedIn');
    this.storage.remove('access_token')
  }

  login() {
    this.storage.set('loggedIn', 'true');
    let token = this.beeminder.login();
    this.storage.set('access_token', token);
  }


}
