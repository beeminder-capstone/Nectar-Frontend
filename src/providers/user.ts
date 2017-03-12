/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { BeeminderApi } from './beeminder-api';

let defaultSettings = {
  enableNotifications: true,
  enableSound: true,
  enableVibration: true,
  updateTimer: '4',
  autoUpdateGoals: true,
};

@Injectable()
export class User {
  private userSettings;
  private goals = [];
  private isLoggedIn: boolean;

  constructor(public storage: Storage, public beeminder: BeeminderApi) {
    storage.get('goals').then(goals => {
      if (goals == null) {
        beeminder.fetchGoals().subscribe(userGoals => this.goals = userGoals);
        storage.set('goals', this.goals);
      } else {
        this.goals = goals;
      }
    });

    storage.get('userSettings').then(settings => {
      if (settings == null) {
        this.userSettings = defaultSettings;
        storage.set('userSettings', this.userSettings);
      } else {
        this.userSettings = settings;
      }
    });

    storage.get('isLoggedIn').then(value => {
      if (value == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = value;
      }
    });
  }

  getGoals() {
    return this.beeminder.fetchGoals();
  }

  addGoal(goal) {
    this.beeminder.createGoal(goal)
      .subscribe(() => this.goals.push(goal));
  }

  //TODO
  editGoal(goal) {
    this.beeminder.editGoal(goal).subscribe(() => {
      this.goals[goal.slug] = goal;
    });
  }

  getDatapoints(goal){
    return this.beeminder.fetchDatapoints(goal.slug);
  }

  getSettings() {
    return this.userSettings;
  }

  changeSetting(settingName: string, value: any) {
    this.userSettings[settingName] = value;
    this.storage.set('userSettings', this.userSettings);
  }

  getLoginStatus() {
    return this.storage.get('isLoggedIn')
      .then(status => { return status })
      .catch(() => { return false })
  }

  setLoginStatus() {
    this.storage.set('isLoggedIn', true);
  }

  logout() {
    this.storage.clear();
  }

  login() {
    this.storage.set('loggedIn', 'true');
    let token = this.beeminder.login();
    this.storage.set('access_token', token);
  }
}
