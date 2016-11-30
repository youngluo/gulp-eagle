var notify = require('gulp-notify');

/**
 * Create a new Notification instance.
 */
var Notification = function () {
    this.title = 'Gulp Eagle';

    // If an argument is provided, then we'll
    // assume they want to show a message.
    if (arguments.length) {
        return this.message(arguments[0]);
    }
};

/**
 * Display a notification.
 *
 * @param {string} message
 */
Notification.prototype.message = function (message) {
    return notify({
        title: this.title,
        message: message,
        onLast: true
    });
};

/**
 * Display an error notification.
 *
 * @param {object} e
 * @param {string} message
 */
Notification.prototype.error = function (e, message) {
    notify.onError({
        title: this.title,
        message: message + ': <%= error.message %>',
        icon: __dirname + '/icons/fail.png',
        onLast: true
    })(e);

    // We'll spit out the error, just in
    // case it is useful for the user.
    console.log(e);
};

module.exports = Notification;