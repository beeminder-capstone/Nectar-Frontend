[![Build Status](https://travis-ci.org/beeminder-capstone/Nectar-Frontend.svg?branch=develop)](https://travis-ci.org/beeminder-capstone/Nectar-Frontend)
# Nectar Frontend

Frontend for Nectar app

Copyright © 2017 The [PSU](https://www.pdx.edu/) [CS](https://www.pdx.edu/computer-science/) Beeminder [Capstone](http://wiki.cs.pdx.edu/capstone/fall_2016/fall_2016.html) Team

Maintained by: [Teal Dulcet](https://github.com/tdulcet)

Made by:
* [Rachael Johnson](https://github.com/rhatchet)
* [Kevin Bui](https://github.com/kevbui)
* Teal Dulcet
* [Nathan Axt](https://github.com/naxt25)
* [Tim Sweeney](https://github.com/sweeney6)
* [Nida Imran](https://github.com/nidaimran)
* [Tuan Lam](https://github.com/t-lam)

Nectar adds support for more integrations on [Beeminder](https://www.beeminder.com/). Automatically gets data from supported integrations and adds it to Beeminder goals.

This frontend compiles an Android, iOS (iPhone/iPad) and Windows version of the app, more interfaces to be added at a later date.

Incorporates the [Nectar Backend](https://github.com/beeminder-capstone/Nectar-Backend).

Requires [Cordova and Ionic 2](https://ionicframework.com/getting-started/).

To use Android app - download the APK found in the APK folder from your Android device. 
[Download](./apk/Nectar.apk)

Allow installation of apps from “Unknown sources” in your Android device settings.
Install the APK and enjoy!

---

### Table of Contents
 - [Idea](#Idea)
 - [Usage](#usage)
 - [Build](#build)
 - [Contributing](#contributing)
 - [License](#license)
 
---

## Idea
The idea behind this project was to create a clean, user friendly app for customers of Beeminder to use to add any goals using any integrations that Beeminder supports.


## Usage
This app allows the user to do the following things for their Beeminder account
 * Add a goal
     * Manual
     * Using Integration
 * View a Goal

## Build
The following instructions will enable you to download and compile the source into a working Android and/or iOS and/or Windows application:



1. Install Node.js: [https://nodejs.org/en/](https://nodejs.org/en/)
    1. Note: If you are using Windows, you can use Visual Studio and build for Windows, Android and iOS: [https://docs.microsoft.com/en-us/visualstudio/cross-platform/tools-for-cordova/first-steps/get-started-with-ionic2](https://docs.microsoft.com/en-us/visualstudio/cross-platform/tools-for-cordova/first-steps/get-started-with-ionic2)
        1. Complete steps 1, 2 and 5.
        2. Open Visual Studio, select the “Tools” menu, “Extensions and Updates…” and “Online”. Using the search box find “NPM Task Runner” and click “Download”. Using the search box again, find “Ionic 2 Templates” and click “Download”.
        3. Close Visual Studio and click “Modify”.
        4. Open Visual Studio again, select the “File” menu, “New”, “Project…”, expand the “TypeScript” section under “Templates”, select “Mobile Apps” and the “Ionic 2 - Blank” template. Type `Nectar` for the “Name” and click “OK”.
        5. Wait a few minutes while Ionic's npm packages are installed, then close Visual Studio.
        6. Open the directory where you created the app. Remove the `node_modules`, `resources` and `src` folders.
        7. Complete steps 7, 8 and 9.
        8. Open Visual Studio and the project.
        9. Select the “Tools” menu, “Options…”, expand the “Projects and Solutions” section, select “Web Package Management” and “$(PATH)”. Click the up arrow “↑” to move it to the top of the list and click “OK”.
        10. Select a target platform in the toolbar, a target device and press the green arrow to run the app.
2. Install Cordova and Ionic ([http://ionicframework.com/getting-started/](http://ionicframework.com/getting-started/)): `npm install -g cordova ionic`.
3. If installing the Android app, install the Java Development Kit (JDK): [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
    1. Note: If you are using Windows, you must set some System Environment Variables:
        1. Open “This PC” and find the installation folder for the JDK. Mine was `C:\Program Files\Java\jdk1.8.0_131`.
        2. Open “This PC” > “Properties” > “Advanced system settings”, click “Environment Variables”.
        3. Under “System variables”, click “New”. Type `JAVA_HOME` for the “Variable name” and the path from step a for the “Variable value”.
        4. Under “System variables”, select the `Path` Variable, click “Edit…” > “New”. Type `%JAVA_HOME%\bin`.
 	2. Install Android Studio: [https://developer.android.com/studio/install.html](https://developer.android.com/studio/install.html)
4. If installing the iOS app, install Xcode: [https://developer.apple.com/xcode/](https://developer.apple.com/xcode/)
5. If installing the Windows app, see install Visual Studio Community: [https://www.visualstudio.com/downloads/](https://www.visualstudio.com/downloads/) and select the "Mobile Development with JavaScript" feature: [https://docs.microsoft.com/en-us/visualstudio/cross-platform/tools-for-cordova/first-steps/installation](https://docs.microsoft.com/en-us/visualstudio/cross-platform/tools-for-cordova/first-steps/installation).
6. CD into the directory where you want to create the app.
7. Clone or Download the files: [https://github.com/beeminder-capstone/Nectar-Frontend](https://github.com/beeminder-capstone/Nectar-Frontend) into the directory.
8. Run: `npm install`.
9. Set all environment variables listed in: `src/app/environment-variables/development.ts`.
10. If installing the Android app:
    1. Run: `ionic cordova platform add android`.
    2. Open Android Studio, click “Import project” and select the `Nectar-Frontend\platforms\android` folder.
        1. Note: Do NOT update the Android Gradle Plugin.
    3. If you have a physical Android device (phone/tablet), plug it into your computer using a USB cable and enable “USB debugging” from “Developer options”: [https://developer.android.com/studio/run/device.html](https://developer.android.com/studio/run/device.html).
    4. Otherwise, open Android Studio and click the Android Virtual Device Manager icon to setup an emulator.
    5. Run: `ionic cordova run android`.
11. If installing the iOS app:
    1. Run: `ionic cordova platform add ios`.
12. If installing the Windows app:
    1. Run: `ionic cordova platform add windows`.
    2. Open Visual Studio, click “Open Project/Solution” and select the `Nectar-Frontend\platforms\windows\CordovaApp.sln` file.
    3. In the “Solution Explorer”, right click the platform you want to run and select “Build”.
    4. Press the green arrow in the toolbar to run the app on the Local Machine.
    5. Otherwise, select the dropdown arrow to run it in a Simulator.

## Contributing
To contribute, simply fork and then create a pull request. 

## License
##### Copyright © 2017 The [PSU](https://www.pdx.edu/) [CS](https://www.pdx.edu/computer-science/) Beeminder [Capstone](http://wiki.cs.pdx.edu/capstone/fall_2016/fall_2016.html) Team
This code is available under the "MIT License".
Please see the file LICENSE in this distribution for license terms.
