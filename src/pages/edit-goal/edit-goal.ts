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

    this.user.editGoal(goal);
    this.navcontroller.pop();
   }

   cancel(){
    this.navcontroller.pop();
   }

}