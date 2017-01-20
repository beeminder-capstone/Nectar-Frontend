import { Component } from '@angular/core';

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
