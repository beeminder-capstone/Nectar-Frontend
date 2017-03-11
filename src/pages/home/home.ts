import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {NavController, NavParams, MenuController, ToastController} from 'ionic-angular';
import 'rxjs/add/operator/map';

import {User} from './../../providers/user';
import {GoalDetailsPage} from '../goal-details/goal-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  icons: string[];
  public goals: {};

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private user: User) {

    this.menu.swipeEnable(true);
    user.getGoals().subscribe((goals) => {
      this.goals = goals;
      for (let goal of goals) {
        goal.lastUpdated = new Date(goal.updated_at * 1000),
          goal.laneColor = this.laneColorFunc(goal.lane),
          goal.icon = goal.autodata == null ? "assets/logos/nectar.png" : "assets/logos/" + goal.autodata + ".png"
      }

    });
  }

//   presentToast() {
//   let toast = this.toastCtrl.create({
//     message: 'User was added successfully',
//     duration: 3000,
//     position: 'top'
//   });

//
//   toast.onDidDismiss(() => {
//     console.log('Dismissed toast');
//   });

//   toast.present();
// }

  itemTapped(goal) {
    console.log(goal);
    this.navCtrl.push(GoalDetailsPage, goal)
  }

  laneColorFunc(laneLevel) {
    if (laneLevel >= 2) {
      return "ontrack";
    }
    if (laneLevel == 1) {
      return "good";
    }
    else if (laneLevel == -1) {
      return "trouble";
    }
    else {
      return "offtrack";
    }
  }

}
