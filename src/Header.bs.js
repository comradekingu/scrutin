// Generated by ReScript, PLEASE EDIT WITH CARE

import * as State from "./state/State.bs.js";
import * as React from "react";
import * as UseTea from "rescript-use-tea/src/UseTea.bs.js";
import * as ReactNativePaper from "react-native-paper";

function Header(Props) {
  UseTea.useTea(State.reducer, State.initial);
  return React.createElement(ReactNativePaper.Appbar.Header, {
              children: React.createElement(ReactNativePaper.Appbar.Content, {
                    title: "Verifiable secret voting"
                  })
            });
}

var make = Header;

export {
  make ,
}
/* State Not a pure module */
