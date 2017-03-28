/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

import { EditGoalPage } from '../edit-goal/edit-goal';

@Component({
    template: `
    <ion-list> 
      <button ion-item (click)="editSettingsTapped($event)">Edit Beeminder Goal</button> 
    </ion-list> 
  `
})
export class PopoverPage {
    goal: any;
    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public navCtrl: NavController,
    ) { }

    ngOnInit() {
        this.goal = this.navParams.data.goal;
    }

    editSettingsTapped(event) {
		this.navCtrl.push(EditGoalPage, { goal: this.goal });
    }

    close() {
        this.viewCtrl.dismiss();
    }
}