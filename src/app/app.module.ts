/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { EnvironmentsModule } from './environment-variables/environment-variables.module.ts';

import { HomePage } from '../pages/home/home';
import { AddGoalPage } from '../pages/add-goal/add-goal';
import { ConnectIntegrationPage } from '../pages/connect-integration/connect-integration';
import { GoalDetailsPage } from '../pages/goal-details/goal-details';
import { LoginPage} from '../pages/login/login';
import { SettingsPage} from '../pages/settings/settings';
import { SelectGoalPage } from '../pages/select-goal/select-goal';
import { CreateGoalSettingsPage } from '../pages/create-goal-settings/create-goal-settings';
import { SelectMetricPage } from  '../pages/select-metric/select-metric';
import { PopoverPage } from '../pages/goal-details/popover';


import { User } from '../providers/user';
import { BeeminderApi } from '../providers/beeminder-api';
import { NectarApi } from '../providers/nectar-api';
import { EditGoalPage } from "../pages/edit-goal/edit-goal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddGoalPage,
    ConnectIntegrationPage,
    CreateGoalSettingsPage,
    SelectGoalPage,
    GoalDetailsPage,
    LoginPage,
    SettingsPage,
    SelectMetricPage,
    EditGoalPage,
    PopoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(MyApp),
	EnvironmentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddGoalPage,
    ConnectIntegrationPage,
    CreateGoalSettingsPage,
    SelectGoalPage,
    LoginPage,
    SettingsPage,
    GoalDetailsPage,
    EditGoalPage,
    SelectMetricPage,
    PopoverPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BeeminderApi,
    NectarApi,
    User,
  ]
})
export class AppModule { }
