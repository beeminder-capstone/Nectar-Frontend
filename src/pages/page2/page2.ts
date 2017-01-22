import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var window: any;


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})

export class Page2 {
  posts: any;
 
  constructor(public http: Http) {
 
    this.posts = null;
 
this.http.get('https://www.reddit.com/r/gifs/top/.json?limit=2&sort=hot').map(res => res.json()).subscribe(data => {
    this.posts = data.data.children;
    console.log(this.posts);
});
    
 
  }

}
