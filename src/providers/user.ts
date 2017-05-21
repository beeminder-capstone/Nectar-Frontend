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
  private userSettings: any;
  private beeminderUser: any;
  public goals: any = [];
  private isLoggedIn: boolean;
  private nectarUser: any;
  providersfrontend: Array<{ url: string, title: string, name: string }> = [
		{ url: "https://www.beeminder.com", title: "Beeminder", name: "beeminder" },
		{ url: "https://austin.bcycle.com", title: "Austin Bcycle", name: "bcycle" },
		{ url: "https://bitbucket.org/", title: "Bitbucket", name: "bitbucket" },
		{ url: "https://www.blogger.com", title: "Blogger", name: "blogger" },
		{ url: "https://www.dropbox.com/", title: "Dropbox", name: "dropbox_oauth2" },
		{ url: "https://evernote.com/", title: "Evernote", name: "evernote" },
		{ url: "https://www.facebook.com/", title: "Facebook", name: "facebook" },
		{ url: "https://www.fitbit.com/", title: "Fitbit", name: "fitbit" },
		{ url: "https://www.flickr.com/", title: "Flickr", name: "flickr" },
		{ url: "https://github.com/", title: "GitHub", name: "github" },
		{ url: "https://www.google.com/gmail", title: "Gmail", name: "gmail" },
		{ url: "https://www.google.com/calendar", title: "Google Calendar", name: "googlecalendar" },
		{ url: "https://www.google.com/drive/", title: "Google Drive", name: "googledrive" },
		{ url: "https://www.google.com/fit/", title: "Google Fit", name: "googlefit" },
		{ url: "https://plus.google.com", title: "Google+", name: "googleplus" },
		{ url: "https://mail.google.com/tasks", title: "Google Tasks", name: "googletasks" },
		{ url: "https://www.instagram.com/", title: "Instagram", name: "instagram" },
		{ url: "https://www.khanacademy.org/", title: "KhanAcademy", name: "khan_academy" },
		{ url: "https://www.linkedin.com/", title: "LinkedIn", name: "linkedin" },
		{ url: "https://products.office.com/en-US/", title: "Microsoft Office365", name: "microsoft_office365" },
		{ url: "https://moves-app.com/", title: "Moves", name: "moves" },
		{ url: "https://getpocket.com", title: "Pocket", name: "pocket" },
		{ url: "https://quizlet.com", title: "Quizlet", name: "quizlet" },
		{ url: "https://www.rememberthemilk.com/", title: "Remember The Milk", name: "rtm" },
		{ url: "https://runkeeper.com/", title: "RunKeeper", name: "runkeeper" },
		{ url: "https://slack.com/", title: "Slack", name: "slack" },
		{ url: "https://stackoverflow.com/", title: "Stack Overflow", name: "stackoverflow" },
		{ url: "https://www.strava.com/", title: "Strava", name: "strava" },
		{ url: "https://trello.com", title: "Trello", name: "trello" },
		{ url: "https://www.tumblr.com/", title: "Tumblr", name: "tumblr" },
		{ url: "https://twitter.com/", title: "Twitter", name: "twitter" },
		{ url: "http://typeracer.com", title: "Typeracer", name: "typeracer" },
		{ url: "https://en.wikipedia.org/wiki/Main_Page", title: "Wikipedia", name: "wikipedia" },
		{ url: "https://join.worldcommunitygrid.org?recruiterId=734146", title: "World Community Grid", name: "worldcommunitygrid" },
		{ url: "https://www.wunderlist.com/", title: "Wunderlist", name: "wunderlist" },
		{ url: "https://www.youtube.com/", title: "Youtube", name: "youtube" }
	];

  constructor(public storage: Storage, public beeminder: BeeminderApi, public nectar: NectarApi, private toastCtrl: ToastController, @Inject(EnvVariables) public envVariables) {
    storage.get('beeminderUser').then(beeminderUser => {
      if(beeminderUser == null) {
        //this.setbeeminderUser();
      } else {
        this.beeminderUser = beeminderUser;
      }
    });
	
	storage.get('goals').then(goals => {
      if (goals == null) {
        this.setGoals();
      } else {
        this.goals = goals;
      }
    });

    storage.get('nectarUser').then(nectarUser => {
      if(nectarUser == null) {
        this.setnectarUser();
      } else {
        this.nectarUser = nectarUser;
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
  
  getUser() {
    return this.beeminder.fetchUser();
  }
  
  setbeeminderUser() {
    return this.beeminder.fetchUser().subscribe(userObject => {
	  this.setbeeminderUserObject(userObject);
	}, err => {
		if(err){
		  console.error(err);
		}
	});
  }
  
  setbeeminderUserObject(userObject: any) {
	this.beeminderUser = userObject;
	this.storage.set('beeminderUser', this.beeminderUser);
  }
  
  getGoal(slug: string) {
    return this.beeminder.fetchGoal(slug);
  }

  getGoals() {
    return this.beeminder.fetchGoals();
  }
  
  refreshGoal(slug: string) {
    return this.beeminder.refreshGoal(slug).subscribe(value => {
	  this.presentToast('The Beeminder goal ' + slug + ' was successfully refreshed.');
	}, err => {
	    if(err){
		  console.error(err);
		  alert('An error occurred refreshing Beeminder goal ' + slug + ': ' + JSON.stringify(err) + '.');
		}
	});
  }
  
  setGoals() {
    return this.beeminder.fetchGoals().subscribe(userGoals => {
	  this.goals = userGoals;
	  this.storage.set('goals', this.goals);
	}, err => {
		if(err){
		  console.error(err);
		}
	});
  }
  
  setnectarUser() {
    return this.nectar.getUserObject(this.envVariables.DOMAIN_NAME, this.envVariables.SECRET_KEY).subscribe(userObject => {
	  this.nectarUser = userObject;
	  this.storage.set('nectarUser', this.nectarUser);
	}, err => {
		if(err){
		  console.error(err);
		}
	});
  }

  addbeeminderGoal(goal: any) {
    this.beeminder.createGoal(goal).subscribe(newbeeminderGoal => {
	  this.goals.push(newbeeminderGoal);
	  this.presentToast('The Beeminder goal ' + newbeeminderGoal.slug + ' was successfully created.');
	}, err => {
	    if(err){
		  console.error(err);
		  alert('An error occurred creating Beeminder goal ' + goal.slug + ': ' + JSON.stringify(err) + '.');
		}
	});
  }
  
  addnectarGoal(slug: string, metricKey: string, credentialId: number, active: boolean, baseUrl: string, secretKeyBase: string) {
	let nectargoal = {
      credential_id: credentialId,
      metric_key: metricKey,
      slug: slug,
	  active: active
    };
	
	let beemindergoal = {
	  datasource: 'api'
    };
	
    this.nectar.createGoal(nectargoal, baseUrl, secretKeyBase).subscribe(newnectarGoal => {
      this.nectarUser.goals.push(newnectarGoal);
	  
	  this.beeminder.editGoal(beemindergoal, slug).subscribe(newbeeminderGoal => {
        this.goals[slug] = newbeeminderGoal;
      }, err => {
		if(err){
		  console.error(err);
		}
	  });
	  
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

  editbeeminderGoal(goal: any, oldslug: string) {
    this.beeminder.editGoal(goal, oldslug).subscribe(newbeeminderGoal => {
      this.goals[oldslug] = newbeeminderGoal;
	  this.presentToast('The Beeminder goal ' + newbeeminderGoal.slug + ' was successfully updated.');
    }, err => {
		if(err){
		  console.error(err);
		  alert('An error occurred updating Beeminder goal ' + oldslug + ': ' + err+ '.');
		}
	});
  }
  
  updatenectarGoal(slug: string, oldslug: string, id: number, metricKey: string, credentialId: number, active: boolean, baseUrl: string, secretKeyBase: string) {
	let nectargoal = {
      credential_id: credentialId,
      metric_key: metricKey,
      slug: slug,
	  active: active
    };
	
    this.nectar.updateGoal(nectargoal, id, baseUrl, secretKeyBase).subscribe(newnectarGoal => {
      this.nectarUser.goals[oldslug] = newnectarGoal;
	  
	  if(slug != oldslug){
	    let oldbeemindergoal = {
		  datasource: 'manual'
		};
		
		let beemindergoal = {
		  datasource: 'api'
		};
		
		this.beeminder.editGoal(oldbeemindergoal, oldslug).subscribe(newbeeminderGoal => {
          this.goals[oldslug] = newbeeminderGoal;
        }, err => {
		  if(err){
		    console.error(err);
		  }
	    });
		
		this.beeminder.editGoal(beemindergoal, slug).subscribe(newbeeminderGoal => {
          this.goals[slug] = newbeeminderGoal;
        }, err => {
		  if(err){
		    console.error(err);
		  }
	    });
	  }
	  
	  this.presentToast('The Nectar goal ' + slug + ' was successfully updated.');
    }, err => {
		if(err){
		  console.error(err);
		  alert('An error occurred updating Nectar goal ' + oldslug + ': ' + err + '.');
		}
	});
  }

  getDatapoints(goal: any){
    return this.beeminder.fetchDatapoints(goal);
  }

  addDataPoint(goal: any, datapoint: any){
    return this.beeminder.addDataPoint(goal, datapoint).subscribe(data => this.presentToast('The datapoint was successfully added to goal ' + goal.slug + '.'), err => {
	    if(err){
		  console.error(err);
		  alert('An error occurred adding the datapoint to goal ' + goal.slug + ': ' + JSON.stringify(err) + '.');
		}
	  }
  )}
  
  editDataPoint(goal: any, id: string, datapoint: any){
    return this.beeminder.editDataPoint(goal, id, datapoint).subscribe(data => this.presentToast('The datapoint was successfully updated for goal ' + goal.slug + '.'), err => {
	    if(err){
		  console.error(err);
		  alert('An error occurred updating the datapoint for goal ' + goal.slug + ': ' + JSON.stringify(err) + '.');
		}
	  }
  )}
  
  redirect(){
	return this.beeminder.redirect();
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

  setLoginStatus(username: string, access_token: string) {
	return this.storage.set('username', username)
	.then(() => this.nectar.username = username)
	.then(() => this.storage.set('access_token', access_token))
	.then(() => this.beeminder.access_token = access_token)
	.then(() => this.setbeeminderUser())
	.then(() => this.setGoals())
	.then(() => this.setnectarUser())
    .then(() => this.storage.set('isLoggedIn', true));
  }

  logout() {
	this.beeminder.access_token = null;
	this.nectar.username = null;
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

  getIntergrationStatus(integration: any) {
	return this.nectarUser.credentials.some(p => p.provider_name == integration.name);
  }
  
  getIntergration(goal: any) {
    if(!this.nectarUser)
	  return null;
	
    for (let g of this.nectarUser.goals) {
      if (g.slug == goal.slug) {
        return this.getCredentialname(g.credential_id);
      }
    }
  }
  
  getIntergrationGoal(goal: any) {
	return this.nectarUser.goals.find(g => g.slug == goal.slug);
  }
  
  getProvider(name: string) {
    return this.providersfrontend.find(p => p.name == name);
  }

  //Returns list of all integrations that the user is logged into
  /*getLoggedInIntergrations() {
    let integrations = [];
    let integration = { provider_name: String, icon: String, id: Number };

    for (let credential of this.nectarUser.credentials) {
      integration.provider_name = credential.provider_name;
      integration.icon = credential.provider_name;
      integration.id = credential.id;
    }

    return integrations;
  }*/

  /*getMetrics(provider: string) {
    return this.nectarUser.providers[provider].metrics_repo.collection;
  }*/
  
  getMetric(provider: string, key: string) {
	let integration = this.nectarUser.providers.find(p => p[0] == provider);
	let metrics = integration[1].metrics_repo.collection;
	let metricKeys = Object.keys(metrics);
    for (let m of metricKeys) {
	  if (metrics[m].key == key) {
        return metrics[m];
      }
    }
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
  
  presentToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});

		toast.present();
	}
}
