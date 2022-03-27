/** @jsx preact.h */
/* global preact, preactHooks, Meiosis */
import merge from "mergerino@0.4.0";

import { Home } from "./01-components";

const Root = ({ state, actions }) => (
  <div className="container">
    <div className="columns">
      <div className="column col-6">
        <div>
          <a href="#">Home</a>
        </div>
        <div>
          <a href="#">Login</a>
        </div>
        <div>
          <a href="#">Settings</a>
        </div>
      </div>
      <div className="column col-6">
        <div>
          <a href="#">Tea</a>
        </div>
        <div>
          <a href="#">Coffee</a>
        </div>
        <div>
          <a href="#">Beer</a>
        </div>
      </div>
    </div>
    <hr />

    <div style={{ paddingLeft: ".4rem" }}>
      <Home state={state} actions={actions} />
    </div>
  </div>
);

const App = Meiosis.preact.setup({
  h: preact.h,
  useState: preactHooks.useState,
  Root
});

const app = {};

const { states, actions } = Meiosis.mergerino.setup({
  stream: Meiosis.simpleStream,
  merge,
  app
});

// eslint-disable-next-line react/no-deprecated
preact.render(
  <App states={states} actions={actions} />,
  document.getElementById("app")
);
