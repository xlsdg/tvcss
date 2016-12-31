# tvcss

> A flexible layout tool for television. Heavily inspired in [HotCss](https://github.com/imochen/hotcss).


## Installation

``` bash
$ npm install --save tvcss
```


## Usage

``` html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="tvcss" content="design-width=750"/>
    <script src="/path/to/tvcss.min.js"></script>
  </head>
  <body>
  </body>
  </html>
```

OR

``` html
  <meta name="tvcss" content="initial-dpr=1.0,min-width=320,max-width=1920,design-width=1920"/>
```


## Config

* `initial-dpr` **[Optional]**
* `min-width` **[Optional]**
* `max-width` **[Optional]**
* `design-width` **[Required]**


## Properties

* `dpr`
* `minWidth`
* `maxWidth`
* `designWidth`


## Methods

* `px2rem`
* `rem2px`
* `resize`
* `update` **[Delay resize]**


# License

MIT
