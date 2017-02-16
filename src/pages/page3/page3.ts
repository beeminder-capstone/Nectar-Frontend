import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

@Component({
	selector: 'page-page3',
	templateUrl: 'page3.html'
})
export class Page3 {
	access_token: string;

	constructor(public navCtrl: NavController, public storage: Storage, public user: User) {}

	onSubmit(formData) {
		let decade = 60 * 60 * 24 * 365 * 10;
		let d = new Date();
		let t = Math.floor(d.getTime() / 1000);

		var goaldate = t + decade;

		let goal = {
			slug: formData.slug,
			title: formData.goaltitle,
			goal_type: formData.type,
			goaldate: goaldate,			
			rate: formData.rate,
			gunit: formData.gunits,
			runit: formData.runits,
		}
		this.user.addGoal(goal);
	}

}
