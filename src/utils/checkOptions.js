const { config } = global.Eagle;

let defaultOptions = {
  removePath: config.removePath
};

function checkOptions(options = {}) {
  return Object.assign({}, defaultOptions, options);
}

module.exports = checkOptions;
