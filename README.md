[![Build Status](https://travis-ci.org/beeminder-capstone/Nectar-Frontend.svg?branch=develop)](https://travis-ci.org/beeminder-capstone/Nectar-Frontend)
# Nectar Frontend
---
Copyright (c) 2017 The Beeminder Capstone Team
Frontend for Nectar app


Nectar adds support for more integrations on [Beeminder](https://www.beeminder.com/). Automatically gets data from supported integrations and adds it to Beeminder goals.

This frontend compiles an android and webbrowser version of the app, more interfaces to be added at a later date.

This is a work in progress. Incorporates the [Nectar Backend](https://github.com/beeminder-capstone/Nectar-Backend).

Requires [Cordova and Ionic 2](https://ionicframework.com/getting-started/).

To use android app - download the apk found in the apk folder. 
[Download](./apk/Nectar.apk)

Enable installation of apps from Unkown Sources in your android device settings.
Install the apk and enjoy!

---

### Table of Contents
 - [Idea](#Idea)
 - [Usage](#usage)
 - [Build](#build)
 - [Contributing](#contributing)
 - [License](#license)
 
---

##Idea
The idea behind this project was to create a clean, user friendly app for customers of Beeminder to use to add any goals using any integrations that Beeminder supports.


##Usage
This app allows the user to do the following things for their beeminder account
 * Add a goal
     * Manual
     * Using Integration
 * View a Goal
 * Delete a Goal
 
In addition, app notifications are supported, so the user has a choice between the beeminder emails and regualar app notifications.

##Build
The following instructions will enable you to download and compile the source into a working android and web browser application.



1. Install Node.js: https://nodejs.org/en/
    1.  Note: If you are using Windows, you can use Visual Studio and skip most of these instructions: https://www.visualstudio.com/vs/cordova/?wt.mc_id=o~display~ionic~dn948185
2.    Install Cordova and Ionic (http://ionicframework.com/getting-started/): `npm install -g cordova ionic`.
3.    Install the Java Development Kit (JDK): http://www.oracle.com/technetwork/java/javase/downloads/index.html
    1.    Note: If you are using Windows, you must set some System Environment Variables:
        1.     Open “This PC” and find the installation folder for the JDK. Mine was `C:\Program Files\Java\jdk1.8.0_112`.
        2.    Open “This PC” > “Properties” > “Advanced system settings”, click “Environment Variables”.
        3.    Under “System variables”, click “New”. Type `JAVA_HOME` for the “Variable name” and the path from step i for the “Variable value”.
        4.    Under “System variables”, select the `Path` Variable, click “Edit…” > “New”. Type `%JAVA_HOME%\bin`.
4.    Install Android Studio: https://developer.android.com/studio/install.html
5.    CD into the directory where you want to create the app and run: `ionic start --v2 Nectar blank`.
6.    CD into the `Nectar` directory, delete the “resources” and “src” folders and all the individual files (leave the rest of the folders and their contents).
7.    Download the files: https://github.com/beeminder-capstone/Nectar-Frontend into the `Nectar` directory.
8.    Run: `ionic plugin add cordova-plugin-inappbrowser`.
    1.    See this for more info: https://www.thepolyglotdeveloper.com/2016/01/using-an-oauth-2-0-service-within-an-ionic-2-mobile-app/
9.    Run: `ionic platform add android`, it will fail.
10.    Open Android Studio, click “Import project” and select the `Nectar\platforms\android` folder. Install the Android SDK version it recommends on the bottom. Close Android Studio.
    1.    Note: Do NOT update the Android Gradle Plugin.
11.    Delete the `Nectar\platforms` folder. Rerun: `ionic platform add android`, it should now succeed.
12.    If you have an Android device (phone/tablet), connect it to your computer and enable “USB debugging”: https://developer.android.com/studio/run/device.html. Run: `ionic run android`.
13.    Otherwise, open Android Studio and click “Run” to setup an emulator (Virtual Device).

##Contributing
To contribute, simply fork and then create a pull request. 

##License
#####Copyright (c) 2017 The Beeminder Capstone Team
This code is available under the "MIT License".
Please see the file LICENSE in this distribution for license terms.
