/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

import { EditGoalPage } from '../edit-goal/edit-goal';
import { EditIntegrationPage } from '../edit-integration/edit-integration';

@Component({
    template: `
    <ion-list> 
      <button ion-item (click)="editbeeminderTapped($event)">Edit Beeminder Goal</button> 
	  <div *ngIf="goal.integration != null">
      <button ion-item (click)="editIntegrationTapped($event)">Edit Integration</button> 
	  </div>
    </ion-list> 
  `
})
export class PopoverPage {
	goal: any;
	integration: string;
    metric: string;
    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public navCtrl: NavController,
    ) { }

    ngOnInit() {
        this.goal = this.navParams.data.goal;
        this.integration = this.navParams.data.integration;
        this.metric = this.navParams.data.metric;
    }

    editbeeminderTapped(event) {
		this.navCtrl.push(EditGoalPage, { goal: this.goal });
    }
	
	editIntegrationTapped(event) {
		this.navCtrl.push(EditIntegrationPage, { goal: this.goal, integration: this.integration, metric: this.metric });
    }

    close() {
        this.viewCtrl.dismiss();
    }
}