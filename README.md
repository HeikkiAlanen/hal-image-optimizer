[![Build Status](https://travis-ci.org/HeikkiAlanen/hal-image-optimizer.svg?branch=master)](https://travis-ci.org/HeikkiAlanen/hal-image-optimizer)

hal-image-optimizer
===================

Simple application to optimize images for web usage.

NOTE: Application uses EasyImage which is built on top of ImageMagick, so make sure ImageMagick is installed on your system.


Planned features:
- Starting point from the application "create-thumbnails"
- User can define which kind of images are needed (size, name, format, quality)
  - from command line
  - via configuration file
- User defined source directory
- User defined target directory
- Created images are placed in target directory

Releases:
v0.1.0: 
* Thumbnails can be created from given directory and placed into that directory. 
* Help and usage output
* Version, license and copyright information

v0.2.0:
* Unit tests added.
* Grunt taken into use.
* ESLint for linting the code.
* Travis CI build & testing taken into use.

The MIT License (MIT)

Copyright (c) 2014 HeikkiAlanen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
