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

    //Returns list of all integrations that work with Nectar
  getIntergrations() {
    let integration: any;
    let integrations = [];
    for (let provider of this.nectarUser.providers) {
      let integration = {
        title: provider[0],
        icon: provider[0],
        metrics: provider[1].metrics_repo
      }

      integrations.push(integration);
    }
    return integrations;
  }


  //Returns list of all integrations that the user is logged into
  getLoggedInIntergrations() {
    let integrations = [];
    let integration = { provider_name: String, icon: String, id: Number };

    for (let credential of this.nectarUser.credentials) {
      integration.provider_name = credential.provider_name;
      integration.icon = credential.provider_name;
      integration.id = credential.id;
    }

    return integrations;
  }

  getMetrics(provider: string) {
    return this.nectarUser.providers[provider].collections;
  }
}
