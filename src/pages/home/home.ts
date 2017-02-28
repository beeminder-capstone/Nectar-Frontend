import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { User } from './../../providers/user';
import { GoalDetailsPage } from '../goal-details/goal-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  icons: string[];
  items: Array<{ lastUpdate: Date, lane: string, icon: any, goal: {} }>;
  
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private user: User) {
    this.menu.swipeEnable(true);
    user.getGoals().subscribe((goals) => {
  
      this.items = new Array();
      for (let goal of goals) {
        this.items.push({
          lastUpdate: new Date(goal.updated_at * 1000),
          lane: this.laneColor(goal.lane),
          icon: this.getIcon(goal.autodata),
          goal: goal,
        });
      }

    });

  }

  itemTapped(event, item) {
    this.navCtrl.push(GoalDetailsPage, item.goal)
  }

  laneColor(laneLevel) {
    console.log(laneLevel);
    if(laneLevel >= 2){
        return "ontrack";     
    }
    else if(laneLevel == 1){
        return "trouble";
    }
    else{
        return "offtrack";
    }
  }

/*   laneColor(laneLevel) {
    var lane;
    if(laneLevel < 2000 ){
       return "ontrack";     
    }
    else if(laneLevel < 4000 ){
        return "trouble";
    }
    else{
        return "offtrack";
    }
  }
*/
   
    getIcon(integration) {
        var iconToReturn;
        switch (integration) {
        case "beeminder":
            iconToReturn = "assets/logos/beeminder.png";
            break;
        case "bcycle":
            iconToReturn = "assets/logos/bcycle.png";
            break;
        case "bitbucket":
            iconToReturn = "assets/logos/bitbucket.png";
            break;
        case "blogger":
            iconToReturn = "assets/logos/blogger.png";
            break;
        case "dropbox":
            iconToReturn = "assets/logos/dropbox.png";
            break;
        case "evernote":
            iconToReturn = "assets/logos/evernote.png";
            break;
        case "facebook":
            iconToReturn = "assets/logos/facebook.png";
            break;
        case "fitbit":
            iconToReturn = "assets/logos/fitbit.png";
            break;
        case "flickr":
            iconToReturn = "assets/logos/flickr.png";
            break;
        case "github":
            iconToReturn = "assets/logos/github.png";
            break;
        case "gmail":
            iconToReturn = "assets/logos/gmail.png";
            break;
        case "googlecalendar":
            iconToReturn = "assets/logos/googlecalendar.png";
            break;
        case "googledrive":
            iconToReturn = "assets/logos/googledrive.png";
            break;
        case "googlefit":
            iconToReturn = "assets/logos/googlefit.png";
            break;
        case "googleplus":
            iconToReturn = "assets/logos/googleplus.png";
            break;
        case "googletasks":
            iconToReturn = "assets/logos/googletasks.png";
            break;
        case "instagram":
            iconToReturn = "assets/logos/instagram.png";
            break;
        case "khanacademy":
            iconToReturn = "assets/logos/khanacademy.png";
            break;
        case "linkedin":
            iconToReturn = "assets/logos/linkedin.png";
            break;
        case "microsoftoffice365":
            iconToReturn = "assets/logos/microsoftoffice365.png";
            break;
        case "moves":
            iconToReturn = "assets/logos/moves.png";
            break;
        case "pocket":
            iconToReturn = "assets/logos/pocket.png";
            break;
        case "quizlet":
            iconToReturn = "assets/logos/quizlet.png";
            break;
        case "rememberthemilk":
            iconToReturn = "assets/logos/rememberthemilk.png";
            break;
        case "runkeeper":
            iconToReturn = "assets/logos/runkeeper.png";
            break;
        case "slack":
            iconToReturn = "assets/logos/slack.png";
            break;
        case "strava":
            iconToReturn = "assets/logos/strava.png";
            break;
        case "trello":
            iconToReturn = "assets/logos/trello.png";
            break;
        case "tumblr":
            iconToReturn = "assets/logos/tumblr.png";
            break;
        case "twitter":
            iconToReturn = "assets/logos/twitter.png";
            break;
        case "typeracer":
            iconToReturn = "assets/logos/typeracer.png";
            break;
        case "wunderlist":
            iconToReturn = "assets/logos/wunderlist.png";
            break;
        case "youtube":
            iconToReturn = "assets/logos/youtube.png";
            break;
        default:
            iconToReturn = "assets/logos/beeminder.png";
        }
        return iconToReturn;
    }
}
