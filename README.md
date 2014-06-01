# grunt-operator-require

> Plugin append require operator for js files, and build deps in html file.
Simple and stupid.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-operator-require --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-operator-require');
```

## The "operator_require" task

### Overview
In your project's Gruntfile, add a section named `operator_require` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  operator_require: {
    options: {
    	baseUrl: "/",
    	folder: "example/src/",
    	index: "index.js", //in example/src
    	dest: "example/index.html"
    },
  },
});
```

in your dest file (example/index.html) append lines
```html
<!-- src -->
<!-- endsrc -->
```

### Options

#### options.folder
Type: `String`
Default value: `null`

Main folder of app src files.

#### options.index
Type: `String`
Default value: `null`

App start point.

#### options.dest
Type: `String`
Default value: `null`

App index file.

#### options.baseUrl
Type: `String`
Default value: `'/'`

Base url for file script include.

### Usage Examples

file index.js
```js
//require test/Test.js
//require test/Test2.js

...
```

file test/Test.js
```js
//require other/Test.js

...
```

build in index.html
```html
...
<!-- src -->
<script type="javascript" src="example/src/other/Test.js"></script>
<script type="javascript" src="example/src/test/Test.js"></script>
<script type="javascript" src="example/src/test/Test2.js"></script>
<script type="javascript" src="example/src/index.js"></script>
<!-- endsrc -->
...
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
