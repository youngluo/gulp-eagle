const { config } = global.Eagle;

function checkOptions(options = {}) {
  let defaultOptions = {
    removePath: config.removePath
  };

  return Object.assign({}, defaultOptions, options);
}

module.exports = checkOptions;
