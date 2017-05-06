/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';

import { GoalDetailsPage } from '../goal-details/goal-details';
import { AddGoalPage } from '../add-goal/add-goal';
import { User } from './../../providers/user';
import { TimerComponent } from '../timer/timer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChildren(TimerComponent) timer: QueryList<TimerComponent>;
  
  icons: string[];
  public goals: any = [];
  username: string;

  constructor(public navCtrl: NavController, public menu: MenuController, public loading: LoadingController, public storage: Storage, private sanitizer: DomSanitizer, private user: User) {
    this.menu.swipeEnable(true);
	
	this.storage.get('username').then((value) => {
		this.username = value;
	});
  }
  
  ngOnInit() {
	this.user.setnectarUser();
	
	let loader = this.loading.create({
      content: 'Loading&hellip;',
    });
	
	loader.present().then(() => {
      this.user.getUser().subscribe((auser) => {
		  this.goals = [];
		  
		  let d = new Date();
		  let t = Math.floor(d.getTime() / 1000);
		
		  for (let goal of auser.goals) {
			this.user.getGoal(goal).subscribe((agoal) => {
			  agoal.lastUpdated = new Date(agoal.updated_at * 1000);
			  agoal.integration = this.user.getIntergration(agoal);
			  agoal.icon = agoal.integration == null ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + agoal.integration + ".png";
			  agoal.color = this.sanitizer.bypassSecurityTrustStyle(agoal.roadstatuscolor);
			  
			  agoal.time = agoal.losedate - t;
			  
			  this.goals.push(agoal);
			}, err => {
			if(err){
			  console.error(err);
			}
			});
		  }
      }, err => {
		if(err){
		  console.error(err);
		  alert('An error occurred getting your Beeminder goals: ' + JSON.stringify(err) + '.');
		}
	  }, () => {
		loader.dismiss();
	  });
    });
  }

  itemTapped(goal) {
    this.navCtrl.push(GoalDetailsPage, { goal: goal });
  }

  addGoal() {
    this.navCtrl.setRoot(AddGoalPage);
  }
}
