/*jslint node: true */
"use strict";

var async = require('async');
var ethConnector = require('./eth_connector');

exports.deployECCurve = function(opts, cb) {
    var compilationResult;
    return async.waterfall([
        function(cb) {
            ethConnector.loadSol("eccurve.sol", cb);
        },
        function(src, cb) {
            ethConnector.applyConstants(src, opts, cb);
        },
        function(src, cb) {
            ethConnector.compile(src, cb);
        },
        function(result, cb) {
            compilationResult = result;
            ethConnector.deploy(compilationResult.ECCurve.interface,
                compilationResult.ECCurve.bytecode,
                0,
                0,
                cb);
        },
    ], function(err, ecCurve) {
        if (err) return cb(err);
        cb(null,ecCurve, compilationResult);
    });
};
