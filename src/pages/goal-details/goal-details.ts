import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})

export class GoalDetailsPage {
  goal = {};
  showUpdateComponent: boolean = false;
  datapoints: Array<{timestamp: string, updated: string, value: string, datapoint: {} }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: User) {
    user.getDatapoints(this.goal).subscribe((data) =>{
      this.datapoints = [];
      for (let datapoint of data){
        this.datapoints.push({
          timestamp: datapoint.timestamp,
          updated: datapoint.updated,
          value: datapoint.value,
          datapoint: datapoint
        });
      }
    });

  }

  ionViewDidLoad() {
    this.goal = this.navParams.data;
    console.log(this.goal);
  }

}
