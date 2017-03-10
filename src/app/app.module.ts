
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddGoalPage } from '../pages/add-goal/add-goal';
import { ConnectIntegrationPage } from '../pages/connect-integration/connect-integration';
import { GoalDetailsPage } from '../pages/goal-details/goal-details';
import { IntegrationsPage } from '../pages/integrations/integrations';
import { LoginPage} from '../pages/login/login';
import { SettingsPage} from '../pages/settings/settings';
import { CreateGoalSettingsPage } from '../pages/create-goal-settings/create-goal-settings';
import { SelectMetricPage } from  '../pages/select-metric/select-metric';

import { User } from '../providers/user';
import { BeeminderApi } from '../providers/beeminder-api';
import { NectarApi } from '../providers/nectar-api';
import {EditGoalPage} from "../pages/edit-goal/edit-goal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddGoalPage,
    ConnectIntegrationPage,
    CreateGoalSettingsPage,
    GoalDetailsPage,
    IntegrationsPage,
    LoginPage,
    SettingsPage,
    SelectMetricPage,
    CreateGoalSettingsPage,
    EditGoalPage,
    CreateGoalSettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddGoalPage,
    ConnectIntegrationPage,
    CreateGoalSettingsPage,
    GoalDetailsPage,
    IntegrationsPage,
    LoginPage,
    SettingsPage,
    GoalDetailsPage,
    EditGoalPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    BeeminderApi,
    User,
    NectarApi
  ]
})
export class AppModule { }
