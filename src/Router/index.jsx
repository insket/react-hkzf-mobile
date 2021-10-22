import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CityList from "../pages/CityList";
import Home from "../pages/Home";
import Map from '../pages/Map'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/citylist" component={CityList}></Route>
          <Route path="/map" component={Map}></Route>
          <Redirect to="/home" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}
