// Generated by ReScript, PLEASE EDIT WITH CARE

import * as X from "../X.bs.js";
import * as Effect from "./Effect.bs.js";
import * as Election from "./Election.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";

var initial_elections = [];

var initial = {
  election: Election.initial,
  elections: initial_elections,
  elections_loading: false,
  user: undefined,
  loading: false,
  route: /* Home */0
};

function reducer(state, action) {
  if (typeof action === "number") {
    switch (action) {
      case /* Init */0 :
          return [
                  {
                    election: state.election,
                    elections: state.elections,
                    elections_loading: true,
                    user: state.user,
                    loading: state.loading,
                    route: state.route
                  },
                  [
                    Effect.goToUrl,
                    Effect.loadElections,
                    Effect.tryRestoreUser
                  ]
                ];
      case /* Election_Post */1 :
          var partial_arg = Belt_Option.getExn(state.user);
          var partial_arg$1 = state.election;
          return [
                  state,
                  [(function (param) {
                        return Effect.createElection(partial_arg$1, partial_arg, param);
                      })]
                ];
      case /* User_Logout */2 :
          return [
                  {
                    election: state.election,
                    elections: state.elections,
                    elections_loading: state.elections_loading,
                    user: undefined,
                    loading: state.loading,
                    route: state.route
                  },
                  [Effect.storeRemoveUser]
                ];
      
    }
  } else {
    switch (action.TAG | 0) {
      case /* Election_PublishResult */0 :
          var result = action._0;
          var partial_arg$2 = state.election;
          return [
                  state,
                  [(function (param) {
                        return Effect.publishElectionResult(partial_arg$2, result, param);
                      })]
                ];
      case /* Election_Fetch */7 :
          var id = action._0;
          return [
                  {
                    election: {
                      id: id,
                      name: Election.initial.name,
                      voters: Election.initial.voters,
                      choices: Election.initial.choices,
                      ballots: Election.initial.ballots,
                      uuid: Election.initial.uuid,
                      params: Election.initial.params,
                      trustees: Election.initial.trustees,
                      creds: Election.initial.creds,
                      result: Election.initial.result
                    },
                    elections: state.elections,
                    elections_loading: state.elections_loading,
                    user: state.user,
                    loading: true,
                    route: state.route
                  },
                  [(function (param) {
                        return Effect.loadElection(id, param);
                      })]
                ];
      case /* Election_Load */8 :
          return [
                  {
                    election: Election.from_json(action._0),
                    elections: state.elections,
                    elections_loading: state.elections_loading,
                    user: state.user,
                    loading: false,
                    route: state.route
                  },
                  []
                ];
      case /* Election_LoadAll */9 :
          return [
                  {
                    election: state.election,
                    elections: Belt_Array.reverse(Belt_Array.map(action._0, Election.from_json)),
                    elections_loading: false,
                    user: state.user,
                    loading: state.loading,
                    route: state.route
                  },
                  []
                ];
      case /* Ballot_Create */10 :
          var selection = action._1;
          var token = action._0;
          var partial_arg$3 = state.election;
          return [
                  state,
                  [(function (param) {
                        return Effect.ballotCreate(partial_arg$3, token, selection, param);
                      })]
                ];
      case /* Navigate */11 :
          var route = action._0;
          if (typeof route === "number") {
            
          } else {
            X.setUrlPathname("/elections/" + String(route._0) + "");
          }
          var effects;
          if (typeof route === "number") {
            effects = [];
          } else {
            var id$1 = route._0;
            effects = [(function (param) {
                  return Effect.loadElection(id$1, param);
                })];
          }
          return [
                  {
                    election: state.election,
                    elections: state.elections,
                    elections_loading: state.elections_loading,
                    user: state.user,
                    loading: state.loading,
                    route: route
                  },
                  effects
                ];
      case /* User_Login */12 :
          var user = action._0;
          return [
                  {
                    election: state.election,
                    elections: state.elections,
                    elections_loading: state.elections_loading,
                    user: user,
                    loading: state.loading,
                    route: state.route
                  },
                  [(function (param) {
                        return Effect.storeUser(user, param);
                      })]
                ];
      default:
        return [
                {
                  election: Election.reducer(state.election, action),
                  elections: state.elections,
                  elections_loading: state.elections_loading,
                  user: state.user,
                  loading: state.loading,
                  route: state.route
                },
                []
              ];
    }
  }
}

export {
  initial ,
  reducer ,
}
/* X Not a pure module */
