import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
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
  items: Array<{ title: string, note: string, icon: string, goal: {} }>;

  constructor(public http: Http, public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, public menu: MenuController, private user: User) {
    this.menu.swipeEnable(true);
    user.getGoals().subscribe((goals) => {
      this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
        'american-football', 'boat', 'bluetooth', 'build'];
      
      this.items = new Array();
      let counter = 0;
      for (let goal of goals) {
        this.items.push({
          title: goal.slug,
          note: 'This is Goal #' + counter++,
          goal: goal,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }

    });

  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'User was added successfully',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  itemTapped(event, item) {
    this.navCtrl.push(GoalDetailsPage, item.goal)
  }
}
