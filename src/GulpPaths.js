var p = require('path'),
    gutils = require('gulp-util'),
    parsePath = require('parse-filepath'),
    Eagle;

var GulpPaths = function () {};

/**
 * Set the Gulp src file(s).
 *
 * @param  {string|Array} src
 * @return {GulpPaths}
 */
GulpPaths.prototype.src = function (src) {
    var self = this,
        prefix = Eagle.config.buildPath;

    src = this.prefix(src, prefix);

    if (Array.isArray(src)) {
        src = src.map(function (path) {
            if (self.parse(path).isDir) {
                path += '/**/*';
            }

            return path;
        });

        self.src = {
            path: src
        };
    } else {
        self.src = self.parse(src);
        self.src.isDir && (self.src.path += '/**/*');
    }

    return self;
};

/**
 * Set the Gulp output path.
 *
 * @param  {string}      output
 * @param  {string|null} defaultName
 * @return {GulpPaths}
 */
GulpPaths.prototype.output = function (output, defaultName) {
    output = output ? p.join(Eagle.config.buildPath, output) : Eagle.config.buildPath;

    this.output = this.parse(output);

    if (!this.output.name && defaultName) {
        // We'll check to see if the provided src is not
        // an array. If so, we'll use that single file
        // name as the output name. But we must also
        // change the extension (.scss -> .css).
        if (!Array.isArray(this.src.path) && this.src.name.indexOf('*') == -1) {
            defaultName = this.changeExtension(
                this.src.name,
                this.parse(defaultName).extension
            );
        }

        this.output = this.parse(p.join(output, defaultName));
    }

    return this;
};

/**
 * Change the file extension for a path.
 *
 * @param  {string} path
 * @param  {string} newExtension
 * @return {string}
 */
GulpPaths.prototype.changeExtension = function (path, newExtension) {
    return gutils.replaceExtension(path, newExtension);
};

/**
 * Apply a path prefix to the path(s).
 *
 * @param  {string|Array} path
 * @param  {string|null}  prefix
 * @return {string|Array}
 */
GulpPaths.prototype.prefix = function (path, prefix) {
    if (!path) return prefix;
    if (!prefix) return path;

    var prefixOne = function (path) {

        if (path.indexOf('./') == 0) {
            return path.substring(2);
        }

        // If path starts with "!" we need to negate him
        if (path.indexOf('!') == 0) {
            path = '!' + p.join(prefix, path.substring(1));
        } else {
            path = p.join(prefix, path);
        }

        return path.replace(/\/\//g, '/')
            .replace(p.join(prefix, prefix), prefix);
    };

    if (Array.isArray(path)) {
        return path.map(prefixOne);
    }

    return prefixOne(path);
};

/**
 * Parse the file path.
 *
 * @param  {string} path
 * @return {object}
 */
GulpPaths.prototype.parse = function (path) {
    var segments = parsePath(path);

    return {
        path: path,
        name: segments.extname ? segments.basename : '',
        extension: segments.extname,
        isDir: !(!!segments.extname),
        baseDir: segments.extname ? segments.dirname : p.join(segments.dirname, segments.basename)
    };
};

module.exports = function (eagle) {
    // Make Eagle available throughout incoming the Eagle class.
    Eagle = eagle;

    return GulpPaths;
};