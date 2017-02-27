import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

@Component({
	selector: 'page-add-goal',
	templateUrl: 'goal-details-form.html'
})
export class GoalDetailsFormPage {
	access_token: string;

	constructor(public navCtrl: NavController, public storage: Storage, public user: User) {}

}
