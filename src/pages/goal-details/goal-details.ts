import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import { User } from '../../providers/user';
import { EditGoalPage } from '../edit-goal/edit-goal';

@Component({
  template: `
    <ion-list>
      <button ion-button (click)="editSettingsTapped($event)">Edit Settings</button>
    </ion-list>
  `
})

export class PopoverPage {
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public goal:{}) {}

  close() {
    this.viewCtrl.dismiss();
  }
  editSettingsTapped(event) {
    this.navCtrl.push(EditGoalPage, this.goal);
  }
}


@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})

export class GoalDetailsPage {
  goal={};
  itemGoal: {lastUpdate: Date, name: string, lane: string, icon: any};
  showUpdateComponent: boolean = false;
  datapoints = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: User, private popoverCtrl: PopoverController) {


  }

  ionViewDidLoad() {
    this.goal = this.navParams.data;
    this.user.getDatapoints(this.goal).subscribe((data) =>{
      this.datapoints = data;
    });
  }

  editSettingsTapped(event) {
    this.navCtrl.push(EditGoalPage, this.goal);
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage,this.goal);
    popover.present({
      ev: ev
    });
  }
}
