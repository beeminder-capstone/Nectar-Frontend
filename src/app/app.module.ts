
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AddGoalPage } from '../pages/add-goal/add-goal';
import { GoalDetailsPage } from '../pages/goal-details/goal-details'
import { IntegrationsPage } from '../pages/integrations/integrations'
import { LoginPage} from '../pages/login/login'
import { SettingsPage} from '../pages/settings/settings';
import { GoalWizardPage } from '../pages/goal-wizard/goal-wizard';
import { CreateGoalSettingsPage } from '../pages/create-goal-settings/create-goal-settings';

import { User } from './../providers/user';
import { BeeminderApi } from '../providers/beeminder-api';
import { NectarApi } from '../providers/nectar-api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddGoalPage,
    GoalDetailsPage,
    IntegrationsPage,
    LoginPage,
    SettingsPage,
    GoalDetailsPage,
    GoalWizardPage,
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
    GoalDetailsPage,
    IntegrationsPage,
    LoginPage,
    SettingsPage,
    GoalDetailsPage,
    GoalWizardPage,
    CreateGoalSettingsPage
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
