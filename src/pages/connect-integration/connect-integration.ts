/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SelectMetricPage } from '../select-metric/select-metric';

import { User } from '../../providers/user';

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

declare var window: any;

@Component({
  selector: 'page-connect-integration',
  templateUrl: 'connect-integration.html'
})

export class ConnectIntegrationPage {
  constructor(public navCtrl: NavController, public user: User, @Inject(EnvVariables) public envVariables) {}
  providers: any;
  searchproviders: any;
  providersbackend: any;
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


  ionViewWillEnter() {
    this.user.setnectarUser();
	
	this.providersbackend = this.user.getIntergrations();
	
	this.providers = [];
	
	for (let provider of this.providersbackend) {
	  let temp = this.providersfrontend.find(p => p.name == provider.name);
	  
	  let style = this.user.getIntergrationStatus(temp)==true ? 'logo' : 'logo greyed';
	
      let aprovider = {
        name: provider.name,
        metrics: provider.metrics,
		title: temp.title,
		url: temp.url,
		style: style
      };

      this.providers.push(aprovider);
    }
	
	this.searchproviders = this.providers;
  }

  selectIntegration(baseUrl, integration) {
    //if user isn't logged in, open oauth page
    if (!this.user.getIntergrationStatus(integration)) {
      //open oauth page
      this.IntegrationLogin(baseUrl, integration.name).catch(() => {
		alert('You must login to ' + integration.title + ' before you can create a new goal.');
		this.navCtrl.pop();
		return;
	  });
      //once they login, continue to the metric page
    }

    if (integration.metrics == null) {
      integration.metrics = [];
    }

    this.navCtrl.push(SelectMetricPage, {
      integration: integration
    });
  }

  public IntegrationLogin(baseUrl, integrationTitle): Promise<any> {
		return new Promise(function (resolve, reject) {
		  let browserRef = window.cordova.InAppBrowser.open(baseUrl + '/credentials/new?provider_name=' + integrationTitle, "_self", "location=no");

		  browserRef.addEventListener("loadstart", (event) => {
			if ((event.url).indexOf(baseUrl + '/credentials/' + integrationTitle) === 0) {
			  browserRef.close();
			  resolve();
			}
		  });
		  
		  browserRef.addEventListener("exit", function(event) {
            reject();
          });
		});
  }
  
  getItems(ev: any) {
    this.searchproviders = this.providers;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if(val && val.trim() != '') {
      this.searchproviders = this.searchproviders.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
