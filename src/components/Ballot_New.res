module Choice = {
  @react.component
  let make = (~name, ~selected, ~onSelect) => {
    let iconName = selected ? "radiobox-marked" : "radiobox-blank"

    <List.Item title=name
      left={_ => <List.Icon icon=Icon.name(iconName) />}
      onPress={_ => onSelect()}
    />
  }
}

@react.component
let make = (~ballotId) => {
  let (state, dispatch) = Context.use()
  let { t } = ReactI18next.useTranslation()
  let (choice, setChoice) = React.useState(_ => None)

  let ballot = State.getBallotExn(state, ballotId)
  let election = State.getElectionExn(state, ballot.electionId)

  let owner = Array.getBy(state.ids, (id) => {
    ballot.voterPublicKey == id.hexPublicKey
  })

  switch owner {
  | Some(_owner) =>
    <>
      <List.Section title=t(."ballot.new.choices")>
      {
        Array.mapWithIndex(Election.choices(election), (i, choiceName) => {
          let selected = choice == Some(i) 

          <Choice name=choiceName selected key=Int.toString(i)
            onSelect={_ => setChoice(_ => Some(i))} />
        }) -> React.array
      }
      </List.Section>

      <Button mode=#contained onPress={_ => {
        let nbChoices = Array.length(Election.choices(election))
        Core.Ballot.vote(~ballot, ~choice, ~nbChoices)(state, dispatch)
      }}>
        { t(."ballot.new.vote") -> React.string }
      </Button>
    </>
  | None =>
    <Title style=X.styles["title"]>
      { t(."ballot.new.noVotingRight") -> React.string }
    </Title>
  }
}
