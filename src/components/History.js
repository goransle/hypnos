import React, { Component } from "react";
import localForage from "localforage";
import Moment from "moment";

import Graphs from "./Graphs"
import SleepScore from "./SleepScore"

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: Moment(this.props.today),
      days: []
    };
  }
  componentDidMount() {
    var days = [];
    for (var i = 0; i < 31; i++) {
      var day = Moment(this.state.today)
        .subtract(i, "days")
        .format("L");
      days.push(day);
    }
    var ratings = [null];
    var hoursSlept = [0];
    var midpoints = [null]
    var times = []
    localForage
      .iterate(function (value, key, iterationNumber) {
        //console.log([key, value]);
        if (days.includes(key)) {
          ratings[days.indexOf(key)] = Number(value.rating)
          var bedtime = Moment(value.bedtime, "HH:mm")
          var waketime = Moment(value.waketime, "HH:mm")
          times[days.indexOf(key)] = { bedtime: bedtime.format("HH:mm"), waketime: waketime.format("HH:mm") }
          console.log(times)
          var timeslept = bedtime.diff(waketime, "minutes");
          var duration;
          if (timeslept > 0) {
            hoursSlept[days.indexOf(key)] = Number(12 - (timeslept / 60)).toFixed(1);
            duration = Moment.duration({ minutes: (12 * 60 - timeslept) / 2 })
            midpoints[days.indexOf(key)] = Moment(value.bedtime, "hh:mm").add(duration).format("hh:mm");
          }
          else {
            hoursSlept[days.indexOf(key)] = Number(- (timeslept / 60).toFixed(1));
            duration = Moment.duration({ minutes: (-timeslept / 2) })
            console.log(duration.valueOf())
            midpoints[days.indexOf(key)] = Moment(value.bedtime, "hh:mm").add(duration).format("hh:mm");
          }
        }
      })
      .then(() => {
        const average = arr => arr.reduce((p, c) => Number(p) + Number(c), 0) / arr.length;
        const averageRating = average(ratings.filter(value => value >= 0)).toFixed(1);
        const averageDuration = average(hoursSlept.filter(value => value !== 0)).toFixed(1)
        var dayObjects = days.map((day, i) => {
          return { "date": day, sleepDuration: Number(hoursSlept[i]), rating: ratings[i], midpoint: midpoints[i], time: times[i] }
        })

        this.setState({
          days: dayObjects,
          averageRating,
          averageDuration
        })
      })
  }
  render() {
    return (
      <div className="container">
        <SleepScore days={this.state.days} />
        <Graphs days={this.state.days} />
        <h3>Last 30 days</h3>
        <table className="history table table-responsive table-hover">
          <thead className="thead">
            <tr><th>Date</th><th>Bedtime</th><th>Waketime</th><th>Duration</th><th>Midpoint</th><th>Rating</th></tr>
          </thead>
          <tbody>
            <tr><td>Average: </td><td></td><td></td><td>{this.state.averageDuration}</td><td></td><td>{this.state.averageRating}</td></tr>

            {this.state.days.filter(day => day.sleepDuration > 0).map((day, key) => {
              return (
                <tr key={key}>
                  <td>{day.date}</td>
                  <td>{day.time.bedtime}</td>
                  <td>{day.time.waketime}</td>
                  <td>{day.sleepDuration}</td>
                  <td>{day.midpoint}</td>
                  <td>{day.rating}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
