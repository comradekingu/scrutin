// /!\ WARNING: There is currently a bug in the build system. /!\
// Whenever you modify this file, you should remove the line with "-open Helper" in bsconfig.js and try to build the project.
// Then only you can insert the line again, and the project will successfully build.

let bind = Belt.Option.flatMap
let css  = ReactDOMStyle.make

let rs = React.string
//let texts = Mui.TextField.Value.string
//let boxs = Mui.Box.Value.string

let ra = React.array

// Forms
let ev = (event) => ReactEvent.Form.target(event)["value"] 
let prevent = (f) =>
  (e) => {
    ReactEvent.Synthetic.preventDefault(e)
    f(e)
  }

let post = (url, json) => {
  let headers = {
    "Content-Type": "application/json"
  }
  -> Webapi.Fetch.HeadersInit.make

  let body = json
  -> Js.Json.stringify
  -> Webapi.Fetch.BodyInit.make

  Webapi.Fetch.fetchWithInit(
    url,
    Webapi.Fetch.RequestInit.make(~method_=Post, ~body, ~headers, ()),
  )
}

let shared_styles = {
  open ReactNative
  open Style

  StyleSheet.create({
    "title": textStyle(
      ~textAlign=#center,
      ~fontSize=20.0,
      ()
    ),
    "subtitle": textStyle(
      ~textAlign=#center,
      ()
    ),

    "separator": viewStyle(
      ~height=20.0->dp,
      ()
    ),

    "row": viewStyle(
      ~flexDirection=#row,
      ~padding=10.0->dp,
      ()
    ),
    "col": viewStyle(
      ~flex=1.0,
      ~padding=5.0->dp,
      ()
    ),

    "smallButton": textStyle(
      ~height=15.0->dp,
      ()
    )
  })
}