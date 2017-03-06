import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { User } from './../../providers/user';
import { GoalDetailsPage } from '../goal-details/goal-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  icons: string[];
  items: Array<{ lastUpdate: Date, name: string, lane: string, icon: any, goal: {} }>;
  
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private user: User) {
    this.menu.swipeEnable(true);
    user.getGoals().subscribe((goals) => {
  
      this.items = new Array();
      for (let goal of goals) {
        this.items.push({
          name: goal.slug,
          lastUpdate: new Date(goal.updated_at * 1000),
          lane: this.laneColor(goal.lane),
          icon: goal.autodata==null? "assets/logos/beeminder.png" : "assets/logos/" + goal.autodata + ".png",
          goal: goal,
        });
      }

    });

  }

  itemTapped(event, item) {
    this.navCtrl.push(GoalDetailsPage, item)
  }

  laneColor(laneLevel) {
    if(laneLevel >= 2){
        return "ontrack";     
    }
    if(laneLevel == 1){
        return "good";
    }
    else if(laneLevel == -1){
        return "trouble";
    }
    else{
        return "offtrack";
    }
  }

}
