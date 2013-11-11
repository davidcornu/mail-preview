var path   = require('path');
var mkdirp = require('mkdirp');
var fs     = require('fs');
var jade   = require('jade');
var open   = require('open');

var tmplPath = path.join(__dirname, 'template.jade');
var template = jade.compile(fs.readFileSync(tmplPath, 'utf-8'));

(function(){
  var nodemailer = require('nodemailer');
  nodemailer.Transport.transports.MAILPREVIEW = MailPreviewTransport;
})();

function MailPreviewTransport(options){
  options      = options || {};
  this.dir     = options.dir || path.join(process.cwd(), 'tmp', 'postman');
  this.browser = typeof options.browser == 'boolean' ? options.browser : true;
  mkdirp.sync(this.dir);
}

MailPreviewTransport.prototype.sendMail = function(mail, callback){
  callback = callback || function(){};
  process.nextTick(function(){ this._process(mail, callback); }.bind(this));
};

MailPreviewTransport.prototype.close = function(callback){
  if (typeof callback == 'function') callback();
};

MailPreviewTransport.prototype._process = function(mail, callback){
  var timestamp = (new Date).toISOString().replace(/[-:TZ\.]/g, '');
  var directory = path.join(this.dir, timestamp);
  mkdirp.sync(directory);

  var multipart = mail._message.html && mail._message.body;
  var files = {};

  ['html', 'body'].forEach(function(p){
    if (!mail._message[p]) return;
    var part     = (p == 'body' ? 'text' : p);
    var filename = path.join(directory, 'message_' + part + '.html');

    var output = template({
      message:   mail._message,
      charset:   mail.options.charset || 'utf-8',
      content:   mail._message[p],
      multipart: multipart,
      part:      part
    });

    fs.writeFileSync(filename, output, mail.options.charset || 'utf-8');

    files[part] = filename;
  });

  if (this.browser) open(files.html || files.text);

  callback(null, files);
};