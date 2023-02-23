let loadElections = (dispatch) => {
  Election.getAll()
  -> Promise.thenResolve(res => {
    switch Js.Json.decodeArray(res) {
      | Some(json_array) => dispatch(Action.Election_LoadAll(json_array))
      | None => dispatch(Action.Election_LoadAll([]))
    }
  }) -> ignore
}

let loadElection = uuid => {
  dispatch => {
    Election.get(uuid)
    -> Promise.thenResolve(o => {
      dispatch(Action.Election_Load(o))
    }) -> ignore
  }
}

let createElection = (election : Election.t, user: User.t) => {
  dispatch => {
    let (privkey, trustees) = Belenios.Trustees.create()
    Store.Trustee.add({pubkey: Belenios.Trustees.pubkey(trustees), privkey})

    let params = Belenios.Election.create(
      ~name=election.name,
      ~description="description",
      ~choices=Array.map(election.choices, (o) => o.name),
      ~trustees=trustees
    )

    let (pubcreds, privcreds) = Belenios.Credentials.create(params.uuid, Array.length(election.voters))
    let creds = Array.zip(pubcreds, privcreds)

    //dispatch(Action.SetElectionBeleniosParams(belenios_params))

    let voters = Array.zip(election.voters, creds)
    -> Array.map(((voterWithoutCred, (pubCred, privCred))) => {
      let voter : Voter.t = {...voterWithoutCred, pubCred, privCred}
      voter
    })

    let election = {
      ...election,
      uuid: Some(params.uuid),
      params: Some(params),
      trustees: Some(Belenios.Trustees.to_str(trustees)),
      creds: Js.Json.stringifyAny(pubcreds), // TODO: Try Belenios.Credentials.stringify
      voters
    }

    election
    -> Election.post(user)
    -> Promise.then(Webapi.Fetch.Response.json)
    -> Promise.thenResolve((res) => {
      dispatch(Action.Election_Load(res))
      //let uuid = (Election.from_json(res)).uuid -> Option.getExn
      let uuid = election.uuid -> Option.getExn
      dispatch(Action.Navigate(Route.ElectionShow(uuid)))
    })
    -> ignore
  }
}


let ballotCreate = (election, token, selection) => {
  dispatch => {
    let _ = Js.Global.setTimeout(() => {
      let ballot = Election.createBallot(election, token, selection)
      Election.post_ballot(election, ballot)
      -> Promise.thenResolve(_ => {
        dispatch(Action.Ballot_Create_End)
      })
      -> ignore
    }, 0)
    ()
  }
}

let publishElectionResult = (election, result) => {
  dispatch => {
    Election.post_result(election, result)
    -> Promise.thenResolve(_ => {
      dispatch(Action.Election_SetResult(Some(result)))
      ()
    })
    -> ignore
  }
}

let goToUrl = dispatch => {
  URL.getAndThen((url) => {
    switch url {
      | list{"elections", sUuid} =>
        //let nId = sId -> Int.fromString -> Option.getWithDefault(0)
        dispatch(Action.Navigate(ElectionBooth(sUuid)))
      | list{"profile"} =>
        dispatch(Action.Navigate(Route.User_Profile))
      | _ => ()
    }
  })
}

let tally = (privkey: Belenios.Trustees.Privkey.t, election: Election.t) => {
  dispatch => {
    let params = Option.getExn(election.params)
    let ballots =
      election.ballots
      -> Array.map((ballot) => ballot.ciphertext)
      -> Array.keep((ciphertext) => Option.getWithDefault(ciphertext, "") != "")
      -> Array.map((ciphertext) => Belenios.Ballot.of_str(Option.getExn(ciphertext)))
    let trustees = Belenios.Trustees.of_str(Option.getExn(election.trustees))
    let pubcreds : array<string> = %raw(`JSON.parse(election.creds)`)
    let (a, b) = Belenios.Election.decrypt(params, ballots, trustees, pubcreds, privkey)
    let res = Belenios.Election.result(params, ballots, trustees, pubcreds, a, b)
    dispatch(Action.Election_PublishResult(res))
  }
}

module Store = {
  module User = {
    let get = dispatch => {
      Store.User.get()
      -> Promise.thenResolve((oUser) => {
        switch oUser {
        | None => ()
        | Some(user) => dispatch(Action.User_Login(user))
        }
      })
      -> ignore
    }

    let set = (user) => {
      _dispatch => {
        Store.User.set(user)
        -> ignore
      }
    }

    let clean = _dispatch => Store.User.clean()
  }

  module Trustees = {
    let get = dispatch => {
      Store.Trustee.get()
      -> Promise.thenResolve(trustees => {
        dispatch(Action.Trustees_Set(trustees))
      }) -> ignore
    }

    let add = ({pubkey, privkey} : Trustee.t) => {
      _dispatch => {
        //let pubkey = Belenios.Trustees.pubkey(trustees)
        //let privkey = Belenios.Trustees.Privkey.to_str(privkey)
        Store.Trustee.add({pubkey, privkey})
      }
    }

    let clean = _dispatch => Store.Trustee.clean()
  }

  module Tokens = {
    let get = dispatch => {
      Store.Token.get()
      -> Promise.thenResolve(trustees => {
        dispatch(Action.Tokens_Set(trustees))
      }) -> ignore
    }

    let add = (token : Token.t) => {
      _dispatch => {
        Store.Token.add(token)
      }
    }

    let clean = _dispatch => Store.Token.clean()
  }
}

let member_register = (email) => {
  dispatch => {
    let data = {
      let dict = Js.Dict.empty()
      Js.Dict.set(dict, "email", Js.Json.string(email))
      Js.Json.object_(dict)
    }

    X.post(`${Config.api_url}/users`, data)
    -> Promise.thenResolve(_ =>
      dispatch(Action.Navigate(Route.User_Register_Confirm))
    )
    -> ignore
  }
}