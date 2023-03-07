// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Effect from "./Effect.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_MapString from "rescript/lib/es6/belt_MapString.js";

var initial_ids = [];

var initial_txs = [];

var initial_trustees = [];

var initial_cache = {
  elections: undefined,
  ballots: undefined
};

var initial = {
  route: /* Home_Elections */0,
  ids: initial_ids,
  txs: initial_txs,
  trustees: initial_trustees,
  cache: initial_cache
};

function reducer(state, action) {
  if (typeof action === "number") {
    return [
            state,
            [
              Effect.identities_fetch,
              Effect.transactions_fetch
            ]
          ];
  }
  switch (action.TAG | 0) {
    case /* Navigate */0 :
        return [
                {
                  route: action._0,
                  ids: state.ids,
                  txs: state.txs,
                  trustees: state.trustees,
                  cache: state.cache
                },
                []
              ];
    case /* Identity_Add */1 :
        var ids = Belt_Array.concat(state.ids, [action._0]);
        return [
                {
                  route: state.route,
                  ids: ids,
                  txs: state.txs,
                  trustees: state.trustees,
                  cache: state.cache
                },
                [(function (param) {
                      return Effect.identities_store(ids, param);
                    })]
              ];
    case /* Transaction_Add */2 :
        var tx = action._0;
        var txs = Belt_Array.concat(state.txs, [tx]);
        return [
                {
                  route: state.route,
                  ids: state.ids,
                  txs: txs,
                  trustees: state.trustees,
                  cache: state.cache
                },
                [
                  (function (param) {
                      return Effect.transactions_store(txs, param);
                    }),
                  (function (param) {
                      return Effect.cache_update(tx, param);
                    })
                ]
              ];
    case /* Cache_Election_Add */3 :
        var elections = Belt_MapString.set(state.cache.elections, action._0, action._1);
        var init = state.cache;
        var cache_ballots = init.ballots;
        var cache = {
          elections: elections,
          ballots: cache_ballots
        };
        return [
                {
                  route: state.route,
                  ids: state.ids,
                  txs: state.txs,
                  trustees: state.trustees,
                  cache: cache
                },
                []
              ];
    case /* Cache_Ballot_Add */4 :
        var ballots = Belt_MapString.set(state.cache.ballots, action._0, action._1);
        var init$1 = state.cache;
        var cache_elections = init$1.elections;
        var cache$1 = {
          elections: cache_elections,
          ballots: ballots
        };
        return [
                {
                  route: state.route,
                  ids: state.ids,
                  txs: state.txs,
                  trustees: state.trustees,
                  cache: cache$1
                },
                []
              ];
    
  }
}

export {
  initial ,
  reducer ,
}
/* Effect Not a pure module */
