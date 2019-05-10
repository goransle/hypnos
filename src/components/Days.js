import React, { Component } from 'react';
import Moment from 'moment';

import localForage from 'localforage'

class Days extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: this.props.today,
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
    this.setState({ selected: e.target.getAttribute('day') });
    console.log(e.target.getAttribute('day'))
  }
  render() {
    var days = []
    for (let i = 6; i > 0; i--) {
      let day = Moment(this.state.today).add(i, "days").format("L")
      days.push(day);
    }
    for (let i = 0; i < 7; i++) {
      let day = Moment(this.state.today).subtract(i, "days").format("L")
      days.push(day);
    }
    days.reverse()
    return (
      <div className="pastWeek">
        {/* <p>Today is {this.state.today.format("dddd")}</p> */}
        <ol>
          {days.map((day, index) => {
            var classes = [];
            if (this.state.log && this.state.log.includes(day)) {
              classes.push("logged")
            }
            if (day === this.props.selected) {
              classes.push(" selected")
            }
            if (Moment(day, "MM/DD/YYYY").isAfter(this.state.today)) {
              classes.push(" unclickable")
            }
            return <li key={index} day={day} onClick={this.handleClick} className={classes}>{Moment(day, "MM/DD/YYYY").format('ddd')}</li>
          })}
        </ol>
      </div>
    )
  }
}

export default Days;