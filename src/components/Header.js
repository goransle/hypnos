import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

import "../App.css";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <h1>Hypnos</h1>
          <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/history">History</Link>
        </header>
      </Fragment>
    )
  }
}

const linkStyle = {
    color: 'black',
    border: "black",
    textDecoration: 'none'
  }
