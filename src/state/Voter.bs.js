// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Json_Decode$JsonCombinators from "rescript-json-combinators/src/Json_Decode.bs.js";

var from_json = Json_Decode$JsonCombinators.object(function (field) {
      return {
              id: field.required("id", Json_Decode$JsonCombinators.$$int),
              email: field.required("email", Json_Decode$JsonCombinators.string),
              privCred: field.required("priv_cred", Json_Decode$JsonCombinators.string)
            };
    });

function to_json(r) {
  return {
          id: r.id,
          email: r.email,
          priv_cred: r.privCred
        };
}

export {
  from_json ,
  to_json ,
}
/* from_json Not a pure module */
