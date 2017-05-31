/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { EnvironmentsModule } from './environment-variables/environment-variables.module';
import { TimerComponent } from '../pages/timer/timer';
import { StopwatchPage } from '../pages/stopwatch/stopwatch';

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
import { EditGoalPage } from "../pages/edit-goal/edit-goal";
import { EditIntegrationPage } from '../pages/edit-integration/edit-integration';
import { GoalFilterPage } from '../pages/goal-filter/goal-filter';


import { User } from '../providers/user';
import { BeeminderApi } from '../providers/beeminder-api';
import { NectarApi } from '../providers/nectar-api';
import { NetworkService } from '../providers/network-service';

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
    EditIntegrationPage,
	GoalFilterPage,
    PopoverPage,
	TimerComponent,
	StopwatchPage
  ],
  imports: [
    BrowserModule,
	HttpModule,
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
    EditIntegrationPage,
	GoalFilterPage,
    SelectMetricPage,
    PopoverPage,
	StopwatchPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar,
    SplashScreen,
    SocialSharing,
	Network,
	Diagnostic,
	SpeechRecognition,
    BeeminderApi,
    NectarApi,
    User,
	NetworkService
  ]
})
export class AppModule { }
