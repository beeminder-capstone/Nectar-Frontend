import { Component, Input } from '@angular/core';
import { ViewController, NavController, App, ModalController, NavParams } from 'ionic-angular';

import { EditGoalPage } from '../edit-goal/edit-goal';

@Component({
    template: `
    <ion-list> 
      <button ion-item (click)="editSettingsTapped($event)">Edit Settings</button> 
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

    onNgInit() {
        this.goal = this.navParams.data;
    }

    editSettingsTapped(event) {
        this.navCtrl.push(EditGoalPage, this.goal);
    }

    close(url: string) {
        this.viewCtrl.dismiss();
    }
}