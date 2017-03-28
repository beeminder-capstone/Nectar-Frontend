/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Component({
	selector: 'edit-integration',
	templateUrl: 'edit-integration.html'
})
export class EditIntegrationPage {
	integration: string;
	metric: string;
	integrationParam: any;
	metricParam: any;
    icon: string;
	public goals: {};
	goal: any;
	integrationgoal: any;
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

	constructor(public navCtrl: NavController, public storage: Storage, private params: NavParams, public user: User, @Inject(EnvVariables) public envVariables) {
	user.getGoals().subscribe((goals) => {
      this.goals = goals;
    });
  }
  
  ngOnInit() {
    this.goal = this.params.data.goal;
	this.integrationgoal = this.user.getIntergrationGoal(this.goal);
	this.integrationParam = this.user.getCredentialname(this.integrationgoal.credential_id);
	this.metricParam = this.user.getMetric(this.integrationParam, this.integrationgoal.metric_key);
    this.icon = "assets/logos/" + this.integrationParam + ".png";
	this.integration = 'Integration: ' + this.providersfrontend.find(p => p.name == this.integrationParam).title;
	this.metric = 'Metric: ' + this.metricParam.title;
   }

  confirm(baseUrl, secretKeyBase) {
	this.user.updatenectarGoal(this.integrationgoal.slug, this.integrationgoal.id, this.integrationgoal.metric_key, this.integrationgoal.credential_id, this.integrationgoal.active, baseUrl, secretKeyBase);
	this.navCtrl.pop();
  }
  
  cancel(){
    this.navCtrl.pop();
   }
}
