/*jslint node: true */
"use strict";

var async = require('async');
var ethConnector = require('ethconnector');
var path = require('path');

exports.deploy = function(opts, cb) {
    var compilationResult;
    return async.waterfall([
        function(cb) {
            ethConnector.loadSol(path.join(__dirname, "ec.sol"), cb);
        },
        function(src, cb) {
            ethConnector.applyConstants(src, opts, cb);
        },
        function(src, cb) {
            ethConnector.compile(src, cb);
        },
        function(result, cb) {
            compilationResult = result;
            ethConnector.deploy(compilationResult.EC.interface,
                compilationResult.EC.bytecode,
                0,
                0,
                cb);
        },
    ], function(err, ec) {
        if (err) return cb(err);
        cb(null,ec, compilationResult);
    });
};
