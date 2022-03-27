/** @jsx preact.h */
/* global preact, preactHooks, Meiosis, MeiosisRouting */
import merge from "mergerino@0.4.0";

import { Route, navTo } from "./04-routes";

const { Routing } = MeiosisRouting.state;

import {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
} from "./04-components";

import {
  routeService,
  teaService,
  teaDetailService,
  coffeeService,
  beerService,
  beverageService,
  brewerService,
  TeaEffect,
  CoffeeEffect,
  BeerEffect
} from "./04-services";

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
};

const Root = ({ state, actions }) => {
  const routing = Routing(state.route);
  const Component = componentMap[routing.localSegment.id];
  const isActive = tab => tab === Component;

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-6">
          <div>
            {isActive(Home) && <span>&rarr;</span>}
            <a
              href="#"
              onClick={() =>
                actions.navigateTo([Route.Home()])
              }
            >
              Home
            </a>
          </div>
          <div>
            {isActive(Login) && <span>&rarr;</span>}
            <a
              href="#"
              onClick={() =>
                actions.navigateTo([Route.Login()])
              }
            >
              Login
            </a>
          </div>
          <div>
            {isActive(Settings) && <span>&rarr;</span>}
            <a
              href="#"
              onClick={() =>
                actions.navigateTo([Route.Settings()])
              }
            >
              Settings
            </a>
          </div>
        </div>
        <div className="column col-6">
          <div>
            {isActive(Tea) && <span>&rarr;</span>}
            <a
              href="#"
              onClick={() =>
                actions.navigateTo([Route.Tea()])
              }
            >
              Tea
            </a>
          </div>
          <div>
            {isActive(Coffee) && <span>&rarr;</span>}
            <a
              href="#"
              onClick={() =>
                actions.navigateTo([
                  Route.Coffee(),
                  Route.Beverages()
                ])
              }
            >
              Coffee
            </a>
          </div>
          <div>
            {isActive(Beer) && <span>&rarr;</span>}
            <a
              href="#"
              onClick={() =>
                actions.navigateTo([
                  Route.Beer(),
                  Route.Beverages()
                ])
              }
            >
              Beer
            </a>
          </div>
        </div>
      </div>
      <hr />

      <div style={{ paddingLeft: ".4rem" }}>
        <Component
          state={state}
          actions={actions}
          routing={routing}
        />
      </div>

      {/* Show or hide the Please Wait modal.
          See public/css/style.css */}
      <div
        style={{
          visibility: state.pleaseWait
            ? "visible"
            : "hidden"
        }}
      >
        <div className="simpleModal">
          <div className="simpleBox">
            <div>Loading, please wait...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = Meiosis.preact.setup({
  h: preact.h,
  useState: preactHooks.useState,
  Root
});

const app = {
  initial: navTo([Route.Home()]),
  Actions: update => ({
    navigateTo: route => update(navTo(route))
  }),
  services: [
    routeService,
    teaService,
    teaDetailService,
    coffeeService,
    beerService,
    beverageService,
    brewerService
  ],
  Effects: update => [
    TeaEffect(update),
    CoffeeEffect(update),
    BeerEffect(update)
  ]
};

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

states.map(state => {
  if (document.getElementById("consoleLog").checked) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(state));
  }
});
