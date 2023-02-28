// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Context from "./state/Context.bs.js";
import * as ReactNativePaper from "react-native-paper";

function Navigation(Props) {
  var match = Context.use(undefined);
  var dispatch = match[1];
  var match$1 = React.useState(function () {
        return 0;
      });
  var setIndex = match$1[1];
  return React.createElement(ReactNativePaper.BottomNavigation, {
              onIndexChange: (function (i) {
                  switch (i) {
                    case 0 :
                        Curry._1(dispatch, {
                              TAG: /* Navigate */0,
                              _0: /* Home_Elections */0
                            });
                        break;
                    case 1 :
                        Curry._1(dispatch, {
                              TAG: /* Navigate */0,
                              _0: /* Home_Identities */1
                            });
                        break;
                    case 2 :
                        Curry._1(dispatch, {
                              TAG: /* Navigate */0,
                              _0: /* Home_Transactions */2
                            });
                        break;
                    default:
                      
                  }
                  Curry._1(setIndex, (function (param) {
                          return i;
                        }));
                }),
              renderScene: (function (o) {
                  return React.createElement(ReactNativePaper.Text, {
                              children: o.route.title
                            });
                }),
              navigationState: {
                index: match$1[0],
                routes: [
                  {
                    key: "elections",
                    title: "Elections",
                    icon: "vote",
                    accessibilityLabel: undefined,
                    badge: undefined,
                    color: undefined,
                    testID: undefined
                  },
                  {
                    key: "identities",
                    title: "Identities",
                    icon: "account",
                    accessibilityLabel: undefined,
                    badge: undefined,
                    color: undefined,
                    testID: undefined
                  },
                  {
                    key: "transactions",
                    title: "Transactions",
                    icon: "thing",
                    accessibilityLabel: undefined,
                    badge: undefined,
                    color: undefined,
                    testID: undefined
                  }
                ]
              }
            });
}

var make = Navigation;

export {
  make ,
}
/* react Not a pure module */
