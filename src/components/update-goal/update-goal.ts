import { Component } from '@angular/core';
/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
/*
  Generated class for the UpdateGoal component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'update-goal',
  templateUrl: 'update-goal.html'
})
export class UpdateGoalComponent {

  text: string;

  constructor() {
    console.log('Hello UpdateGoal Component');
    this.text = 'Hello World';
  }

}
