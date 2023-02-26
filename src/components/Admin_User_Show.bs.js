// Generated by ReScript, PLEASE EDIT WITH CARE

import * as X from "../helpers/X.bs.js";
import * as React from "react";
import * as Config from "../helpers/Config.bs.js";
import * as ReactNativePaper from "react-native-paper";

function Admin_User_Show(Props) {
  var user = Props.user;
  var $$delete = function (param) {
    var dict = {};
    dict["email"] = user.email;
    X.post("" + Config.api_url + "/users/delete", dict);
  };
  var setAdmin = function (isAdmin) {
    var dict = {};
    dict["email"] = user.email;
    dict["admin"] = isAdmin;
    X.post("" + Config.api_url + "/users/update", dict);
  };
  return React.createElement(React.Fragment, undefined, React.createElement(ReactNativePaper.Title, {
                  style: X.styles.center,
                  children: user.email
                }), React.createElement(ReactNativePaper.Button, {
                  onPress: (function (param) {
                      setAdmin(true);
                    }),
                  children: "Promote admin"
                }), React.createElement(ReactNativePaper.Button, {
                  onPress: (function (param) {
                      setAdmin(false);
                    }),
                  children: "Demote admin"
                }), React.createElement(ReactNativePaper.Button, {
                  onPress: $$delete,
                  children: "Delete"
                }));
}

var make = Admin_User_Show;

export {
  make ,
}
/* X Not a pure module */