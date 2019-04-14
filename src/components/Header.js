import React, { Component, Fragment } from 'react'
import {NavLink, Link } from 'react-router-dom';

import "../App.css";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <h1>Hypnos</h1>
          <nav className="nav nav-pills justify-content-center">
            <NavLink exact={true} className="nav-link" activeClassName="active" to="/">Home</NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/history">History</NavLink>
          </nav>
        </header>
      </Fragment>
    )
  }
}
