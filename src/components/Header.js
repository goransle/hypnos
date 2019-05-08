import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom';

import "../App.css";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <h1 className="navbar-brand">Hypnos</h1>
          <nav className="nav nav-pills nav-fill fixed-bottom navbar-light bg-light nav-justified">
            <NavLink onClick={this.forceUpdate} exact={true} className="nav-item nav-link" activeClassName="active" to="/">Home</NavLink>
            {/* <NavLink exact={true} className="nav-item nav-link" activeClassName="active" to="/score">Score</NavLink> */}
            <NavLink className="nav-item nav-link" activeClassName="active" to="/history">History</NavLink>
          </nav>
        </header>
      </Fragment>
    )
  }
}
