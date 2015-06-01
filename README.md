# Konsole.js

Konsole.js is a On-Screen Debugger/Logger and (optionally)
default browser console replacement for mobile and desktop.

Konsole was created to have a quick and simple way to debug a 
project you are working on, without the need to have a debugger take
up precious space. Konsole can be quickly accessed and used
via Keyboard shortcuts. If you want to open Konsole on mobile, there
is a hidden square/button at the bottom right of the browser on mobile devices.

Here, have a [demo](https://rawgit.com/eatcodeplay/Konsole.js/master/examples/basic.html).


## Features

* Mobile Friendly. Can be opened via a hidden square/button at the bottom right of any mobile browser.
* Obviously logging ( Log types: `log, info, system, warn, error, event` ).
* Prettifies log output, also allowing to define custom inspection depth 
* Takeover-Mode: use Konsole as if it were `console`. (Can be disabled)
* Create custom commands that can be called via the Commandline.
* Monitor values via a floating Window. Useful for fast changing properties.
* `Object.observe` in Konsole. Loads Polyfill (using [MaxArt2501/object-observe](https://github.com/MaxArt2501/object-observe)) if neccessary.
* Display FPS/MS Stats via [mrdoob/stats.js](https://github.com/mrdoob/stats.js/).
* Find / Highlight DOM Elements.
* Display DOM Elements in Konsole.
* A simple DOM Overflow Tester ( no success-guarantee given ;) ).
* CSS Manipulation ( add/remove classes, change properties, retrieve styles on DOM Element ).
* Possibility to log to a server via KonsoleReport. 


## How-to use

Konsole currently requires `jQuery v1` or `jQuery v2` to be loaded before itself.
Afterwards just add the CSS and Javascript File and you are good to go.

```html
    <!-- Make sure you've loaded jQuery before -->
    <link type="text/css" rel="stylesheet" href="konsole-1.2.0.bundled.min.css" />
    <script type="text/javascript" src="konsole-1.2.0.bundled.min.js"></script>


    <!-- ready to go -->
    <script>
        console.log('hello world');
    </script>
```

Konsole comes in two flavors:

* `bundled` with [prettify.js](https://code.google.com/p/google-code-prettify/) for DOM Element beautifying.
* regular `min` in case you don't need/want that.
* use `nokonsole` to disable logging without the need to remove any logging code.
* The same thing can be achieved by setting the option `Konsole.enabled` to `false`.

## Keyboard Shortcuts

| Shortcut                                  | Description                                                 |
| ----------------------------------------- | ----------------------------------------------------------- |
| `§`                                       | Open / Close Konsole (can be user-defined)                  |
| `Up / Down`                               | Browse the commandline history                              |
| `Ctrl + (Up / Down)`                      | Scroll Konsole content. Press `Shift` for faster scrolling. |
| `Alt + (Up / Down)`                       | Resize Konsole. Press `Shift` for faster resizing           |
| `Ctrl + Alt + (Up / Right / Down / Left)` | Snap Konsole to any border of the screen                    |


## Documentation

* Check out the [JSDocs](https://rawgit.com/eatcodeplay/Konsole.js/master/docs/index.html) for a Method and Property Reference.
* There are simple examples on how to use Konsole in the `/examples` folder. [Basic Example](https://rawgit.com/eatcodeplay/Konsole.js/master/examples/basic.html) , [Options Example](https://rawgit.com/eatcodeplay/Konsole.js/master/examples/options.html)
* For a list of available commands type `help` in the Konsole commandline.


## KonsoleReport

KonsoleReport is a small PHP Backend for Konsole to send messages to. It requires
PHP 5+ and writes its logs as JSON Files (one for each day).

Check out the [JSDocs](https://rawgit.com/eatcodeplay/Konsole.js/master/docs/index.html) on how to use it.

More Documentation will be added soon hopefully :)

## Browser Support

* Any modern Desktop or Mobile Browser and IE9 upwards
* IE8 requires `jQuery v1`. No guarantees given that everything works smoothly :P

## License

The MIT License (MIT)

Copyright (c) 2015 Sandro Ducceschi [eatcodeplay.ch](http://eatcodeplay.ch)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
