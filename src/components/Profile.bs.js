// Generated by ReScript, PLEASE EDIT WITH CARE

import * as X from "../X.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Context from "../state/Context.bs.js";
import * as Belenios from "../Belenios.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as ElectionList from "./shared/ElectionList.bs.js";
import * as ReactNative from "react-native";
import * as ReactNativePaper from "react-native-paper";

function Profile(Props) {
  var match = Context.use(undefined);
  var dispatch = match[1];
  var state = match[0];
  var user_id = Belt_Option.getWithDefault(Belt_Option.flatMap(state.user, (function (user) {
              return user.id;
            })), 0);
  var elections = Belt_Array.keep(state.elections, (function (election) {
          return election.administrator_id === user_id;
        }));
  var elections$1 = Belt_Array.keep(state.elections, (function (election) {
          return Belt_Array.some(state.trustees, (function (trustee) {
                        var election_trustees = election.trustees;
                        var election_pubkey = election_trustees !== undefined ? Belenios.Trustees.pubkey(election_trustees) : "";
                        return election_pubkey === trustee.pubkey;
                      }));
        }));
  var elections$2 = Belt_Array.keep(state.elections, (function (election) {
          var creds = Belt_Option.getWithDefault(Belt_Option.map(election.creds, (function (prim) {
                      return JSON.parse(prim);
                    })), []);
          return Belt_Array.some(creds, (function (cred) {
                        return Belt_Array.some(state.tokens, (function (token) {
                                      return token.public === cred;
                                    }));
                      }));
        }));
  return React.createElement(ReactNative.View, {
              style: X.styles["margin-x"],
              children: null
            }, React.createElement(ReactNativePaper.Button, {
                  mode: "contained",
                  style: X.styles["margin-x"],
                  onPress: (function (param) {
                      Curry._1(dispatch, /* User_Logout */3);
                    }),
                  children: "Logout"
                }), React.createElement(ElectionList.make, {
                  title: "My elections (as administrator)",
                  elections: elections
                }), React.createElement(ElectionList.make, {
                  title: "My elections (as trustee)",
                  elections: elections$1
                }), React.createElement(ElectionList.make, {
                  title: "My elections (as voter)",
                  elections: elections$2
                }));
}

var make = Profile;

export {
  make ,
}
/* X Not a pure module */
