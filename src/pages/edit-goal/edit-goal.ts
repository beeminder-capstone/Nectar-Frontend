import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../providers/user';

@Component({
	selector: 'page-edit-goal',
	templateUrl: 'edit-goal.html'
})

export class EditGoalPage {
    public goal: any;

   constructor( 
       public storage: Storage,
       public user: User,
       public navParams: NavParams,
       public navcontroller: NavController
   ){}

   ionViewDidEnter() {
       this.goal = this.navParams.data;
       console.log(this.goal);
   }

   confirm(formData){
    console.log(formData)

    let goal = {
        slug: formData.slug,
		title: formData.goaltitle,
		gunit: formData.gunits,
		goalval: formData.goalval,
    }

    this.user.editGoal(goal);
   }

   cancel(){
    this.navcontroller.pop();
   }

}