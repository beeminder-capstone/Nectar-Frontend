/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PopoverPage } from './popover'
import { User } from '../../providers/user';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})

export class GoalDetailsPage {

  goal = {};
  datapointValue;
  showUpdateComponent: boolean = false;
  datapoints = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private user: User,
    private popoverCtrl: PopoverController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.goal = this.navParams.data;
    console.log(this.goal);
    this.user.getDatapoints(this.goal).subscribe((data) => {
      this.datapoints = data;
    });
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage, this.goal);
    popover.present({ ev: event });
  }

  addDataPoint(datapointVal:number){
    //create timestamp for goal
		let d = new Date();
		let goaldate = Math.floor(d.getTime() / 1000);

    let datapoint = {
      timestamp: goaldate,
      value: datapointVal,
    };

    this.user.addDataPoint(this.goal, datapoint).subscribe(newDataPoint => {
      this.datapoints.push(newDataPoint);
    });

  }


  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add Datapoint',
      message: "Enter the value of the new datapoint",
      inputs: [
        {
          name: 'datapointValue',
          placeholder: 'Value (e.g. 1 or 5)'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add Datapoint',
          handler: data => {
            console.log(data);
            this.addDataPoint(data.datapointValue);
          }
        }
      ]
    });
    prompt.present();
  }



}
