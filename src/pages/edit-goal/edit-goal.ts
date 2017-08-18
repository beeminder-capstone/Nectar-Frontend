/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


import { User } from '../../providers/user';

@Component({
	selector: 'page-edit-goal',
	templateUrl: 'edit-goal.html'
})

export class EditGoalPage {
    goal: any;
	oldslug: string;

   constructor( 
       public user: User,
       public navParams: NavParams,
       public navcontroller: NavController
   ){}

   ngOnInit() {
       this.goal = this.navParams.data.goal;
	   this.oldslug = this.goal.slug;
   }

   confirm(){
    let beemindergoal = {
        slug: this.goal.slug,
		title: this.goal.title,
		secret: this.goal.secret
    };

    this.user.editbeeminderGoal(beemindergoal, this.oldslug);
    this.navcontroller.pop();
   }

   cancel(){
    this.navcontroller.pop();
   }

}