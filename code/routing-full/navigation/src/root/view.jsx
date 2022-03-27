import React from "react";
import { Routing } from "meiosis-routing/state";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

import { Route } from "routing-common/src/routes";

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
};

export const Root = ({ state, actions }) => {
  const routing = Routing(state.route);
  const Component = componentMap[routing.localSegment.id];
  const isActive = tab => (tab === Component ? "active" : "");

  return (
    <div>
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
          <li className={isActive(Home)}>
            <a href="#" onClick={() => actions.navigateTo(Route.Home())}>
              Home
            </a>
          </li>
          <li className={isActive(Login)}>
            <a href="#" onClick={() => actions.navigateTo(Route.Login())}>
              Login
            </a>
          </li>
          <li className={isActive(Settings)}>
            <a href="#" onClick={() => actions.navigateTo(Route.Settings())}>
              Settings
            </a>
          </li>
          <li className={isActive(Tea)}>
            <a href="#" onClick={() => actions.navigateTo(Route.Tea())}>
              Tea
            </a>
          </li>
          <li className={isActive(Coffee)}>
            <a href="#" onClick={() => actions.navigateTo([Route.Coffee(), Route.Beverages()])}>
              Coffee
            </a>
          </li>
          <li className={isActive(Beer)}>
            <a href="#" onClick={() => actions.navigateTo([Route.Beer(), Route.Beverages()])}>
              Beer
            </a>
          </li>
        </ul>
      </nav>
      <Component state={state} actions={actions} routing={routing} />
      {/* Show or hide the Please Wait modal. See public/css/style.css */}
      <div style={{ visibility: state.pleaseWait ? "visible" : "hidden" }}>
        <div className="simpleModal">
          <div className="simpleBox">
            <div>Loading, please wait...</div>
          </div>
        </div>
      </div>
    </div>
  );
};
