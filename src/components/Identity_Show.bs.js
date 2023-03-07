// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Context from "../state/Context.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_MapString from "rescript/lib/es6/belt_MapString.js";
import * as ReactNativePaper from "react-native-paper";

function Identity_Show(Props) {
  var publicKey = Props.publicKey;
  var match = Context.use(undefined);
  var dispatch = match[1];
  var state = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement(ReactNativePaper.List.Section, {
                  title: "Identity",
                  children: null
                }, React.createElement(ReactNativePaper.List.Item, {
                      title: "Public Key",
                      description: publicKey
                    }), React.createElement(ReactNativePaper.List.Section, {
                      title: "Elections",
                      children: Belt_Array.map(Belt_MapString.toArray(Belt_MapString.keep(state.cache.elections, (function (_eventHash, election) {
                                      return election.ownerPublicKey === publicKey;
                                    }))), (function (param) {
                              var eventHash = param[0];
                              return React.createElement(ReactNativePaper.List.Item, {
                                          onPress: (function (param) {
                                              Curry._1(dispatch, {
                                                    TAG: /* Navigate */0,
                                                    _0: {
                                                      TAG: /* Election_Show */0,
                                                      _0: eventHash
                                                    }
                                                  });
                                            }),
                                          title: eventHash,
                                          key: eventHash
                                        });
                            }))
                    }), React.createElement(ReactNativePaper.List.Section, {
                      title: "Ballots",
                      children: Belt_Array.map(Belt_MapString.toArray(Belt_MapString.keep(state.cache.ballots, (function (_eventHash, ballot) {
                                      return Belt_Array.some(ballot.owners, (function (id) {
                                                    return id === publicKey;
                                                  }));
                                    }))), (function (param) {
                              var eventHash = param[0];
                              return React.createElement(ReactNativePaper.List.Item, {
                                          title: eventHash,
                                          key: eventHash
                                        });
                            }))
                    })));
}

var make = Identity_Show;

export {
  make ,
}
/* react Not a pure module */
