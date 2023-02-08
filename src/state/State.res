type t = {
  election: Election.t,
  elections: array<Election.t>,
  elections_loading: bool,
  user: option<User.t>,
  loading: bool, // Obsolete
  route: Route.t,
}

let initial = {
  election: Election.initial,
  user: None,
  loading: false,
  route: Home,
  elections: [],
  elections_loading: false
}

let reducer = (state, action: Action.t) => {
  switch (action) {
    | Init => ({...state, elections_loading: true}, [Effect.goToUrl, Effect.loadElections, Effect.tryRestoreUser])
    | Election_Fetch(id) => ({
      ...state,
      loading: true,
      election: { ...Election.initial, id }
    }, [ Effect.loadElection(id) ])
    | Election_Load(json) => ({
      ...state,
      loading: false,
      election: json->Election.from_json
    }, [])
    | Election_LoadAll(jsons) => ({
      ...state,
      elections_loading: false,
      elections: Array.map(jsons, Election.from_json) -> Array.reverse
    }, [])
    | Election_Post => (state, [ Effect.createElection(state.election, Option.getExn(state.user)) ])
    | Election_PublishResult(result) => {
      //let election = {...state.election, result}
      (state, [Effect.publishElectionResult(state.election, result)])
    }
    | Ballot_Create(token, selection) => {
      (state, [ Effect.ballotCreate(state.election, token, selection) ])
    }
    | Navigate(route) =>
      let () = switch route {
        | ElectionBooth(id)
        | ElectionShow(id)
        | ElectionResult(id) =>
        X.setUrlPathname(`/elections/${id->Int.toString}`)
        | Home => X.setUrlPathname("/")
        | Profile => X.setUrlPathname("/profile")
        | _ => ()
      }
      let effects = switch route {
        | ElectionBooth(id) => [Effect.loadElection(id)]
        | ElectionShow(id) => [Effect.loadElection(id)]
        | ElectionResult(id) => [Effect.loadElection(id)]
        | _ => []
      }
      ({...state, route}, effects)
    | User_Login(user) =>
      ({...state, user: Some(user)}, [Effect.storeUser(user)])
    | User_Logout =>
      ({...state, user: None}, [Effect.storeRemoveUser])
    | _ =>
    ({
      ...state,
      election: Election.reducer(state.election, action)
    }, [])
  }
}