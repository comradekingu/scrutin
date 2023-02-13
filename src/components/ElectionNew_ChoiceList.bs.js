// Generated by ReScript, PLEASE EDIT WITH CARE

import * as X from "../X.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Context from "../state/Context.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as ReactNative from "react-native";
import * as ReactNativePaper from "react-native-paper";
import * as ElectionNew_ChoiceItem from "./ElectionNew_ChoiceItem.bs.js";

function ElectionNew_ChoiceList(Props) {
  var match = Context.use(undefined);
  var dispatch = match[1];
  var state = match[0];
  var match$1 = React.useState(function () {
        return "";
      });
  var setName = match$1[1];
  var name = match$1[0];
  var match$2 = React.useState(function () {
        return false;
      });
  var setshowModal = match$2[1];
  var addChoice = function (param) {
    Curry._1(dispatch, {
          TAG: /* Election_AddChoice */5,
          _0: name
        });
    Curry._1(setName, (function (param) {
            return "";
          }));
  };
  var onSubmit = function (param) {
    addChoice(undefined);
    Curry._1(setshowModal, (function (param) {
            return false;
          }));
  };
  return React.createElement(React.Fragment, undefined, React.createElement(X.Row.make, {
                  children: null
                }, React.createElement(X.Col.make, {
                      children: React.createElement(ReactNativePaper.Text, {
                            style: X.styles.title,
                            children: "Choix"
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
                            children: "Nouveau"
                          })
                    })), React.createElement(ReactNative.View, {
                  children: Belt_Array.mapWithIndex(state.election.choices, (function (i, choice) {
                          return React.createElement(ElectionNew_ChoiceItem.make, {
                                      index: i,
                                      choice: choice,
                                      key: String(i)
                                    });
                        }))
                }), React.createElement(ReactNativePaper.HelperText, {
                  style: X.styles.center,
                  visible: state.election.choices.length < 2,
                  type: "error",
                  children: "Il faut au moins 2 choix !"
                }), React.createElement(ReactNativePaper.Portal, {
                  children: React.createElement(ReactNativePaper.Modal, {
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
                              children: null
                            }, React.createElement(ReactNativePaper.TextInput, {
                                  mode: "flat",
                                  label: "Nom du choix",
                                  value: name,
                                  onChangeText: (function (text) {
                                      Curry._1(setName, (function (param) {
                                              return text;
                                            }));
                                    }),
                                  onSubmitEditing: onSubmit
                                }), React.createElement(X.Row.make, {
                                  children: null
                                }, React.createElement(X.Col.make, {
                                      children: React.createElement(ReactNativePaper.Button, {
                                            onPress: (function (param) {
                                                Curry._1(setName, (function (param) {
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
                                            onPress: onSubmit,
                                            children: "Ajouter"
                                          })
                                    })))
                      })
                }));
}

var make = ElectionNew_ChoiceList;

export {
  make ,
}
/* X Not a pure module */
