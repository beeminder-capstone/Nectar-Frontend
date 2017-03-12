import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';

import { EditGoalPage } from '../edit-goal/edit-goal';
import { PopoverPage } from './popover'
import { User } from '../../providers/user';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})

export class GoalDetailsPage {

  goal = {};
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
}
