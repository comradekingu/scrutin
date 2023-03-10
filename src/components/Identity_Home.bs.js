// Generated by ReScript, PLEASE EDIT WITH CARE

import * as X from "../helpers/X.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Context from "../helpers/Context.bs.js";
import * as Identity from "../model/Identity.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as ReactNative from "react-native";
import * as ReactNativePaper from "react-native-paper";

function Identity_Home$Modal_Import(Props) {
  var visible = Props.visible;
  var setVisible = Props.setVisible;
  var onImport = Props.onImport;
  var match = React.useState(function () {
        return "";
      });
  var setImportedPrivateKey = match[1];
  var importedPrivateKey = match[0];
  return React.createElement(ReactNativePaper.Portal, {
              children: React.createElement(ReactNativePaper.Modal, {
                    visible: visible,
                    onDismiss: (function (param) {
                        Curry._1(setVisible, (function (param) {
                                return false;
                              }));
                      }),
                    children: React.createElement(ReactNative.View, {
                          style: ReactNative.StyleSheet.flatten([
                                X.styles.modal,
                                X.styles.layout
                              ]),
                          testID: "choice-modal",
                          children: null
                        }, React.createElement(ReactNativePaper.TextInput, {
                              mode: "flat",
                              autoFocus: true,
                              label: "Private key",
                              value: importedPrivateKey,
                              onChangeText: (function (text) {
                                  Curry._1(setImportedPrivateKey, (function (param) {
                                          return text;
                                        }));
                                }),
                              onSubmitEditing: (function (param) {
                                  Curry._1(onImport, importedPrivateKey);
                                  Curry._1(setVisible, (function (param) {
                                          return false;
                                        }));
                                }),
                              testID: "input-import-private-key"
                            }), React.createElement(ReactNativePaper.Button, {
                              mode: "contained",
                              onPress: (function (param) {
                                  Curry._1(onImport, importedPrivateKey);
                                  Curry._1(setVisible, (function (param) {
                                          return false;
                                        }));
                                }),
                              children: "Ajouter"
                            }))
                  })
            });
}

var Modal_Import = {
  make: Identity_Home$Modal_Import
};

function Identity_Home(Props) {
  var match = Context.use(undefined);
  var dispatch = match[1];
  var match$1 = React.useState(function () {
        return false;
      });
  var setVisibleImportModal = match$1[1];
  return React.createElement(React.Fragment, undefined, React.createElement(X.Title.make, {
                  children: "Identités"
                }), React.createElement(ReactNativePaper.List.Section, {
                  title: "",
                  children: Belt_Array.map(match[0].ids, (function (id) {
                          return React.createElement(ReactNativePaper.Card, {
                                      children: React.createElement(ReactNativePaper.List.Item, {
                                            onPress: (function (param) {
                                                Curry._1(dispatch, {
                                                      TAG: /* Navigate */0,
                                                      _0: {
                                                        TAG: /* Identity_Show */1,
                                                        _0: id.hexPublicKey
                                                      }
                                                    });
                                              }),
                                            title: "0x" + id.hexPublicKey
                                          }),
                                      key: id.hexPublicKey
                                    });
                        })),
                  style: X.styles["margin-x"]
                }), React.createElement(X.Title.make, {
                  children: "-"
                }), React.createElement(ReactNativePaper.Button, {
                  mode: "contained",
                  onPress: (function (param) {
                      Curry._1(dispatch, {
                            TAG: /* Identity_Add */1,
                            _0: Identity.make(undefined)
                          });
                    }),
                  children: "Generate identity"
                }), React.createElement(X.Title.make, {
                  children: "-"
                }), React.createElement(ReactNativePaper.Button, {
                  mode: "contained",
                  onPress: (function (param) {
                      Curry._1(setVisibleImportModal, (function (param) {
                              return true;
                            }));
                    }),
                  children: "Import identity"
                }), React.createElement(X.Title.make, {
                  children: "-"
                }), React.createElement(ReactNativePaper.Button, {
                  mode: "outlined",
                  onPress: (function (param) {
                      Identity.clear(undefined);
                      Curry._1(dispatch, /* Reset */0);
                    }),
                  children: "Clear identities"
                }), React.createElement(X.Title.make, {
                  children: "-"
                }), React.createElement(Identity_Home$Modal_Import, {
                  visible: match$1[0],
                  setVisible: setVisibleImportModal,
                  onImport: (function (hexSecretKey) {
                      Curry._1(dispatch, {
                            TAG: /* Identity_Add */1,
                            _0: Identity.make2(hexSecretKey)
                          });
                    })
                }));
}

var make = Identity_Home;

export {
  Modal_Import ,
  make ,
}
/* X Not a pure module */
