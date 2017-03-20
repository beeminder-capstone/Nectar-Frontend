/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { PopoverPage } from './popover'
import { User } from '../../providers/user';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})

export class GoalDetailsPage {

  goal = {};
  datapoint: any;
  showUpdateComponent: boolean = false;
  datapoints = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private user: User,
    private popoverCtrl: PopoverController
  ) {}

  ionViewDidLoad() {
    this.goal = this.navParams.data;
    this.user.getDatapoints(this.goal).subscribe((data) => {
      this.datapoints = data;
    });
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage, this.goal);
    popover.present({ ev: event });
  }

  addDataPoint(){
    //create timestamp for goal
    let decade = 60 * 60 * 24 * 365 * 10;
		let d = new Date();
		let t = Math.floor(d.getTime() / 1000);

		let goaldate = t + decade;

    let datapoint = {
      timestamp: goaldate,
      value: this.datapoint.value,
    }

    this.user.addDataPoint(this.goal, datapoint);
  }
}
