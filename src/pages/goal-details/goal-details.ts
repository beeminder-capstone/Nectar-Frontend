import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BeeminderApi } from '../providers/beeminder-api';

import { UpdateGoalComponent } from '../components/update-goal';

@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})
export class GoalDetailsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController) { 
    
  }

  goal: any;
  showUpdate: boolean = false;

  ionViewDidLoad() {
    this.navParams.data = this.goal;
  }

  switchShowUpdateValue() {
    this.showUpdate = !this.showUpdate;
  }

  updateGoalValues() {
    this.modalController.create('update-goal');
  }




}
