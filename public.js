  var Eagle,
      _ = require('lodash');

  function processParams(src, output, options) {
      if (typeof output == 'object') {
          options = output;
          output = undefined;
      }

      options = _.merge({
          base: null,
          removePath: Eagle.config.removePath
      }, options);

      return {
          src: src,
          output: output,
          options: options
      }
  }

  module.exports = function (eagle) {
      // Make Eagle available throughout incoming the Eagle class.
      Eagle = eagle;

      return {
          processParams: processParams
      }
  };