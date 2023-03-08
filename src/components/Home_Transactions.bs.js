// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_exn from "rescript/lib/es6/js_exn.js";
import * as Context from "../Context.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Transaction from "../model/Transaction.bs.js";
import * as ReactNativePaper from "react-native-paper";

function Home_Transactions$Item(Props) {
  var tx = Props.tx;
  var match = Context.use(undefined);
  var dispatch = match[1];
  var onPress = function (param) {
    var match = tx.eventType;
    switch (match) {
      case "ballot" :
          return Curry._1(dispatch, {
                      TAG: /* Navigate */0,
                      _0: {
                        TAG: /* Ballot_Show */2,
                        _0: tx.eventHash
                      }
                    });
      case "election" :
          return Curry._1(dispatch, {
                      TAG: /* Navigate */0,
                      _0: {
                        TAG: /* Election_Show */0,
                        _0: tx.eventHash
                      }
                    });
      default:
        return Js_exn.raiseError("Unknown transaction type");
    }
  };
  return React.createElement(ReactNativePaper.List.Item, {
              onPress: onPress,
              title: "0x" + tx.eventHash,
              key: tx.eventHash
            });
}

var Item = {
  make: Home_Transactions$Item
};

function Home_Transactions(Props) {
  var match = Context.use(undefined);
  var dispatch = match[1];
  return React.createElement(ReactNativePaper.List.Section, {
              title: "Transactions",
              children: null
            }, Belt_Array.map(match[0].txs, (function (tx) {
                    return React.createElement(Home_Transactions$Item, {
                                tx: tx,
                                key: tx.eventHash
                              });
                  })), React.createElement(ReactNativePaper.Button, {
                  mode: "outlined",
                  onPress: (function (param) {
                      Transaction.clear(undefined);
                      Curry._1(dispatch, /* Init */0);
                    }),
                  children: "Clear"
                }));
}

var make = Home_Transactions;

export {
  Item ,
  make ,
}
/* react Not a pure module */
