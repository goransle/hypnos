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
    var day = e.target.getAttribute('day');
    this.props.dateChange(day);
    console.log(e.target.getAttribute('day'))
  }
  render() {
    var days = []
    for (var i = 0; i < 7; i++) {
      var day = Moment(this.state.today).subtract(i, "days").format("L")
      days.push(day);
    }
    return (
      <div className="pastWeek">
        <p>Today is {this.state.today.format("dddd")}</p>
        <ol>
        {days.map((day, index) => {

          if (this.state.log && this.state.log.includes(day)) {
            return <li key={index} day={day} onClick={this.handleClick} className="logged">{Moment(day).format('ddd')}</li>
          }
          return <li key={index} day={day}onClick={this.handleClick} className="">{Moment(day).format('ddd')}</li>
        })}
        </ol>
      </div>
    )
  }
}

export default Days;