/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
	selector: 'page-goal-filter',
	templateUrl: 'goal-filter.html'
})
export class GoalFilterPage {
	filters: Array<{ name: string, isChecked: boolean }> = [];

	constructor(
		public navParams: NavParams,
		public viewCtrl: ViewController
	) {
		this.filters = this.navParams.data;
	}

	resetFilters() {
		// reset all of the toggles to be checked
		this.filters.forEach(track => {
			track.isChecked = true;
		});
	}

	applyFilters() {
		this.dismiss(this.filters);
	}

	dismiss(data?: any) {
		// using the injected ViewController this page
		// can "dismiss" itself and pass back data
		this.viewCtrl.dismiss(data);
	}
}

