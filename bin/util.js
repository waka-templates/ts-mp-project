/**
 * Created by ximing on 2018/12/7.
 */
module.exports.formatBuildTime = (time) => `${`${time / 1000}`.substr(0, 7)}s`;

module.exports.isNpmPkg = function(name) {
    if (/^(\.|\/)/.test(name)) {
        return false;
    }
    return true;
};

module.exports.alias = function() {};
