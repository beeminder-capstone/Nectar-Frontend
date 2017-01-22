import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ItemDetailsPage } from '../item-details/item-details';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
	
	this.storage.get('username').then((value) => {
		this.username = value;
	});
	
	this.storage.get('access_token').then((value) => {
		this.access_token = value;
		
		var xhrRequest = function (url, type, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
		callback(this.responseText);
		};
		xhr.open(type, url);
		xhr.send();
		};
		
		this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
		'american-football', 'boat', 'bluetooth', 'build'];

		this.items = [];

		var url = "https://www.beeminder.com/api/v1/users/me.json?access_token=" + this.access_token;
		
		xhrRequest(url, 'GET', 
		function(responseText) {
		  var json = JSON.parse(responseText);
		  
		  var errors = json.errors;
		  
		  if(errors)
			alert('An error occured getting goals: ' + errors.message + '.');
		  else
			for (var i = 0; i < json.goals.length; i++) {
			  this.items.push({
				title: json.goals[i],
				note: 'This is Goal #' + i,
				icon: this.icons[Math.floor(Math.random() * this.icons.length)]
			  });
			}
		}
		);
	});
	
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
