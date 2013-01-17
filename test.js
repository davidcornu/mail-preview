var assert     = require('assert');
var path       = require('path');
var fs         = require('fs');
var Postman    = require('./postman');
var nodemailer = require('nodemailer');

var tmpdir    = path.join(__dirname, 'tmp', 'nodemailer');
var transport = nodemailer.createTransport('Postman', {
  dir: tmpdir,
  browser: false
});

var email = {
  from: "John Lennon <j.lennon@gmail.com>",
  to: "Paul McCartney <p.mccartney@gmail.com>, George Harrison <g.harrison@gmail.com>",
  cc: "Ringo Starr <r.starr@gmail.com>",
  bcc: "Yoko Ono <y.ono@gmail.com>",
  replyTo: "beatles@breeze123.com",
  subject: "Song Idea",
  charset: "utf-8",
  text: [
    "Hey jude, don't make it bad.",
    "Take a sad song and make it better.",
    "Remember to let her into your heart,",
    "Then you can start to make it better."
  ].join('\n'),
  html: [
    "<h1>Hey Jude</h1>",
    "<p>\nHey jude, don't make it bad.",
    "Take a sad song and make it better.",
    "Remember to let her into your heart,",
    "Then you can start to make it better.\n</p>"
  ].join('<br>\n')
};

describe('Postman', function(){

  it('should add itself to nodemailer\'s transports', function(){
    assert(nodemailer.Transport.transports.POSTMAN);
  });

  // TODO

});