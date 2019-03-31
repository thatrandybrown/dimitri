# dimitri
a library for generating random strings and numbers through sampling

## Overview

dimitri is a small library for generating random numbers and strings in node applications that places security over success.

Two things to note:

* dimitri will throw an error if a window is defined
* dimitri will not generate numbers greater than 2^32

## Installation

`npm i dimitri`

## Usage

### Generating a Random Number

```js
const csprng = require('dimitri').getRandInRange

console.log(csprng(5, 10)) // min, max
// 8, maybe
```

### Generating a Random String

```js
const dimitri = require('dimitri')

const genStringOfLen = dimitri.getString("abcdefghijklmnopqrstuvwxyz") // valid chars

console.log(genStringOfLen(5)) // desired length
// bkmod, maybe
```
