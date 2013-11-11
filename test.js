var assert      = require('assert');
var path        = require('path');
var fs          = require('fs');
var nodemailer  = require('nodemailer');

require('./');

var tmpdir    = path.join(__dirname, 'tmp', 'nodemailer');
var transport = nodemailer.createTransport('MailPreview', {
  dir:     tmpdir,
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

describe('MailPreview', function(){

  it('adds itself to nodemailer\'s transports', function(){
    assert(nodemailer.Transport.transports.MAILPREVIEW);
  });

  describe('.sendMail()', function(){
    var error, response;

    before(function(done){
      transport.sendMail(email, function(e, r){
        error    = e;
        response = r;
        done();
      });
    });

    after(function(){
      try {
        // Cleanup files
        fs.unlinkSync(response.html);
        fs.unlinkSync(response.text);
        fs.rmdirSync(path.dirname(response.html));
      } catch (e) {
        console.error('Could not clean up temporary files');
        console.error(e.stack || e);
      }
    });

    it('does not return an error', function(){
      assert(error == null);
    });

    it('returns the details in the response', function(){
      assert(response.html && response.text);
    });

    it('writes the text part of the email to the corresponding file', function(){
      var body = fs.readFileSync(response.text, 'utf-8');
      assert(body.indexOf("Hey jude, don't make it bad.") >= 0);
    });

    it('writes the html part of the email to the corresponding file', function(){
      var body = fs.readFileSync(response.html, 'utf-8');
      assert(body.indexOf("<h1>Hey Jude</h1>") >= 0);
    });
  });
});