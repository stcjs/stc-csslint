# stc-csslint

csslint plugin for stc 

## Install

```sh
npm install stc-csslint
```

## How to use

```
var csslint = require('stc-csslint');

//csslint
stc.lint({
  csslint: {plugin: csslint, include: /\.css$/}
});
```
