# ecsol

This is an implementation of ellipctic curve secp256k in 100% written in solidity.

### Benchmark

Calculate a public key from a private key takes about 800,000 gas.

### How to use.

The contract mainly has two methods:

    function publicKey(uint256 privKey) constant
        returns(uint256 qx, uint256 qy)

and

    function deriveKey(uint256 privKey, uint256 pubX, uint256 pubY) constant
        returns(uint256 qx, uint256 qy)

A deployed version of the library can be found here: [0x28dcd428e8125990f9e5fe1b82db0e3ed240711c](https://etherscan.io/address/0x28dcd428e8125990f9e5fe1b82db0e3ed240711c#code)

    var ecsolAbi = '[{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"z1","type":"uint256"},{"name":"x2","type":"uint256"},{"name":"z2","type":"uint256"}],"name":"_jAdd","outputs":[{"name":"x3","type":"uint256"},{"name":"z3","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"z1","type":"uint256"},{"name":"x2","type":"uint256"},{"name":"z2","type":"uint256"}],"name":"_jSub","outputs":[{"name":"x3","type":"uint256"},{"name":"z3","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"z1","type":"uint256"},{"name":"x2","type":"uint256"},{"name":"z2","type":"uint256"}],"name":"_jMul","outputs":[{"name":"x3","type":"uint256"},{"name":"z3","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"z1","type":"uint256"},{"name":"x2","type":"uint256"},{"name":"z2","type":"uint256"}],"name":"_jDiv","outputs":[{"name":"x3","type":"uint256"},{"name":"z3","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"privKey","type":"uint256"}],"name":"publicKey","outputs":[{"name":"qx","type":"uint256"},{"name":"qy","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"}],"name":"_inverse","outputs":[{"name":"invA","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"d","type":"uint256"},{"name":"x1","type":"uint256"},{"name":"y1","type":"uint256"},{"name":"z1","type":"uint256"}],"name":"_ecMul","outputs":[{"name":"x3","type":"uint256"},{"name":"y3","type":"uint256"},{"name":"z3","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"y1","type":"uint256"},{"name":"z1","type":"uint256"},{"name":"x2","type":"uint256"},{"name":"y2","type":"uint256"},{"name":"z2","type":"uint256"}],"name":"_ecAdd","outputs":[{"name":"x3","type":"uint256"},{"name":"y3","type":"uint256"},{"name":"z3","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"privKey","type":"uint256"},{"name":"pubX","type":"uint256"},{"name":"pubY","type":"uint256"}],"name":"deriveKey","outputs":[{"name":"qx","type":"uint256"},{"name":"qy","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"y1","type":"uint256"},{"name":"z1","type":"uint256"}],"name":"_ecDouble","outputs":[{"name":"x3","type":"uint256"},{"name":"y3","type":"uint256"},{"name":"z3","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]

    var ecsol = eth.contract(ecsolAbi).at('0x28dcd428e8125990f9e5fe1b82db0e3ed240711c')
