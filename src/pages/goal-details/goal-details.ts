/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverPage } from './popover'
import { User } from '../../providers/user';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})

export class GoalDetailsPage {

  goal: any;
  datapointValue;
  showUpdateComponent: boolean = false;
  username: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
	public storage: Storage,
    private user: User,
    private popoverCtrl: PopoverController,
    public alertCtrl: AlertController
  ) {
	this.storage.get('username').then((value) => {
		this.username = value;
	});
  }

  ngOnInit() {
    this.goal = this.navParams.data.goal;
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage, { goal: this.goal });
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

    this.user.addDataPoint(this.goal, datapoint);
	
	this.user.getGoal(this.goal.slug).subscribe((data) => {
      this.goal = data;
	  
	  this.goal.lastUpdated = new Date(this.goal.updated_at * 1000),
      this.goal.laneColor = this.laneColorFunc(this.goal.lane),
	  this.goal.integration = this.user.getIntergration(this.goal),
      this.goal.icon = this.goal.integration == null ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + this.goal.integration + ".png"
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

  laneColorFunc(laneLevel) {
    if (laneLevel >= 2) {
      return "ontrack";
    }
    else if (laneLevel == 1) {
      return "good";
    }
    else if (laneLevel == -1) {
      return "trouble";
    }
    else {
      return "offtrack";
    }
  }

}
