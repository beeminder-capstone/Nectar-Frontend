/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BeeminderApi } from './beeminder-api';
import { NectarApi } from './nectar-api';
import { Inject } from '@angular/core';
import { EnvVariables } from '../app/environment-variables/environment-variables.token';

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
  public goals = [];
  private isLoggedIn: boolean;
  private nectarUser: any;

  constructor(public storage: Storage, public beeminder: BeeminderApi, public nectar: NectarApi, private toastCtrl: ToastController, @Inject(EnvVariables) public envVariables) {
    storage.get('goals').then(goals => {
      if (goals == null) {
        beeminder.fetchGoals().subscribe(userGoals => {
          this.goals = userGoals;
          storage.set('goals', this.goals);
        });
      } else {
        this.goals = goals;
      }
    });

    storage.get('nectarUser').then(nectarUser => {
      if(nectarUser == null) {
        nectar.getUserObject(this.envVariables.DOMAIN_NAME, this.envVariables.SECRET_KEY).subscribe(userObject => this.nectarUser = userObject);
      } else {
        // Since we never refresh this leave it commented out
        //this.nectarUser = nectarUser;
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

  addbeeminderGoal(goal) {
    this.beeminder.createGoal(goal).subscribe(newbeeminderGoal => {
	  this.goals.push(newbeeminderGoal);
	  this.presentToast('The Beeminder goal ' + goal.slug + ' was successfully created.');
	}, err => {
	    if(err){
		  console.error(err);
		  alert('An error occurred creating Beeminder goal ' + goal.slug + ': ' + JSON.stringify(err) + '.');
		}
	});
  }
  
  addnectarGoal(slug, metricKey, credentialId, active, baseUrl, secretKeyBase) {
	let nectargoal = {
      credential_id: credentialId,
      metric_key: metricKey,
      slug: slug,
	  active: active
    };
	
    this.nectar.createGoal(nectargoal, baseUrl, secretKeyBase).subscribe(newnectarGoal => {
      this.nectarUser.goals.push(newnectarGoal);
	  this.presentToast('The Nectar goal ' + slug + ' was successfully created.');
    }, err => {
		if(err){
		  console.error(err);
		  alert('An error occurred creating Nectar goal ' + slug + ': ' + err + '.');
		}
	});
  }

  /*addIntegration(beemindergoal, metricKey, credentialId, active, baseUrl, secretKeyBase) {
    this.beeminder.createGoal(beemindergoal).subscribe(newbeeminderGoal => {
	  let nectargoal = {
        credential_id: credentialId,
        metric_key: metricKey,
        slug: newbeeminderGoal.slug,
	    active: active
      };
	
      this.nectar.createGoal(nectargoal, baseUrl, secretKeyBase).subscribe(newnectarGoal => {
        this.goals.push(newbeeminderGoal);
        this.nectarUser.goals.push(newnectarGoal);
      })
    })
  }*/

  editbeeminderGoal(goal) {
    this.beeminder.editGoal(goal).subscribe(newnectarGoal => {
      this.goals[goal.slug] = newnectarGoal;
	  this.presentToast('The Beeminder goal ' + goal.slug + ' was successfully updated.');
    }, err => {
		if(err){
		  console.error(err);
		  alert('An error occurred editing Beeminder goal ' + goal.slug + ': ' + err+ '.');
		}
	});
  }
  
  updatenectarGoal(slug, metricKey, credentialId, active, baseUrl, secretKeyBase) {
	let nectargoal = {
      credential_id: credentialId,
      metric_key: metricKey,
      slug: slug,
	  active: active
    };
	
    this.nectar.updateGoal(nectargoal, baseUrl, secretKeyBase).subscribe(newnectarGoal => {
      this.nectarUser.goals[slug] = newnectarGoal;
	  this.presentToast('The Nectar goal ' + slug + ' was successfully updated.');
    }, err => {
		if(err){
		  console.error(err);
		  alert('An error occurred updating Nectar goal ' + slug + ': ' + err + '.');
		}
	});
  }

  getDatapoints(goal){
    return this.beeminder.fetchDatapoints(goal.slug);
  }

  addDataPoint(goal, datapoint){
    return this.beeminder.addDataPoint(goal, datapoint).subscribe(data => this.presentToast('The datapoint was successfully added to goal ' + goal.slug + '.'), err => {
	    if(err){
		  console.error(err);
		  alert('An error occurred adding the datapoint to goal ' + goal.slug + ': ' + JSON.stringify(err) + '.');
		}
	  }
  )}

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
  
  /*setaccess_token(code, nectarbaseUrl, client_id, client_secret) {
    this.beeminder.getaccess_token(code, nectarbaseUrl, client_id, client_secret).subscribe(value => {
	  this.beeminder.access_token = value.access_token;
	  this.storage.set('access_token', value.access_token);
	  this.beeminder.fetchUser().subscribe(user => {
	    this.nectar.username = user.username;
	    this.storage.set('username', user.username);
	  })
	  this.beeminder.fetchGoals().subscribe(userGoals => {
	    this.goals = userGoals;
	    this.storage.set('goals', this.goals);
	  })
	})
  }*/

  setLoginStatus() {
    this.storage.set('isLoggedIn', true);
  }

  logout() {
    this.storage.clear();
  }

  /*login() {
    this.storage.set('loggedIn', true);
    let token = this.beeminder.login();
    this.storage.set('access_token', token);
  }*/

    //Returns list of all integrations that work with Nectar
  getIntergrations() {
    let providers = [];

    for (let provider of this.nectarUser.providers) {
      let integration = {
        name: provider[0],
        metrics: provider[1].metrics_repo.collection
      };

      providers.push(integration);
    }
    return providers;
  }

  getIntergrationStatus(integration) {
    let status = false;
    for (let provider of this.nectarUser.credentials) {
      if (provider.provider_name == integration.name) {
        status = true;
      }
    }
    return status;
  }
  
  getIntergration(goal) {
    let id;
    for (let g of this.nectarUser.goals) {
      if (g.slug == goal.slug) {
        id = g.credential_id;
      }
    }
    return this.getCredentialname(id);
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
    return this.nectarUser.providers[provider].metrics_repo.collection;
  }

  getCredentialID(integrationTitle: string): number {
    for (let credential of this.nectarUser.credentials) {
      if (credential.provider_name == integrationTitle) {
        return credential.id;
      }
    }
  }
  
  getCredentialname(integrationID: number): string {
    for (let credential of this.nectarUser.credentials) {
      if (credential.id == integrationID) {
        return credential.provider_name;
      }
    }
  }
  
  presentToast(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});

		toast.present();
	}
}
