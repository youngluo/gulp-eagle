const { notify } = global.plugins;
const { log } = global.Eagle;

class Notification {
  constructor(message) {
    this.title = 'Gulp Eagle';

    if (message) {
      return this.message(message);
    }
  }

  /**
   * Display a notification.
   */
  message(message) {
    return notify({
      title: this.title,
      message: message,
      onLast: true
    });
  }

  /**
   * Display an error notification.
   */
  error(e, message) {
    notify.onError({
      title: this.title,
      message: message + ': <%= error.message %>',
      onLast: true
    })(e);

    log.error(e);
  }
}

module.exports = Notification;
