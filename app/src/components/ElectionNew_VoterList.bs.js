// Generated by ReScript, PLEASE EDIT WITH CARE

import * as X from "../X.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Context from "../state/Context.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as ReactNative from "react-native";
import * as EmailValidator from "email-validator";
import * as ReactNativePaper from "react-native-paper";
import * as ElectionNew_VoterItem from "./ElectionNew_VoterItem.bs.js";

function ElectionNew_VoterList(Props) {
  var match = Context.use(undefined);
  var dispatch = match[1];
  var state = match[0];
  var match$1 = React.useState(function () {
        return "";
      });
  var setEmail = match$1[1];
  var email = match$1[0];
  var match$2 = React.useState(function () {
        return false;
      });
  var setshowModal = match$2[1];
  var match$3 = React.useState(function () {
        return false;
      });
  var setVisibleError = match$3[1];
  var addVoter = function (param) {
    if (EmailValidator.validate(email)) {
      Curry._1(dispatch, {
            TAG: /* Election_AddVoter */3,
            _0: email
          });
      Curry._1(setEmail, (function (param) {
              return "";
            }));
      return Curry._1(setshowModal, (function (param) {
                    return false;
                  }));
    } else {
      return Curry._1(setVisibleError, (function (param) {
                    return true;
                  }));
    }
  };
  return React.createElement(ReactNative.View, {
              testID: "voter-list",
              children: null
            }, React.createElement(X.Row.make, {
                  children: null
                }, React.createElement(X.Col.make, {
                      children: React.createElement(ReactNativePaper.Text, {
                            style: X.styles.title,
                            children: "Voters"
                          })
                    }), React.createElement(X.Col.make, {
                      children: React.createElement(ReactNativePaper.Text, {
                            children: ""
                          })
                    }), React.createElement(X.Col.make, {
                      children: React.createElement(ReactNativePaper.Button, {
                            mode: "contained",
                            onPress: (function (param) {
                                Curry._1(setshowModal, (function (param) {
                                        return true;
                                      }));
                              }),
                            children: "Ajouter"
                          })
                    })), React.createElement(ReactNative.View, {
                  children: Belt_Array.mapWithIndex(state.election.voters, (function (index, voter) {
                          return React.createElement(ElectionNew_VoterItem.make, {
                                      index: index,
                                      voter: voter,
                                      key: voter.email
                                    });
                        }))
                }), React.createElement(ReactNativePaper.HelperText, {
                  style: X.styles.center,
                  visible: state.election.voters.length < 1,
                  type: "error",
                  children: "Il faut au moins 1 votant !"
                }), React.createElement(ReactNativePaper.Portal, {
                  children: null
                }, React.createElement(ReactNativePaper.Modal, {
                      visible: match$2[0],
                      onDismiss: (function (param) {
                          Curry._1(setshowModal, (function (param) {
                                  return false;
                                }));
                        }),
                      children: React.createElement(ReactNative.View, {
                            style: ReactNative.StyleSheet.flatten([
                                  X.styles.modal,
                                  X.styles.layout
                                ]),
                            testID: "voter-modal",
                            children: null
                          }, React.createElement(ReactNativePaper.TextInput, {
                                mode: "flat",
                                autoFocus: true,
                                label: "Email du participant",
                                value: email,
                                onChangeText: (function (text) {
                                    Curry._1(setEmail, (function (param) {
                                            return text;
                                          }));
                                  }),
                                onSubmitEditing: addVoter,
                                testID: "voter-email"
                              }), React.createElement(X.Row.make, {
                                children: null
                              }, React.createElement(X.Col.make, {
                                    children: React.createElement(ReactNativePaper.Button, {
                                          onPress: (function (param) {
                                              Curry._1(setEmail, (function (param) {
                                                      return "";
                                                    }));
                                              Curry._1(setshowModal, (function (param) {
                                                      return false;
                                                    }));
                                            }),
                                          children: "Retour"
                                        })
                                  }), React.createElement(X.Col.make, {
                                    children: React.createElement(ReactNativePaper.Button, {
                                          mode: "contained",
                                          onPress: addVoter,
                                          children: "Ajouter"
                                        })
                                  })))
                    }), React.createElement(ReactNativePaper.Snackbar, {
                      onDismiss: (function (param) {
                          Curry._1(setVisibleError, (function (param) {
                                  return false;
                                }));
                        }),
                      visible: match$3[0],
                      children: "Invalid email"
                    })));
}

var make = ElectionNew_VoterList;

export {
  make ,
}
/* X Not a pure module */
