import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

declare var window: any;

@Component({
	selector: 'page-integrations',
	templateUrl: 'integrations.html'
})
export class IntegrationsPage {
	providers: Array<{ url: string, longname: string, shortname: string }> = [
		{ url: "https://www.beeminder.com", longname: "Beeminder", shortname: "beeminder" },
		{ url: "https://austin.bcycle.com", longname: "Austin Bcycle", shortname: "bcycle" },
		{ url: "https://bitbucket.org/", longname: "Bitbucket", shortname: "bitbucket" },
		{ url: "https://www.blogger.com", longname: "Blogger", shortname: "blogger" },
		{ url: "https://www.dropbox.com/", longname: "Dropbox", shortname: "dropbox_oauth2" },
		{ url: "https://evernote.com/", longname: "Evernote", shortname: "evernote" },
		{ url: "https://www.facebook.com/", longname: "Facebook", shortname: "facebook" },
		{ url: "https://www.fitbit.com/", longname: "Fitbit", shortname: "fitbit" },
		{ url: "https://www.flickr.com/", longname: "Flickr", shortname: "flickr" },
		{ url: "https://github.com/", longname: "GitHub", shortname: "github" },
		{ url: "https://www.google.com/gmail", longname: "Gmail", shortname: "gmail" },
		{ url: "https://www.google.com/calendar", longname: "Google Calendar", shortname: "googlecalendar" },
		{ url: "https://www.google.com/drive/", longname: "Google Drive", shortname: "googledrive" },
		{ url: "https://www.google.com/fit/", longname: "Google Fit", shortname: "googlefit" },
		{ url: "https://plus.google.com", longname: "Google+", shortname: "googleplus" },
		{ url: "https://mail.google.com/tasks", longname: "Google Tasks", shortname: "googletasks" },
		{ url: "https://www.instagram.com/", longname: "Instagram", shortname: "instagram" },
		{ url: "https://www.khanacademy.org/", longname: "KhanAcademy", shortname: "khan_academy" },
		{ url: "https://www.linkedin.com/", longname: "LinkedIn", shortname: "linkedin" },
		{ url: "https://products.office.com/en-US/", longname: "Microsoft Office365", shortname: "microsoft_office365" },
		{ url: "https://moves-app.com/", longname: "Moves", shortname: "moves" },
		{ url: "https://getpocket.com", longname: "Pocket", shortname: "pocket" },
		{ url: "https://quizlet.com", longname: "Quizlet", shortname: "quizlet" },
		{ url: "https://www.rememberthemilk.com/", longname: "Remember The Milk", shortname: "rememberthemilk" },
		{ url: "https://runkeeper.com/", longname: "RunKeeper", shortname: "runkeeper" },
		{ url: "https://slack.com/", longname: "Slack", shortname: "slack" },
		{ url: "https://www.strava.com/", longname: "Strava", shortname: "strava" },
		{ url: "https://trello.com", longname: "Trello", shortname: "trello" },
		{ url: "https://www.tumblr.com/", longname: "Tumblr", shortname: "tumblr" },
		{ url: "https://twitter.com/", longname: "Twitter", shortname: "twitter" },
		{ url: "http://typeracer.com", longname: "Typeracer", shortname: "typeracer" },
		{ url: "https://www.wunderlist.com/", longname: "Wunderlist", shortname: "wunderlist" },
		{ url: "https://www.youtube.com/", longname: "Youtube", shortname: "youtube" }
	];

	constructor(public navCtrl: NavController, public storage: Storage) {}

	public open(url) {
		window.cordova.InAppBrowser.open('https://beemindernectar.herokuapp.com/credentials/new?provider_name=' + url, "_self", "location=no");
	}

}
