import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { BeeminderApi } from './beeminder-api';

@Injectable()
export class User {
  private userSettings = [];
  private goals = [];
  isLoggedIn: boolean;

  constructor(public storage: Storage, public beeminder: BeeminderApi) {
    storage.get('goals')
      .then(goals => this.goals = goals)
      .catch(() => beeminder.fetchGoals().subscribe(value => this.goals = value));
    storage.get('userSettings')
      .then(settings => this.userSettings = settings);
    storage.get('isLoggedIn')
      .then(value => this.isLoggedIn = value);
  }

  getGoals() { 
    return this.goals; 
  }

  addGoal(goal) {
    this.beeminder.createGoal(goal)
      .subscribe(() => this.goals.push(goal));
  }

  //TODO
  updateGoal(goal) {
    this.beeminder.updateGoal(goal)
      .subscribe(() => this.goals[goal.slug] = goal);
  }

  getSettings() {
    return this.userSettings;
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
