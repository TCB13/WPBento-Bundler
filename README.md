# WPBento Bundler
A sane and simple Webpack setup for WordPress development.

**Main Features:**
 - Runs alongside any webserver/PHP and does not interface nor interferes with it
 - Bundles SCSS into a single `style.min.css` file
 - Bundles JS modules (and optionally TypeScript) into `script.min.js`
 - Browser live-reload
 - ES Modules

## Quick Setup

1. Folder structure:
````
 ./       -> your WordPress theme folder
 ./src    -> source folder for js, ts, scss files
 ./assets -> complied/bundled output files
````
2. Configuration for `package.json`:
````
 "type": "module",
 "scripts": {
 	"watch": "webpack --progress --watch --mode development",
 	"build-prod": "webpack --mode production",
 	"build-dev": "webpack --mode development"
 },
````
3. Install dev dependencies:
````
 $ npm i
 
 # OR if you aren't cloning this repo:
 $ npm install @babel/core @babel/preset-env babel-loader css-loader mini-css-extract-plugin node-sass sass-loader style-loader url-loader webpack webpack-cli browser-sync-webpack-plugin --save-dev
````
4. Add the bundled files to your `header.php`:
````
 <link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/style.min.css" type="text/css" media="screen"/>
 <script src="<?php bloginfo('template_directory'); ?>/assets/script.min.js" defer></script>
````

## Usage
````
 $ npm run watch        # Development with live reload
 $ npm run build-prod   # Build for production
````


________

Brought to you by TCB13 (Tadeu Bento) 2023. Licensed under MIT.
