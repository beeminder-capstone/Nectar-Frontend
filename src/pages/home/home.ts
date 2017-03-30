/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';

import { GoalDetailsPage } from '../goal-details/goal-details';
import { AddGoalPage } from '../add-goal/add-goal';
import { User } from './../../providers/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  icons: string[];
  public goals = [];
  username: string;

  constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage, private sanitizer: DomSanitizer, private user: User) {
    this.menu.swipeEnable(true);
	
	this.storage.get('username').then((value) => {
		this.username = value;
	});
	
    user.getUser().subscribe((auser) => {
      for (let goal of auser.goals) {
	    user.getGoal(goal).subscribe((agoal) => {
          agoal.lastUpdated = new Date(agoal.updated_at * 1000),
		  agoal.integration = user.getIntergration(agoal),
          agoal.icon = agoal.integration == null ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + agoal.integration + ".png",
          agoal.color = sanitizer.bypassSecurityTrustStyle(agoal.roadstatuscolor)
		  
		  this.goals.push(agoal);
		});
      }
    });
  }

  itemTapped(goal) {
    this.navCtrl.push(GoalDetailsPage, { goal: goal });
  }

  addGoal() {
    this.navCtrl.setRoot(AddGoalPage);
  }
}
