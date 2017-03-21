[![Build Status](https://travis-ci.org/beeminder-capstone/Nectar-Frontend.svg?branch=develop)](https://travis-ci.org/beeminder-capstone/Nectar-Frontend)
# Nectar Frontend

Copyright © 2017 The [PSU](https://www.pdx.edu/) [CS](https://www.pdx.edu/computer-science/) Beeminder [Capstone](http://wiki.cs.pdx.edu/capstone/fall_2016/fall_2016.html) Team

Frontend for Nectar app

Nectar adds support for more integrations on [Beeminder](https://www.beeminder.com/). Automatically gets data from supported integrations and adds it to Beeminder goals.

This frontend compiles an Android and iOS version of the app, more interfaces to be added at a later date.

This is a work in progress. Incorporates the [Nectar Backend](https://github.com/beeminder-capstone/Nectar-Backend).

Requires [Cordova and Ionic 2](https://ionicframework.com/getting-started/).

To use Android app - download the APK found in the APK folder. 
[Download](./apk/Nectar.apk)

Enable installation of apps from Unknown Sources in your android device settings.
Install the APK and enjoy!

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
This app allows the user to do the following things for their Beeminder account
 * Add a goal
     * Manual
     * Using Integration
 * View a Goal
 * Delete a Goal
 
In addition, app notifications are supported, so the user has a choice between the Beeminder emails and regualar app notifications.

##Build
The following instructions will enable you to download and compile the source into a working Android and/or iOS application:



1. Install Node.js: [https://nodejs.org/en/](https://nodejs.org/en/)
    1.  Note: If you are using Windows, you can use Visual Studio and skip most of these instructions: [https://www.visualstudio.com/vs/cordova/?wt.mc_id=o~display~ionic~dn948185](https://www.visualstudio.com/vs/cordova/?wt.mc_id=o~display~ionic~dn948185)
2.    Install Cordova and Ionic ([http://ionicframework.com/getting-started/](http://ionicframework.com/getting-started/)): `npm install -g cordova ionic`.
3.    Install the Java Development Kit (JDK): [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
    1.    Note: If you are using Windows, you must set some System Environment Variables:
        1.     Open “This PC” and find the installation folder for the JDK. Mine was `C:\Program Files\Java\jdk1.8.0_112`.
        2.    Open “This PC” > “Properties” > “Advanced system settings”, click “Environment Variables”.
        3.    Under “System variables”, click “New”. Type `JAVA_HOME` for the “Variable name” and the path from step i for the “Variable value”.
        4.    Under “System variables”, select the `Path` Variable, click “Edit…” > “New”. Type `%JAVA_HOME%\bin`.
4.    If installing the Android app, install Android Studio: [https://developer.android.com/studio/install.html](https://developer.android.com/studio/install.html)
5.    If installing the iOS app, install Xcode: [https://developer.apple.com/xcode/](https://developer.apple.com/xcode/)
6.    CD into the directory where you want to create the app and run: `ionic start --v2 Nectar blank`.
7.    CD into the `Nectar` directory, delete the “resources” and “src” folders and all the individual files (leave the rest of the folders and their contents).
8.    Download the files: [https://github.com/beeminder-capstone/Nectar-Frontend](https://github.com/beeminder-capstone/Nectar-Frontend) into the `Nectar` directory.
9.    Run: `ionic plugin add cordova-plugin-inappbrowser`.
    1.    See this for more info: [https://www.thepolyglotdeveloper.com/2016/01/using-an-oauth-2-0-service-within-an-ionic-2-mobile-app/](https://www.thepolyglotdeveloper.com/2016/01/using-an-oauth-2-0-service-within-an-ionic-2-mobile-app/)
10.    If installing the Android app:
	1.    Run: `ionic platform add android@latest --save`, it will fail.
	2.    Open Android Studio, click “Import project” and select the `Nectar\platforms\android` folder. Install the Android SDK version it recommends on the bottom. Close Android Studio.
		1.    Note: Do NOT update the Android Gradle Plugin.
	3.    Delete the `Nectar\platforms` folder. Rerun: `ionic platform add android`, it should now succeed.
	4.    If you have an Android device (phone/tablet), connect it to your computer and enable “USB debugging”: [https://developer.android.com/studio/run/device.html](https://developer.android.com/studio/run/device.html). Run: `ionic run android`.
	5.    Otherwise, open Android Studio and click “Run” to setup an emulator (Virtual Device).
11.    If installing the iOS app:
	1.    Run: `ionic platform add ios`.

##Contributing
To contribute, simply fork and then create a pull request. 

##License
#####Copyright © 2017 The [PSU](https://www.pdx.edu/) [CS](https://www.pdx.edu/computer-science/) Beeminder [Capstone](http://wiki.cs.pdx.edu/capstone/fall_2016/fall_2016.html) Team
This code is available under the "MIT License".
Please see the file LICENSE in this distribution for license terms.
