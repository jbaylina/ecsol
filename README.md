# ecsol

This implementation of ellipctic curve secp256k in solidity.

### How to use.

The contract mainly has two methods:

    function publicKey(uint256 privKey) constant
        returns(uint256 qx, uint256 qy)

and

    function deriveKey(uint256 privKey, uint256 pubX, uint256 pubY) constant
        returns(uint256 qx, uint256 qy)
