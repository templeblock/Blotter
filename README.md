Making Changes
==

Firstly, install Blotter's dependencis (OSX):

```
$ brew install yuicompressor
$ npm install
```

The blotter.js and blotter.min.js files are built from source files in the src directory. Do not edit blotter.js directly. Instead, edit the source files, and then run the following build the generated files:

```
$ make clean
$ make
```