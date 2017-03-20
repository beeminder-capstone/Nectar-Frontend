/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { GoalDetailsPage } from '../goal-details/goal-details';
import { AddGoalPage } from '../add-goal/add-goal';
import { User } from './../../providers/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  icons: string[];
  public goals: {};
  username: string;

  constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage, private user: User) {
    this.menu.swipeEnable(true);
	
	this.storage.get('username').then((value) => {
		this.username = value;
	});
	
    user.getGoals().subscribe((goals) => {
      this.goals = goals;
      for (let goal of goals) {
        goal.lastUpdated = new Date(goal.updated_at * 1000),
          goal.laneColor = this.laneColorFunc(goal.lane),
          goal.icon = (goal.autodata == null || goal.autodata == "manual") ? "assets/logos/nectar.png" : "assets/logos/" + goal.autodata + ".png"
      }
    });
  }

  itemTapped(goal) {
    this.navCtrl.push(GoalDetailsPage, goal);
  }

  laneColorFunc(laneLevel) {
    if (laneLevel >= 2) {
      return "ontrack";
    }
    else if (laneLevel == 1) {
      return "good";
    }
    else if (laneLevel == -1) {
      return "trouble";
    }
    else {
      return "offtrack";
    }
  }

  addGoal() {
    this.navCtrl.setRoot(AddGoalPage);
  }
}
