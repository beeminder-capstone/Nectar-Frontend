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
  items: Array<{ title: string, lastUpdate: Date, panic: string, goal: {} }>;
  
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private user: User) {
    this.menu.swipeEnable(true);
    user.getGoals().subscribe((goals) => {
      //this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
       // 'american-football', 'boat', 'bluetooth', 'build'];
      
      this.items = new Array();
      let counter = 0;
      for (let goal of goals) {
        this.items.push({
          title: goal.slug,
          lastUpdate: new Date(goal.updated_at * 1000),
          panic: this.panicColor(goal.panic),
          //panic_color: this.panicColor(goal.panic),
          goal: goal,
          //icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }

    });

  }

  itemTapped(event, item) {
    this.navCtrl.push(GoalDetailsPage, item.goal)
  }

  panicColor(panicLevel) {
    var track;
    if(panicLevel < 2000){
        track = 'On Track';
        //track.css("color" ,"green")
        return track;     
    }
    else if(panicLevel < 4000){
        track = 'Danger';
        return track;
    }
    else{
        track = 'Off Track';
        //track = $(box).style("color", "red")
        return track;
    }
  }

  
}
