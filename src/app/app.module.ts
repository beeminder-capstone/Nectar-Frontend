
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
import { GoalDetailsFormPage } from '../pages/goal-details-form/goal-details-form';

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
    GoalDetailsFormPage
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
    GoalDetailsFormPage
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
