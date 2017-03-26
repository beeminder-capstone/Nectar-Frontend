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
    goal: any

   constructor( 
       public user: User,
       public navParams: NavParams,
       public navcontroller: NavController
   ){}

   ngOnInit() {
       this.goal = this.navParams.data;
   }

   confirm(){
    console.log(this.goal)

    let goal = {
        slug: this.goal.slug,
		title: this.goal.title,
		gunit: this.goal.runits, //There isn't a gunit variable?
		goalval: this.goal.goalval,
    }

    this.user.editbeeminderGoal(goal);
    this.navcontroller.pop();
   }

   cancel(){
    this.navcontroller.pop();
   }

}