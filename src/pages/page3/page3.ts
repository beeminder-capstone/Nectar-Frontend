import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  access_token: string;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get('access_token').then((value) => {
		this.access_token = value;
	});
  }
  
  onSubmit(formData) {
	var xhrRequest = function (url, type, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
	callback(this.responseText);
	};
	xhr.open(type, url);
	xhr.send();
	};

	var decade = 60 * 60 * 24 * 365 * 10;

	var d = new Date();
	var t = Math.floor(d.getTime() / 1000);

	var goaldate = t + decade;

	var url = "https://www.beeminder.com/api/v1/users/me/goals.json?access_token=" + this.access_token + "&slug=" + formData.slug + "&title=" + formData.title + "&goal_type=" + formData.type + "&goaldate=" + goaldate + "&goalval=null&rate=" + formData.rate;
	
	xhrRequest(url, 'POST', function(responseText) {
		var json = JSON.parse(responseText);
		
		var errors = json.errors;
	  
		if(errors)
			alert('An error occured creating goal ' + formData.slug + ': ' + errors.message + '.');
		else
			alert('The goal ' + formData.slug + ' was successfully created.');
	});
  }

}
