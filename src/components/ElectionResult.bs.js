// Generated by ReScript, PLEASE EDIT WITH CARE

import * as X from "../X.bs.js";
import * as State from "../state/State.bs.js";
import * as React from "react";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as ReactNative from "react-native";
import * as ReactNativePaper from "react-native-paper";

function getResultN(results, i) {
  return Belt_Option.getExn(Belt_Array.get(Belt_Option.getExn(Belt_Array.get(results.result, 0)), i));
}

function ElectionResult(Props) {
  var match = State.useContexts(undefined);
  var state = match[0];
  var tmp;
  if (state.election.result !== "") {
    var results = JSON.parse(state.election.result);
    tmp = React.createElement(ReactNativePaper.List.Section, {
          title: "Resultats",
          children: Belt_Array.mapWithIndex(state.election.choices, (function (i, choice) {
                  return React.createElement(ReactNativePaper.List.Item, {
                              title: choice.name,
                              left: (function (param) {
                                  return React.createElement(ReactNativePaper.List.Icon, {
                                              icon: "account"
                                            });
                                }),
                              right: (function (param) {
                                  return React.createElement(ReactNativePaper.Text, {
                                              children: String(getResultN(results, i))
                                            });
                                })
                            });
                }))
        });
  } else {
    tmp = "The election is not closed yet";
  }
  return React.createElement(ReactNative.View, {
              children: null
            }, React.createElement(ReactNativePaper.Title, {
                  style: X.styles.title,
                  children: state.election.name
                }), tmp);
}

var make = ElectionResult;

export {
  getResultN ,
  make ,
}
/* X Not a pure module */
