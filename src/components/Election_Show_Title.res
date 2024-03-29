@react.component
let make = (~election:Election.t) => {
  let { t } = ReactI18next.useTranslation()

  let status = switch (election.result) {
  | Some(_) => t(."election.show.statusFinished")
  | None => t(."election.show.statusInProgress")
  }

  let backgroundColor = switch (election.result) {
  | Some(_) => Color.lightblue
  | None => Color.grey
  }

  let chipStyle = Style.viewStyle(
    ~backgroundColor,
    ~marginLeft=(5.0->Style.dp),
    ()
  )

  <X.Title>
    { Election.name(election) -> React.string }
    <Chip mode=#flat style=chipStyle>{ status -> React.string }</Chip>
  </X.Title>
}
