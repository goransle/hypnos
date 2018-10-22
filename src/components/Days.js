import React, { Component } from 'react';
import Moment from 'moment';

import localForage from 'localforage'

class Days extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: Moment(this.props.today),
      log: []
    }

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    localForage.keys().then((keys) => {
      this.setState({ log: keys })
    })
  }
  handleClick(e) {
    this.props.dateChange(e.target.innerHTML);
  }
  render() {
    var days = []
    for (var i = 0; i < 7; i++) {
      var day = Moment(this.state.today).subtract(i, "days").format("L")
      days.push(day);
    }
    console.log(this.state.log)
    return (
      <div>
        <p>Today is {this.state.today.format("dddd")}</p>
        {days.map((day, index) => {

          if (this.state.log && this.state.log.includes(day)) {
            return <p key={index} onClick={this.handleClick} className="logged">{day}</p>
          }
          return <p key={index} onClick={this.handleClick} className="">{day}</p>
        })}
      </div>
    )
  }
}

export default Days;