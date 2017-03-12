import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NectarApi } from '../../providers/nectar-api';

import { SelectMetricPage } from '../select-metric/select-metric';

declare var window: any;

@Component({
  selector: 'page-connect-integration',
  templateUrl: 'connect-integration.html'
})

export class ConnectIntegrationPage {
  integrations: any[];
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
    { url: "https://stackoverflow.com/", longname: "Stack Overflow", shortname: "stackoverflow" },
    { url: "https://www.strava.com/", longname: "Strava", shortname: "strava" },
    { url: "https://trello.com", longname: "Trello", shortname: "trello" },
    { url: "https://www.tumblr.com/", longname: "Tumblr", shortname: "tumblr" },
    { url: "https://twitter.com/", longname: "Twitter", shortname: "twitter" },
    { url: "http://typeracer.com", longname: "Typeracer", shortname: "typeracer" },
    { url: "https://en.wikipedia.org/wiki/Main_Page", longname: "Wikipedia", shortname: "wikipedia" },
    { url: "https://join.worldcommunitygrid.org?recruiterId=734146", longname: "World Community Grid", shortname: "worldcommunitygrid" },
    { url: "https://www.wunderlist.com/", longname: "Wunderlist", shortname: "wunderlist" },
    { url: "https://www.youtube.com/", longname: "Youtube", shortname: "youtube" }
  ];

  constructor(public navCtrl: NavController, public nectar: NectarApi) {
    this.integrations = this.nectar.getIntergrations();
  }


  selectIntegration(integrationTitle, integrationMetrics) {

    //if user isn't logged in, open oauth page
    if (!this.nectar.isLoggedIn(integrationTitle)) {
      //open oauth page
      this.IntegrationLogin(integrationTitle);
      //once they login, continue to the metric page
    }

    this.navCtrl.push(SelectMetricPage, {
      integration: integrationTitle,
      metrics: integrationMetrics
    });
  }

  public IntegrationLogin(integrationTitle): Promise<any> {
    return new Promise(function (resolve, reject) {
      for (provider of this.providers){
        if (integrationTitle == provider.shortname) {
          let url = provider.url;
        }
      }
      let browserRef = window.cordova.InAppBrowser.open('https://beemindernectar.herokuapp.com/credentials/new?provider_name=' + url, "_self", "location=no");
      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf("http://localhost/callback") === 0) {
          browserRef.close();
          resolve(event.url);
        }
      });
    });
  }

}
