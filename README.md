# Mail Preview

Preview your [Nodemailer](https://github.com/andris9/Nodemailer) emails in your
browser (Inspired by [Letter Opener](https://github.com/ryanb/letter_opener)).

[![Build Status](https://api.travis-ci.org/davidcornu/mail-preview.png)](https://travis-ci.org/davidcornu/mail-preview)

## Usage

1. Install via [npm](https://npmjs.org)

    ```
    $ npm install mail-preview
    ```

2. Use it with Nodemailer

    ```javascript
    var nodemailer = require('nodemailer');
    var path = require('path');
    require('mail-preview');

    var tmpdir = path.join(__dirname, 'tmp', 'nodemailer');

    var transport = nodemailer.createTransport('MailPreview', {
      dir: tmpdir,  // defaults to ./tmp/nodemailer
      browser: true // open sent email in browser (mac only, defaults to true)
    });
    ```

    Any emails sent through the `MailPreview` transport will be written to the
    `tmpdir` and opened in a browser (unless `browser` is set to false).

## Development

Clone the repo

```
$ git clone git@github.com:davidcornu/mail-preview.git
```

Install dependencies

```
$ npm install
```

Run the tests

```
$ npm test
```
