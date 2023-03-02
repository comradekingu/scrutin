// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Sjcl from "../helpers/Sjcl.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as SjclWithAll from "sjcl-with-all";
import * as AsyncStorage from "@react-native-async-storage/async-storage";

var storageKey = "transactions";

function fetch_all(param) {
  return AsyncStorage.default.getItem(storageKey).then(function (prim) {
                  if (prim === null) {
                    return ;
                  } else {
                    return Caml_option.some(prim);
                  }
                }).then(function (__x) {
                return Belt_Option.map(__x, (function (prim) {
                              return JSON.parse(prim);
                            }));
              }).then(function (__x) {
              return Belt_Option.getWithDefault(__x, []);
            });
}

function store_all(txs) {
  AsyncStorage.default.setItem(storageKey, JSON.stringify(txs));
}

function clear(param) {
  AsyncStorage.default.removeItem(storageKey);
}

function hash(str) {
  return SjclWithAll.codec.hex.fromBits(SjclWithAll.hash.sha256.hash(str));
}

function sig(hexSecretKey, hexStr) {
  var secretKey = Curry._1(Sjcl.Ecdsa.SecretKey.fromHex, hexSecretKey);
  var baEventHash = SjclWithAll.codec.hex.toBits(hexStr);
  return SjclWithAll.codec.hex.fromBits(secretKey.sign(baEventHash));
}

function make(election, owner) {
  var $$event = JSON.stringify(election);
  var eventHash = SjclWithAll.codec.hex.fromBits(SjclWithAll.hash.sha256.hash($$event));
  return {
          event: $$event,
          eventType: "election",
          eventHash: eventHash,
          publicKey: owner.hexPublicKey,
          signature: sig(eventHash, Belt_Option.getExn(owner.hexSecretKey))
        };
}

function unwrap(tx) {
  return JSON.parse(tx.event);
}

var SignedElection = {
  make: make,
  unwrap: unwrap
};

export {
  storageKey ,
  fetch_all ,
  store_all ,
  clear ,
  hash ,
  sig ,
  SignedElection ,
}
/* Sjcl Not a pure module */
