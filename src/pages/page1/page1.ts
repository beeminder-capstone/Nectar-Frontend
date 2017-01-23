import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ItemDetailsPage } from '../item-details/item-details';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  username: string;
  access_token: string;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
	
	this.storage.get('username').then((value) => {
		this.username = value;
	});
	
	this.storage.get('access_token').then((value) => {
		this.access_token = value;
		
		this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
		'american-football', 'boat', 'bluetooth', 'build'];

		this.items = [];

		var url = "https://www.beeminder.com/api/v1/users/me.json?access_token=" + this.access_token;
		
	this.http.get(url).map(res => res.json()).subscribe(data => {
for (var i = 0; i < data.goals.length; i++) {
this.items.push({
title: data.goals[i],
note: 'This is Goal #' + i,
icon: this.icons[Math.floor(Math.random() * this.icons.length)]
});
}
});
	});
	
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
