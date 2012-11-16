# About

- - - - - -

### Overview
This module demonstrates how to make the Mobile Saleslogix v2.0 application compatible with SData server 7.5.3 which does not provide the function call getCurrentUser required on 7.5.4 and later during login.

### Included Examples
*  Make mobile-slx compatible with 7.5.3 server by overriding authenticateUser function at application level.

#Installation

- - - - - 

### Prerequisites
*	A web server

### Clone repository
1\.	Open a command prompt.

2\.	change to the base directory where you cloned [Argos SDK][argos-sdk], eg:

		cd \projects\sage\mobile
		
3\.	Execute the following commands (clone command shown with READ-ONLY URL; if you have commit rights, use the appropriate Read+Write URL).

		cd products
		git clone git://github.com/SageSalesLogix/argos-20_for_slx_753.git

    __Note:__ If you're downloading and extracting the zip file instead of using git directly, the top-level folder in your download will probably be named something like "SageSalesLogix-argos-20_for_slx_753-nnnnn". You'll want to rename this folder to argos-20_for_slx_753, and put it under your products sub-folder. You'll end up with a folder structure like this:

        ...\mobile\argos-sdk
        ...\mobile\products\argos-saleslogix
        ...\mobile\products\argos-20_for_slx_753

### Setup and run the application in "debug" mode

1\.  Follow the instructions for running the argos-saleslogix project in debug mode in that project's README.

2\.  Make a copy of the argos-saleslogix index-dev.html file and name it index-dev-20_for_slx_753.html.

3\.  Edit following lines to index-dev-20_for_slx_753.html. Note the relative paths pointing to the argos-20_for_slx_753 folder. An example of this file is included with this project.

```
    require({
			baseUrl: "./",
			packages: [
			{ name: 'dojo', location: '../../argos-sdk/libraries/dojo/dojo' },
			{ name: 'dijit', location: '../../argos-sdk/libraries/dojo/dijit' },
			{ name: 'Sage/Platform/Mobile', location: '../../argos-sdk/src' },
			{ name: 'Mobile/SalesLogix', location: 'src' },
			{ name: 'Mobile/Slx20for753', location: '../argos-20_for_slx_753/src' },
			{ name: 'configuration/slx20for753', location: '../argos-20_for_slx_753/configuration' }
			]
     });

    var application = 'Mobile/SalesLogix/Application',
        configuration = [
            'configuration/slx20for753/development' //<-- development config file (no extension)
        ];
    require([application].concat(configuration), function(application, configuration) {
        var localization = [
            'localization/en',
            'localization/saleslogix/en'
        ];
```

4\.	If you have any additional images, icons, etc that you wish to be available during development you will need to copy them into their respective folders within argos-saleslogix. Doing this allows any relative paths to files to remain intact when your module is deployed (all folders are merged in deployment). 

5\.	Place index-dev-20_for_slx_753.html in the argos-saleslogix folder. In your browser, open index-dev-20_for_slx_753.html from the file system, or...navigate to the path `/mobile/products/argos-saleslogix/index-dev-20_for_slx_753.html` on your web server, eg:

		http://localhost/mobile/products/argos-saleslogix/index-dev-20_for_slx_753.html

### Building A Release Version

#### Before You Start

You may place information about your customization module in the `module-info.json` file in the root directory. This information will be displayed in Application Architect (in the next release) for easy identification and versioning.

#### Requirements
*	Windows

#### Steps

1\.	Save this [gist](https://gist.github.com/815451) as `build-module.cmd` to the directory where you cloned [Argos SDK][argos-sdk] (The same folder where you created the Products folder).

2\.	Open a command prompt and execute the following, changing paths as appropriate, eg:

        cd \projects\sage\mobile
        build-module 20_for_slx_753

3\.	The deployed module will be in a `deploy` folder in the directory where you cloned [argos-20_for_slx_753][argos-20_for_slx_753].

### Deploying

#### Setup

1\.	Open the deploy folder for the product, eg:

		mobile\products\argos-20_for_slx_753\deploy

2\. Then open the `module-fragment.html` file. This file will be placed into all the `index` files (either manually via copy pasting the lines or automatically through AA).

3\. Edit it to point to your minified script (following the `deploy` folder layout):

```
    <!-- 2.0 for 7.5.3 compatibility -->
    <script type="text/javascript" src="content/javascript/argos-slx20for753.js"></script>
```    

4\. At this point this guide will continue assuming you are manually deploying, this section will change when AA supports Mobile Deployment.

5\. Edit `index.html`, `index-nocache.html`, `index.aspx` and `index-nocache.aspx` by copying the lines from `module-fragment.html` (the ones you added earlier, this file is not copied into the deploy folder so look for it in your normal dev directory) into each file at the designated modules marker:

```
    <!-- Modules -->
    <!--{{modules}}-->
```

To:

    <!-- Modules -->
    <!-- 2.0 for 7.5.3 compatibility -->
    <script type="text/javascript" src="content/javascript/argos-slx20for753.js"></script>

6\. Lastly we need to add the modules configuration and any localization by editing the following lines:

```
    (function() {
        var application = 'Mobile/SalesLogix/Application',
            configuration = [
                'configuration/production'
           ];
        require([application].concat(configuration), function(application, configuration) {
            var localization = [
                'localization/en',
                'localization/saleslogix/en'
            ];
```

To:

```
    (function() {
        var application = 'Mobile/SalesLogix/Application',
            configuration = [
                'configuration/production',
                'configuration/slx20for753/production'
           ];
        require([application].concat(configuration), function(application, configuration) {
            var localization = [
                'localization/en',
                'localization/saleslogix/en'
            ];
```

#### Finished

The argos-20_for_slx_753 module will now be part of the Sage SalesLogix Mobile client.


[argos-sdk]: https://github.com/Sage/argos-sdk "Argos SDK Source"
[argos-saleslogix]: https://github.com/SageSalesLogix/argos-saleslogix "Argos SalesLogix Source"
[argos-20_for_slx_753]: https://github.com/SageSalesLogix/argos-20_for_slx_753 "Argos 20_for_slx_753"