
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

import { User } from './../providers/user';
import { BeeminderApi } from './../providers/beeminder-api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddGoalPage,
    GoalDetailsPage,
    IntegrationsPage,
    LoginPage,
    SettingsPage,
    GoalDetailsPage
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
    GoalDetailsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, BeeminderApi, User]
})
export class AppModule { }
