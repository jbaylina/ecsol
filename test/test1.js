/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
"use strict";

var verbose = false;

var ecCurveHelper = require('../js/eccurve_helper.js');
var ethConnector = require('../js/eth_connector');
var assert = require("assert"); // node.js core module
var async = require('async');
var _ = require('lodash');
var BigNumber = require('bignumber.js');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

var n = new BigNumber('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F', 16);
var gx = new BigNumber('79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798', 16);
var gy = new BigNumber('483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8', 16);

function log(S) {
    if (verbose) {
        console.log(S);
    }
}

describe('ECCurve Test', function(){
    var ecCurve;
    before(function(done) {
        ethConnector.init('testrpc',done);
    });
    it('should deploy a ecCurve ', function(done){
        this.timeout(20000);
        ecCurveHelper.deployECCurve({}, function(err, _ecCurve) {
            assert.ifError(err);
            assert.ok(_ecCurve.address);
            ecCurve = _ecCurve;
            done();
        });
    });
    it('Should Add two small numbers', function(done) {
        var x1 = new BigNumber(2);
        var z1 = new BigNumber(3);
        var x2 = new BigNumber(4);
        var z2 = new BigNumber(5);
        ecCurve._jAdd(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "22");
            assert.equal(z3.toString(10), "15");
            done();
        });
    });
    it('Should Add one big numbers with one small', function(done) {
        var x1 = n.sub(1);
        var z1 = new BigNumber(1);
        var x2 = new BigNumber(2);
        var z2 = new BigNumber(1);
        ecCurve._jAdd(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "1");
            assert.equal(z3.toString(10), "1");
            done();
        });
    });
    it('Should Add two big numbers', function(done) {
        var x1 = n.sub(1);
        var z1 = new BigNumber(1);
        var x2 = n.sub(2);
        var z2 = new BigNumber(1);
        ecCurve._jAdd(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), n.sub(3).toString(10));
            assert.equal(z3.toString(10), "1");
            done();
        });
    });
    it('Should Substract two small numbers', function(done) {
        var x1 = new BigNumber(2);
        var z1 = new BigNumber(3);
        var x2 = new BigNumber(4);
        var z2 = new BigNumber(5);
        ecCurve._jSub(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), n.sub(2).toString(10));
            assert.equal(z3.toString(10), "15");
            done();
        });
    });
    it('Should Substract one big numbers with one small', function(done) {
        var x1 = new BigNumber(2);
        var z1 = new BigNumber(1);
        var x2 = n.sub(1);
        var z2 = new BigNumber(1);
        ecCurve._jSub(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "3");
            assert.equal(z3.toString(10), "1");
            done();
        });
    });
    it('Should Substract two big numbers', function(done) {
        var x1 = n.sub(2);
        var z1 = new BigNumber(1);
        var x2 = n.sub(1);
        var z2 = new BigNumber(1);
        ecCurve._jSub(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), n.sub(1).toString(10));
            assert.equal(z3.toString(10), "1");
            done();
        });
    });
    it('Should Substract two same numbers', function(done) {
        var x1 = n.sub(16);
        var z1 = new BigNumber(1);
        var x2 = n.sub(16);
        var z2 = new BigNumber(1);
        ecCurve._jSub(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "0");
            assert.equal(z3.toString(10), "1");
            done();
        });
    });
    it('Should Multiply two small numbers', function(done) {
        var x1 = new BigNumber(2);
        var z1 = new BigNumber(3);
        var x2 = new BigNumber(4);
        var z2 = new BigNumber(5);
        ecCurve._jMul(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "8");
            assert.equal(z3.toString(10), "15");
            done();
        });
    });
    it('Should Multiply one big numbers with one small', function(done) {
        var x1 = n.sub(1);
        var z1 = new BigNumber(1);
        var x2 = new BigNumber(2);
        var z2 = new BigNumber(1);
        ecCurve._jMul(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), n.sub(2).toString(10));
            assert.equal(z3.toString(10), "1");
            done();
        });
    });
    it('Should Multiply two big numbers', function(done) {
        var x1 = n.sub(2);
        var z1 = new BigNumber(1);
        var x2 = n.sub(3);
        var z2 = new BigNumber(1);
        ecCurve._jMul(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "6");
            assert.equal(z3.toString(10), "1");
            done();
        });
    });
    it('Should Multiply one is zero', function(done) {
        var x1 = new BigNumber(2);
        var z1 = new BigNumber(3);
        var x2 = new BigNumber(0);
        var z2 = new BigNumber(5);
        ecCurve._jMul(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "0");
            assert.equal(z3.toString(10), "15");
            done();
        });
    });
    it('Should Divide two small numbers', function(done) {
        var x1 = new BigNumber(2);
        var z1 = new BigNumber(3);
        var x2 = new BigNumber(4);
        var z2 = new BigNumber(5);
        ecCurve._jDiv(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "10");
            assert.equal(z3.toString(10), "12");
            done();
        });
    });
    it('Should Divide one big numbers with one small', function(done) {
        var x1 = n.sub(1);
        var z1 = new BigNumber(1);
        var x2 = new BigNumber(2);
        var z2 = new BigNumber(1);
        ecCurve._jDiv(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), n.sub(1).toString(10));
            assert.equal(z3.toString(10), "2");
            done();
        });
    });
    it('Should Divide two big numbers', function(done) {
        var x1 = n.sub(2);
        var z1 = new BigNumber(1);
        var x2 = n.sub(3);
        var z2 = new BigNumber(1);
        ecCurve._jDiv(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), n.sub(2).toString(10));
            assert.equal(z3.toString(10), n.sub(3).toString(10));
            done();
        });
    });
    it('Should Divide one is zero', function(done) {
        var x1 = new BigNumber(2);
        var z1 = new BigNumber(3);
        var x2 = new BigNumber(0);
        var z2 = new BigNumber(5);
        ecCurve._jDiv(x1,z1,x2,z2, function(err, res) {
            assert.ifError(err);
            var x3 = res[0];
            var z3 = res[1];
            assert.equal(x3.toString(10), "10");
            assert.equal(z3.toString(10), "0");
            done();
        });
    });
    it('Should Calculate inverse', function(done) {
        var d = new BigNumber(2);
        ecCurve._inverse(d, function(err, inv) {
            assert.ifError(err);
            ecCurve._jMul(d,1,inv,1, function(err, res) {
                assert.ifError(err);
                var x3 = res[0];
                var z3 = res[1];
                assert.equal(x3.toString(10), "1");
                assert.equal(z3.toString(10), "1");
                done();
            });
        });
    });
    it('Inverse of 0', function(done) {
        var d = new BigNumber(0);
        ecCurve._inverse(d, function(err, inv) {
            assert.ifError(err);
            assert.equal(inv.toString(10), "0");
            done();
        });
    });
    it('Inverse of 1', function(done) {
        var d = new BigNumber(1);
        ecCurve._inverse(d, function(err, inv) {
            assert.ifError(err);
            assert.equal(inv.toString(10), "1");
            done();
        });
    });
    it('Should Calculate inverse -1', function(done) {
        var d = n.sub(1);
        ecCurve._inverse(d, function(err, inv) {
            assert.ifError(err);
            ecCurve._jMul(d,1,inv,1, function(err, res) {
                assert.ifError(err);
                var x3 = res[0];
                var z3 = res[1];
                assert.equal(x3.toString(10), "1");
                assert.equal(z3.toString(10), "1");
                done();
            });
        });
    });
    it('Should Calculate inverse -2', function(done) {
        var d = n.sub(1);
        ecCurve._inverse(d, function(err, inv) {
            assert.ifError(err);
            ecCurve._jMul(d,1,inv,1, function(err, res) {
                assert.ifError(err);
                var x3 = res[0];
                var z3 = res[1];
                assert.equal(x3.toString(10), "1");
                assert.equal(z3.toString(10), "1");
                done();
            });
        });
    });
    it('Should Calculate inverse big number', function(done) {
        var d = new BigNumber('f167a208bea79bc52668c016aff174622837f780ab60f59dfed0a8e66bb7c2ad',16);
        ecCurve._inverse(d, function(err, inv) {
            assert.ifError(err);
            ecCurve._jMul(d,1,inv,1, function(err, res) {
                assert.ifError(err);
                var x3 = res[0];
                var z3 = res[1];
                assert.equal(x3.toString(10), "1");
                assert.equal(z3.toString(10), "1");
                done();
            });
        });
    });
    it('Should double gx,gy', function(done) {
        var ln = gx.mul(gx).mul(3);
        var ld = gy.mul(2);

        ln = ln.mod(n);
        ld = ld.mod(n);

        log("ln: " + ln.toString(10));
        log("ld: " + ld.toString(10));


        var x2ccN = ln.mul(ln);
        var x2ccD = ld.mul(ld);

        x2ccN = x2ccN.sub(gx.mul(2).mul(x2ccD));

        x2ccN = x2ccN.mod(n);
        if (x2ccN.lessThan(0)) x2ccN = x2ccN.add(n);
        x2ccD = x2ccD.mod(n);
        if (x2ccD.lessThan(0)) x2ccD = x2ccD.add(n);
        log("x2ccN: " + x2ccN.toString(10));
        log("x2ccD: " + x2ccD.toString(10));

/*
        var y2ccN;
        var y2ccD;

        y2ccN = gx.mul(x2ccD).sub(x2ccN);
        y2ccD = x2ccD;

        y2ccN = y2ccN.mul(ln);
        y2ccD = y2ccD.mul(ld);

        y2ccN = y2ccN.sub ( gy.mul(y2ccD));
*/

        var y2ccN;
        y2ccN  = gx.mul(x2ccD).mul(ln);
        y2ccN = y2ccN.sub( x2ccN.mul(ln) );
        y2ccN = y2ccN.sub( gy.mul(x2ccD).mul(ld) );

        var y2ccD;
        y2ccD  = x2ccD.mul(ld);

        y2ccN = y2ccN.mod(n);
        if (y2ccN.lessThan(0)) y2ccN = y2ccN.add(n);
        y2ccD = y2ccD.mod(n);
        if (y2ccD.lessThan(0)) y2ccD = y2ccD.add(n);
        log("y2ccN: " + y2ccN.toString(10));
        log("y2ccD: " + y2ccD.toString(10));


        var ccD = y2ccD.mul(x2ccD);
        x2ccN = x2ccN.mul(y2ccD);
        y2ccN = y2ccN.mul(x2ccD);

        x2ccN = x2ccN.mod(n);
        if (x2ccN.lessThan(0)) x2ccN = x2ccN.add(n);
        y2ccN = y2ccN.mod(n);
        if (y2ccN.lessThan(0)) y2ccN = y2ccN.add(n);
        ccD = ccD.mod(n);
        if (ccD.lessThan(0)) ccD = ccD.add(n);
        log("x2ccN: " + x2ccN.toString(10));
        log("y2ccN: " + y2ccN.toString(10));
        log("y2ccD: " + ccD.toString(10));


        ecCurve._ecDouble(gx, gy, 1, function(err, res) {
            assert.ifError(err);
            var x2 = res[0];
            var y2 = res[1];
            var z2 = res[2];
            log("x2: " + x2.toString(10));
            log("y2: " + y2.toString(10));
            log("z2: " + z2.toString(10));
            ecCurve._inverse(z2, function(err, inv) {
                assert.ifError(err);
                log("Inverse: " + inv.toString(10));
                log("Inv test: "+ inv.mul(z2).mod(n).toString(10));
                x2 = x2.mul(inv).mod(n);
                y2 = y2.mul(inv).mod(n);
                log("x2: " + x2.toString(10));
                log("y2: " + y2.toString(10));
                assert.equal(x2.toString(10), "89565891926547004231252920425935692360644145829622209833684329913297188986597");
                assert.equal(y2.toString(10), "12158399299693830322967808612713398636155367887041628176798871954788371653930");
                done();
            });
        });
    });
    it('Add EC', function(done) {
        log("Start Add");
        var x2 = new BigNumber('89565891926547004231252920425935692360644145829622209833684329913297188986597');
        var y2 = new BigNumber('12158399299693830322967808612713398636155367887041628176798871954788371653930');
        ecCurve._ecAdd(gx,gy,1,x2,y2,1, function(err, res) {
            var x3 = res[0];
            var y3 = res[1];
            var z3 = res[2];
            log("x3: " + x3.toString(10));
            log("y3: " + y3.toString(10));
            log("z3: " + z3.toString(10));
            ecCurve._inverse(z3, function(err, inv) {
                x3 = x3.mul(inv).mod(n);
                y3 = y3.mul(inv).mod(n);
                log("x3: " + x3.toString(10));
                log("y3: " + y3.toString(10));
                assert.equal(x3.toString(10), "112711660439710606056748659173929673102114977341539408544630613555209775888121");
                assert.equal(y3.toString(10), "25583027980570883691656905877401976406448868254816295069919888960541586679410");
                done();
            });
        });
    });


    it('2G+1G = 3G', function(done) {
        this.timeout(20000);
        ecCurve._ecDouble(gx, gy, 1, function(err, res) {
            assert.ifError(err);
            var x2 = res[0];
            var y2 = res[1];
            var z2 = res[2];
            log("x2: " + x2.toString(10));
            log("y2: " + y2.toString(10));
            log("z2: " + z2.toString(10));
            ecCurve._ecAdd(gx,gy, 1, x2,y2,z2, function(err,res) {
                assert.ifError(err);
                var x3 = res[0];
                var y3 = res[1];
                var z3 = res[2];
                log("x3: " + x3.toString(10));
                log("y3: " + y3.toString(10));
                log("z3: " + z3.toString(10));
                ecCurve._ecMul(3,gx,gy,1, function(err, res) {
                    assert.ifError(err);
                    var x3c = res[0];
                    var y3c = res[1];
                    var z3c = res[2];
                    log("x3c: " + x3c.toString(10));
                    log("y3c: " + y3c.toString(10));
                    log("z3c: " + z3c.toString(10));
                    ecCurve._inverse(z3, function(err, inv3) {
                        assert.ifError(err);
                        x3 = x3.mul(inv3).mod(n);
                        y3 = y3.mul(inv3).mod(n);
                        log("Inv test: "+ inv3.mul(z3).mod(n).toString(10));
                        log("x3n: " + x3.toString(10));
                        log("y3n: " + y3.toString(10));
                        ecCurve._inverse(z3c, function(err, inv3c) {
                            assert.ifError(err);
                            x3c = x3c.mul(inv3c).mod(n);
                            y3c = y3c.mul(inv3c).mod(n);
                            log("Inv test: "+ inv3c.mul(z3c).mod(n).toString(10));
                            log("x3cn: " + x3c.toString(10));
                            log("y3cn: " + y3c.toString(10));
                            assert.equal(x3.toString(10), x3c.toString(10));
                            assert.equal(y3.toString(10), y3c.toString(10));
                            done();
                        });
                    });
                });
            });
        });
    });

    it('Should create a valid public key', function(done) {
        this.timeout(20000);
        var key = ec.genKeyPair();
        var priv = key.getPrivate();
        var d = new BigNumber(priv.toString(16), 16);
        log(JSON.stringify(priv));
        var pub = key.getPublic();
        log(JSON.stringify(pub));
        var pub_x = new BigNumber(key.getPublic().x.toString(16), 16);
        var pub_y = new BigNumber(key.getPublic().y.toString(16), 16);
        log(d.toString(10));
        log(pub_x.toString(10));
        log(pub_y.toString(10));
        ecCurve.publicKey(d, function(err, res) {
            assert.ifError(err);
            var pub_x_calc = res[0];
            var pub_y_calc = res[1];
            assert.equal(pub_x.toString(10), pub_x_calc.toString(10));
            assert.equal(pub_y.toString(10), pub_y_calc.toString(10));
            done();
        });
    });

    it('Should consume few gas', function(done) {
        this.timeout(20000);
        var key = ec.genKeyPair();
        var d = new BigNumber(key.getPrivate().toString(16), 16);
        ecCurve.publicKey.estimateGas(d, function(err, gas) {
            assert.ifError(err);
            log("Estimate gas: " +gas);
            assert(gas<1000000,'Public key calculation should be lower that 1M');
            done();
        });
    });
    it('Key derived in both directions should be the same', function(done) {
        this.timeout(20000);
        var key1 = ec.genKeyPair();
        var key2 = ec.genKeyPair();
        var d1 = new BigNumber(key1.getPrivate().toString(16), 16);
        var d2 = new BigNumber(key2.getPrivate().toString(16), 16);
        var pub1_x = new BigNumber(key1.getPublic().x.toString(16), 16);
        var pub1_y = new BigNumber(key1.getPublic().y.toString(16), 16);
        var pub2_x = new BigNumber(key2.getPublic().x.toString(16), 16);
        var pub2_y = new BigNumber(key2.getPublic().y.toString(16), 16);
        ecCurve.deriveKey(d1, pub2_x, pub2_y, function(err, res) {
            assert.ifError(err);
            var k1_2x = res[0];
            var k1_2y = res[1];
            log("k1_2x:" + k1_2x.toString(10));
            log("k1_2y:" + k1_2y.toString(10));
            ecCurve.deriveKey(d2, pub1_x, pub1_y, function(err, res) {
                assert.ifError(err);
                var k2_1x = res[0];
                var k2_1y = res[1];
                log("k2_1x:" + k2_1x.toString(10));
                log("k2_1y:" + k2_1y.toString(10));
                assert.equal(k1_2x.toString(10), k2_1x.toString(10));
                assert.equal(k1_2y.toString(10), k2_1y.toString(10));
                done();
            });
        });
    });
    it('Should follow associative property', function(done) {
        this.timeout(20000);
        var key1 = ec.genKeyPair();
        var key2 = ec.genKeyPair();
        var d1 = new BigNumber(key1.getPrivate().toString(16), 16);
        var d2 = new BigNumber(key2.getPrivate().toString(16), 16);
        var pub1_x, pub1_y;
        var pub2_x, pub2_y;
        var pub12_x, pub12_y;
        var add12_x, add12_y;
        async.series([
            function(cb) {
                ecCurve.publicKey(d1, function(err, res) {
                    if (err) return cb(err);
                    pub1_x = res[0];
                    pub1_y = res[1];
                    log("pub1_x:" + pub1_x.toString(10));
                    log("pub1_y:" + pub1_y.toString(10));
                    cb();
                });
            },
            function(cb) {
                ecCurve.publicKey(d2, function(err, res) {
                    if (err) return cb(err);
                    pub2_x = res[0];
                    pub2_y = res[1];
                    log("pub2_x:" + pub2_x.toString(10));
                    log("pub2_y:" + pub2_y.toString(10));
                    cb();
                });
            },
            function(cb) {
                ecCurve.publicKey(d1.add(d2).mod(n), function(err, res) {
                    if (err) return cb(err);
                    pub12_x = res[0];
                    pub12_y = res[1];
                    log("pub12_x:" + pub12_x.toString(10));
                    log("pub12_y:" + pub12_y.toString(10));
                    cb();
                });
            },
            function(cb) {
                 ecCurve._ecAdd(pub1_x, pub1_y, 1, pub2_x, pub2_y, 1, function(err, res) {
                    if (err) return cb(err);
                    add12_x = res[0];
                    add12_y = res[1];

                    ecCurve._inverse(res[2], function(err, inv) {
                        if (err) return cb(err);
                        add12_x = add12_x.mul(inv).mod(n);
                        add12_y = add12_y.mul(inv).mod(n);
                        log("add12_x:" + add12_x.toString(10));
                        log("add12_y:" + add12_y.toString(10));
                        cb();
                    });
                });
            }
        ], function(err) {
            assert.ifError(err);
            assert.equal(pub12_x.toString(10), add12_x.toString(10));
            assert.equal(pub12_y.toString(10), add12_y.toString(10));
            done();
        });

    });
});
