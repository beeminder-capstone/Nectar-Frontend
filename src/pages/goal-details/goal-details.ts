/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { PopoverPage } from './popover'
import { User } from '../../providers/user';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import { TimerComponent } from '../timer/timer';
import { NetworkService } from '../../providers/network-service';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})

export class GoalDetailsPage {

  @ViewChild(TimerComponent) timer: TimerComponent;

  goal: any;
  integrationgoal: any;
  username: string;
  integration: string;
  metric: string;
  metrictitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
	public storage: Storage,
    private user: User,
    private popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
	@Inject(EnvVariables) public envVariables,
	private sanitizer: DomSanitizer,
	private networkService: NetworkService
  ) {
	this.storage.get('username').then((value) => {
		this.username = value;
	});
  }

  ngOnInit() {
    this.goal = this.navParams.data.goal;
	this.integrationgoal = this.user.getIntergrationGoal(this.goal);
	
	this.integration = this.integrationgoal == null ? "Manual Goal" : 'Integration: ' + this.user.getProvider(this.goal.integration).title;
	this.metrictitle = this.integrationgoal == null ? null : this.user.getMetric(this.goal.integration, this.integrationgoal.metric_key).title;
	this.metric = this.integrationgoal == null ? null : 'Metric: ' + this.metrictitle;
	
	let d = new Date();
    let t = Math.floor(d.getTime() / 1000);
	this.goal.time = this.goal.losedate - t;
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage, { goal: this.goal, integration: this.integration, metric: this.metric });
    popover.present({ ev: event });
  }

  addDataPoint(value:number, comment:string){
    //create timestamp for goal
		let d = new Date();
		let goaldate = Math.floor(d.getTime() / 1000);

	let datapoint = {
      timestamp: goaldate,
      value: value,
	  comment: comment
    };

    this.user.addDataPoint(this.goal, datapoint);
	
	this.user.getGoal(this.goal.slug).subscribe((data) => {
      this.goal = data;
	  
	  this.goal.lastUpdated = new Date(this.goal.updated_at * 1000);
	  this.goal.integration = this.user.getIntergration(this.goal);
      this.goal.icon = this.goal.integration == null ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + this.goal.integration + ".png";
	  this.goal.color = this.sanitizer.bypassSecurityTrustStyle(this.goal.roadstatuscolor);
    }, err => {
		if(err){
		  console.error(err);
		}
	});

  }
  
  editDataPoint(id:string, value:number, comment:string){
	let datapoint = {
      value: value,
	  comment: comment
    };

    this.user.editDataPoint(this.goal, id, datapoint);
	
	this.user.getGoal(this.goal.slug).subscribe((data) => {
      this.goal = data;
	  
	  this.goal.lastUpdated = new Date(this.goal.updated_at * 1000);
	  this.goal.integration = this.user.getIntergration(this.goal);
      this.goal.icon = this.goal.integration == null ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + this.goal.integration + ".png";
	  this.goal.color = this.sanitizer.bypassSecurityTrustStyle(this.goal.roadstatuscolor);
    }, err => {
		if(err){
		  console.error(err);
		}
	});

  }
  
  refresh() {
	if(this.networkService.noConnection())
      this.networkService.showNetworkAlert();
	
	this.user.refreshGoal(this.goal.slug);
	
	this.user.getGoal(this.goal.slug).subscribe((data) => {
      this.goal = data;
	  
	  this.goal.lastUpdated = new Date(this.goal.updated_at * 1000);
	  this.goal.integration = this.user.getIntergration(this.goal);
      this.goal.icon = this.goal.integration == null ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + this.goal.integration + ".png";
	  this.goal.color = this.sanitizer.bypassSecurityTrustStyle(this.goal.roadstatuscolor);
    }, err => {
		if(err){
		  console.error(err);
		}
	});
  }

  addDatapointPrompt() {
	let prompt = this.alertCtrl.create({
      title: 'Add Datapoint',
      message: "Please enter the value of the datapoint:",
      inputs: [
        {
          type: 'number',
		  name: 'value',
          placeholder: 'Value (e.g. 1 or 5)'
        },
		{
          type: 'text',
		  name: 'comment',
		  placeholder: 'Comment'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
		  role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Add Datapoint',
          handler: data => {
            //console.log(data);
            this.addDataPoint(data.value, data.comment);
          }
        }
      ]
    });
    prompt.present();
	
	if(this.networkService.noConnection())
      this.networkService.showNetworkAlert();
  }
  
  editDatapointPrompt(datapoint) {
	let prompt = this.alertCtrl.create({
      title: 'Update Datapoint',
      message: "Please enter the new value of the datapoint:",
      inputs: [
        {
          type: 'number',
		  name: 'value',
		  placeholder: 'Value (e.g. 1 or 5)',
		  value: datapoint.value
        },
		{
          type: 'text',
		  name: 'comment',
		  placeholder: 'Comment',
		  value: datapoint.comment
        }
      ],
      buttons: [
        {
          text: 'Cancel',
		  role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            //console.log(data);
            this.editDataPoint(datapoint.id, data.value, data.comment);
          }
        }
      ]
    });
    prompt.present();
	
	if(this.networkService.noConnection())
      this.networkService.showNetworkAlert();
  }

}
