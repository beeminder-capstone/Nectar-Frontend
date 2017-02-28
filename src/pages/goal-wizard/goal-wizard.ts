import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { NectarApi } from '../../providers/nectar-api';

@Component({
  selector: 'page-goal-wizard',
  templateUrl: 'goal-wizard.html'
})
export class GoalWizardPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nectar: NectarApi) {}

  toMetricSlide(intergration) {
    this.slides.slideTo(1, 500);
  }
}
