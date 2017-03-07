import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';

import { EditGoalPage } from '../edit-goal/edit-goal';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})

export class GoalDetailsPage {
  goal = {};
  datapoint: any;
  showUpdateComponent: boolean = false;
  datapoints = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: User) {


  }

  ngOnInit() {
    this.goal = this.navParams.data;
    this.datapoint = [];
    console.log(this.goal);
    this.user.getDatapoints(this.goal).subscribe((data) =>{
      this.datapoints = data;
    });
  }

  editSettingsTapped(event) {
    this.navCtrl.push(EditGoalPage, this.goal);
  }

  //datapoints have a timestamp, daystamp, value, comment, and requestid
  addDataPoint(goal){
    //create timestamp for goal
    let decade = 60 * 60 * 24 * 365 * 10;
		let d = new Date();
		let t = Math.floor(d.getTime() / 1000);

		var goaldate = t + decade;

    let datapoint = {
      timestamp: goaldate,
      value: this.datapoint.value,
      comment: this.datapoint.comment,
    }

    this.user.addDataPoint(goal, datapoint);
  }
}
