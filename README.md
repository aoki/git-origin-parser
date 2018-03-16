# git-origin-parser

`git-origin-parser` is to parse git URI and return JS object.
Support protocol is `file://`, `git://`, `ssh://` and `http(s)://`.

## Install

```bash
npm install git-origin-parser
```


## How to Use

```js
const parse = require('git-origin-parser');
const origin = parse('https://github.com/ringohub.git-origin-parser.git');
```

`origin` object is below.

```js
{ type: 'https',
  domain: 'github.com',
  path: 'ringohub.git-origin-parser' }
```
