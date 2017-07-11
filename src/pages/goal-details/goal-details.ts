/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, ModalController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { PopoverPage } from './popover'
import { SocialSharing } from '@ionic-native/social-sharing';
import { User } from '../../providers/user';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import { TimerComponent } from '../timer/timer';
import { StopwatchPage } from '../stopwatch/stopwatch';
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
  description: string;
  metrictitle: any;
  link: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
	public storage: Storage,
	private socialSharing: SocialSharing,
    private user: User,
    private popoverCtrl: PopoverController,
	public modalCtrl: ModalController,
	public actionSheetCtrl: ActionSheetController,
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
	this.metrictitle = this.integrationgoal == null ? null : this.user.getMetric(this.goal.integration, this.integrationgoal.metric_key);
	this.metric = this.integrationgoal == null ? null : 'Metric: ' + this.metrictitle.title;
	this.description = this.integrationgoal == null ? null : 'Description: ' + this.metrictitle.description;
	
	this.link = this.user.redirect();
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage, { goal: this.goal, integration: this.integration, metric: this.metrictitle });
    popover.present({ ev: event });
  }
  
  reload() {
    this.user.getGoal(this.goal.slug).subscribe((data) => {
      this.goal = data;
	  
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
	
	this.user.refreshGoal(this.goal.slug, this.reload.bind(this));
  }

  addDatapointPrompt() {
	let actionSheet = this.actionSheetCtrl.create({
     title: 'Add Datapoint',
     buttons: [
       {
         text: 'Direct',
         handler: () => {
           this.user.addDatapointPrompt(this.goal, this.reload.bind(this));
         }
       },
	   {
         text: 'Timer',
         handler: () => {
			let modal = this.modalCtrl.create(StopwatchPage, this.goal);
			modal.present();

			modal.onWillDismiss((data: any) => {
			  if (data) {
				this.reload();
			  }
			});
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           //console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
  }
  
  editDatapointPrompt(datapoint: any) {
	this.user.editDatapointPrompt(this.goal, datapoint, this.reload.bind(this));
  }
  
  share() {
    let link = 'https://www.beeminder.com/' + this.username + '/' + this.goal.slug;
  
    this.socialSharing.share('Beeminder Goal ' + this.goal.slug, this.goal.slug, null, link).then(() => {
	  this.user.presentToast('The Beeminder goal ' + this.goal.slug + ' was successfully shared.');
	}).catch(() => {
	  alert('An error occurred sharing Beeminder goal ' + this.goal.slug + '.');
	});
  }

}
