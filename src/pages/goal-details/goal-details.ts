/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  username: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
	public storage: Storage,
    private user: User,
    private popoverCtrl: PopoverController
  ) {
	this.storage.get('username').then((value) => {
		this.username = value;
	});
  }

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
