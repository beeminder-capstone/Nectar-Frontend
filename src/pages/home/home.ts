/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, MenuController, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';

import { GoalDetailsPage } from '../goal-details/goal-details';
import { GoalFilterPage } from '../goal-filter/goal-filter';
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
  goals: any = [];
  filtergoals: any = [];
  searchgoals: any = [];
  username: string;
  filters: Array<{title: string, name: string, isChecked: boolean}> = [
	{title: "Frontburner Goals", name: "frontburner", isChecked: true},
	{title: "Backburner Goals", name: "backburner", isChecked: true},
	{title: "Manual Goals", name: "manual", isChecked: true},
	{title: "Integration Goals", name: "integration", isChecked: true}
  ];

  constructor(public navCtrl: NavController, public menu: MenuController, public loading: LoadingController, public modalCtrl: ModalController, public storage: Storage, private sanitizer: DomSanitizer, private user: User) {
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
		  
		  this.filtergoals = this.searchgoals = this.goals;
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
  
  presentFilter() {
    this.filtergoals = this.goals;
  
    let modal = this.modalCtrl.create(GoalFilterPage, this.filters);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.filters = data;
		
		let frontburner = this.filters.find(f => f.name == "frontburner").isChecked;
		let backburner = this.filters.find(f => f.name == "backburner").isChecked;
		let manual = this.filters.find(f => f.name == "manual").isChecked;
		let integration = this.filters.find(f => f.name == "integration").isChecked;
		
		this.filtergoals = this.filtergoals.filter((item) => {
		  if(item.burner == "frontburner" && !frontburner)
		    return false;
		  else if(item.burner == "backburner" && !backburner)
		    return false;
		  else if(item.integration == null && !manual)
		    return false;
		  else if(item.integration != null && !integration)
		    return false;
			 
		  return true;
		});
		
        this.searchgoals = this.filtergoals;
      }
    });

  }
  
  getItems(ev: any) {
    this.searchgoals = this.filtergoals;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if(val && val.trim() != '') {
      this.searchgoals = this.searchgoals.filter((item) => {
        return (item.slug.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  addGoal() {
    this.navCtrl.setRoot(AddGoalPage);
  }
}
