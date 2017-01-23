import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BeeminderApi } from '../providers/beeminder-api';
import { UpdateGoalComponent } from '../components/update-goal';
/*
  Generated class for the GoalDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-goal-details',
  templateUrl: 'goal-details.html'
})
export class GoalDetailsPage {

  showUpdate: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) { 
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalDetailsPage');
  }

  switchShowUpdateValue() {
    this.showUpdate = !this.showUpdate;
  }

  goal: any = {
    "slug": "weight",
    "title": "Weight Loss",
    "goaldate": 1358524800,
    "goalval": 166,
    "rate": null,
    "graph_url": "http://static.beeminder.com/alice+weight.png",
    "thumb_url": "http://static.beeminder.com/alice+weight-thumb.png",
    "goal_type": "fatloser",
    "losedate": 1358524800,
    "panic": 54000,
    "queued": false,
    "updated_at": 1337479214,
    "datapoints": [{
      "timestamp": 1325523600,
      "value": 70.45,
      "comment": "blah blah",
      "id": "4f9dd9fd86f22478d3"
    },
    {
      "timestamp": 1325610000,
      "value": 70.85,
      "comment": "blah blah",
      "id": "5f9d79fd86f33468d4"
    }]
  }


}
