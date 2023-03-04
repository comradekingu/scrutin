// Generated by ReScript, PLEASE EDIT WITH CARE

import * as SjclWithAll from "sjcl-with-all";

var Bn = {};

var BitArray = {};

var Hex = {};

var Utf8String = {};

var Sha256 = {};

var Misc = {};

var Aes = {};

var Cipher = {
  Aes: Aes
};

var CCM = {};

var Mode = {
  CCM: CCM
};

var Random = {};

var Curve = {};

var Point = {};

var Ecc = {
  Curve: Curve,
  Point: Point
};

function verify(hash, signature) {
  return hash.verify(signature, undefined);
}

var PublicKey = {
  verify: verify
};

function sign(hash, paranoia) {
  return hash.sign(paranoia, undefined, undefined);
}

var SecretKey = {
  sign: sign
};

function generateKeys(param) {
  return SjclWithAll.ecc.ecdsa.generateKeys(undefined, undefined, undefined);
}

var Ecdsa = {
  PublicKey: PublicKey,
  SecretKey: SecretKey,
  generateKeys: generateKeys
};

export {
  Bn ,
  BitArray ,
  Hex ,
  Utf8String ,
  Sha256 ,
  Misc ,
  Cipher ,
  Mode ,
  Random ,
  Ecc ,
  Ecdsa ,
}
/* sjcl-with-all Not a pure module */
