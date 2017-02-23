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
  datapoints = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: User) {


  }

ionViewDidLoad() {
    this.goal = this.navParams.data;
    console.log(this.goal);
    this.user.getDatapoints(this.goal).subscribe((data) =>{
      this.datapoints = data;
    });
  }
}
