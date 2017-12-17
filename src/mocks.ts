/* tslint:disable */
/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
// IONIC:
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

export class BeeminderApiMock {

}

export class UserMock {
  public goals = [
    { title: "Commits per day", slug: "commit" },
    { title: "Walk a mile everyday", slug: "walk" }
  ]

  getGoals() {
    return Observable.of(this.goals);
  }

}


/* tslint:enable */
