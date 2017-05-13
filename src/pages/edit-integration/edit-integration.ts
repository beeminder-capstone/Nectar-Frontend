/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Component({
	selector: 'edit-integration',
	templateUrl: 'edit-integration.html'
})
export class EditIntegrationPage {
	integration: string;
	metric: string;
	public goals: any = [];
	goal: any;
	oldslug: string;
	integrationgoal: any;

	constructor(public navCtrl: NavController, public loading: LoadingController, public storage: Storage, private params: NavParams, public user: User, @Inject(EnvVariables) public envVariables) {
	let loader = this.loading.create({
      content: 'Loading&hellip;',
    });
	
	loader.present().then(() => {
	  user.getUser().subscribe((auser) => {
        this.goals = auser.goals;
      }, err => {
		if(err){
		  console.error(err);
		}
	  }, () => {
		loader.dismiss();
	  });
	});
  }
  
  ngOnInit() {
    this.goal = this.params.data.goal;
	this.oldslug = this.goal.slug;
    this.integration = this.params.data.integration;
    this.metric = this.params.data.metric;
	this.integrationgoal = this.user.getIntergrationGoal(this.goal);
   }

  confirm(baseUrl, secretKeyBase) {
	this.user.updatenectarGoal(this.integrationgoal.slug, this.oldslug, this.integrationgoal.id, this.integrationgoal.metric_key, this.integrationgoal.credential_id, this.integrationgoal.active, baseUrl, secretKeyBase);
	this.navCtrl.pop();
  }
  
  cancel(){
    this.navCtrl.pop();
   }
}
