"use strict";

var notify = require("gulp-notify");
var chalk  = require('chalk');
var config = require('../tasks/config');

module.exports = function() {

  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify

  if ( config.defaults.show ) {
    notify.onError({
      title: "Compile Error",
      message: "<%= error %>"
    }).apply(this, args);
  } else {
    console.log(chalk.red('An error occurred during task processing'));
  }

  // Keep gulp from hanging on this task
  this.emit('end');
};
