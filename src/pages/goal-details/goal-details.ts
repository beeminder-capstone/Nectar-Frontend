import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})
export class GoalDetailsPage {
  goal = {};
  showUpdateComponent: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.goal = this.navParams.data;
    console.log(this.goal);
  }

}
