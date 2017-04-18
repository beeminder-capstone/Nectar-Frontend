/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

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
	public goals: {};
	goal: any;
	integrationgoal: any;

	constructor(public navCtrl: NavController, public storage: Storage, private params: NavParams, public user: User, @Inject(EnvVariables) public envVariables) {
	user.getUser().subscribe((auser) => {
      this.goals = auser.goals;
    }, err => {
		if(err){
		  console.error(err);
		}
	});
  }
  
  ngOnInit() {
    this.goal = this.params.data.goal;
    this.integration = this.params.data.integration;
    this.metric = this.params.data.metric;
	this.integrationgoal = this.user.getIntergrationGoal(this.goal);
   }

  confirm(baseUrl, secretKeyBase) {
	this.user.updatenectarGoal(this.integrationgoal.slug, this.integrationgoal.id, this.integrationgoal.metric_key, this.integrationgoal.credential_id, this.integrationgoal.active, baseUrl, secretKeyBase);
	this.navCtrl.pop();
  }
  
  cancel(){
    this.navCtrl.pop();
   }
}
