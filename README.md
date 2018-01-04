[![Build Status](https://travis-ci.org/HeikkiAlanen/hal-image-optimizer.svg?branch=master)](https://travis-ci.org/HeikkiAlanen/hal-image-optimizer)
[![Coverage Status](https://coveralls.io/repos/HeikkiAlanen/hal-image-optimizer/badge.png)](https://coveralls.io/r/HeikkiAlanen/hal-image-optimizer)

hal-image-optimizer
===================

Simple application to optimize images for web usage.

NOTE: Application uses EasyImage which is built on top of ImageMagick, so make sure ImageMagick is installed on your system.


##Features:
- User can define which kind of images are needed (size, source directory, target directory)
  - from command line
  - via configuration file
- Created images are placed in target directory
- Task runner plugin: [grunt-hal-image-optimizer](https://github.com/HeikkiAlanen/grunt-hal-image-optimizer)

##Releases:

###v1.0.0:
* Changes for Grunt plugin.
* Configuration file for module.

###v0.3.0:
* User defined source directory
* User defined target directory
* Created images are placed in target directory
* Dependency monitoring

###v0.2.0:
* Unit tests added.
* Grunt taken into use.
* ESLint for linting the code.
* Travis CI build & testing taken into use.

###v0.1.0: 
* Thumbnails can be created from given directory and placed into that directory. 
* Help and usage output
* Version, license and copyright information

## License

Copyright (c) [HeikkiAlanen](https://github.com/HeikkiAlanen)

Licensed under the [MIT license](LICENSE-MIT)
