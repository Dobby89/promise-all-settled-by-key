# Promise All Settled By Key

[![Build Status](https://travis-ci.org/Dobby89/promise-all-settled-by-key.svg)](https://travis-ci.org/Dobby89/promise-all-settled-by-key)
[![Total Downloads](https://img.shields.io/npm/dt/promise-all-settled-by-key.svg)](https://www.npmjs.com/package/promise-all-settled-by-key)
[![Latest Release](https://img.shields.io/npm/v/promise-all-settled-by-key.svg)](https://github.com/Dobby89/promise-all-settled-by-key/releases)
[![License](https://img.shields.io/npm/l/promise-all-settled-by-key.svg)](https://github.com/Dobby89/promise-all-settled-by-key/blob/master/LICENSE)

Returns a promise that resolves after all of the given promises have either resolved or rejected, with an object that contains the *resolved* status and *value* of each promise.

## Why?

[Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) returns promises in an array with no index or key, so you can't track what happened to which promise.

However, this package makes it possible to determine the outcome and value of specific promises because it returns each promise by key.

## Installation

```sh
npm install promise-all-settled-by-key
```

## Usage

```javascript
import promiseAllSettledByKey from 'promise-all-settled-by-key';

const promiseMap = {
    theNumberThree: Promise.resolve(3),
    getFoo: new Promise((resolve, reject) => setTimeout(reject, 100, 'foo error'),
    nope: new Promise((resolve, reject) => setTimeout(reject, 100))
}

promiseAllSettledByKey(promiseMap).then(settled => {
    console.log(settled);
});

// Expected output
// {
//     theNumberThree: { resolved: true, value: 3 }
//     getFoo: { resolved: false, value: 'foo error' },
//     nope: { resolved: false, value: undefined }
// }
```

### Resolved ONLY

You can set `{ onlyResolved = true }` to return only the **resolved** promises.

```javascript
promiseAllSettledByKey(promiseMap, { onlyResolved: true }).then(settled => {
    console.log(settled);
});

// Expected output
// {
//     theNumberThree: { resolved: true, value: 3 }
// }
```

### Rejected ONLY

You can set `{ onlyRejected = true }` to return only the **rejected** promises.

```javascript
promiseAllSettledByKey(promiseMap, { onlyRejected: true }).then(settled => {
    console.log(settled);
});

// Expected output
// {
//     getFoo: { resolved: false, value: 'foo error' },
//     nope: { resolved: false, value: undefined }
// }
```