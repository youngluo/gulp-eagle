var notify = require('gulp-notify');


var Notification = function (message) {
    this.title = 'Gulp Eagle';

    if (message) {
        return this.message(message);
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
        icon: __dirname + '/icons/pass.png',
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