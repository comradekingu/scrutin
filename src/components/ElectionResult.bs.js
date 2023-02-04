// Generated by ReScript, PLEASE EDIT WITH CARE

import * as X from "../X.bs.js";
import * as State from "../state/State.bs.js";
import * as React from "react";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as ReactNative from "react-native";
import * as ReactNativePaper from "react-native-paper";

function ElectionResult(Props) {
  var match = State.useContexts(undefined);
  var state = match[0];
  React.useState(function () {
        
      });
  React.useState(function () {
        return false;
      });
  String(state.election.ballots.length);
  String(Belt_Array.keep(state.election.ballots, (function (ballot) {
              return ballot.ciphertext !== "";
            })).length);
  var tmp;
  if (state.election.result !== "") {
    var results = JSON.parse(state.election.result);
    console.log(results);
    tmp = "" + String(Belt_Option.getExn(Belt_Array.get(Belt_Option.getExn(Belt_Array.get(results.result, 0)), 0))) + " vs " + String(Belt_Option.getExn(Belt_Array.get(Belt_Option.getExn(Belt_Array.get(results.result, 0)), 1))) + "";
  } else {
    tmp = "The election is not closed yet";
  }
  return React.createElement(ReactNative.View, {
              children: null
            }, React.createElement(ReactNativePaper.Title, {
                  style: X.styles.title,
                  children: state.election.name
                }), React.createElement(ReactNativePaper.Title, {
                  style: X.styles.subtitle,
                  children: tmp
                }));
}

var make = ElectionResult;

export {
  make ,
}
/* X Not a pure module */