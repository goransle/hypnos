import React, { Component } from "react";
import localForage from "localforage";
import Moment from "moment";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: Moment(this.props.today),
      days : []
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
    localForage
      .iterate(function(value, key, iterationNumber) {
        //console.log([key, value]);
        if(days.includes(key)) {
          ratings[days.indexOf(key)] = Number(value.rating)
          var timeslept = Moment(value.bedtime, "HH:mm").diff(Moment(value.waketime, "HH:mm"), "minutes");
          var duration;
          if(timeslept > 0){
            hoursSlept[days.indexOf(key)] = Number(24 - (timeslept / 60)).toFixed(1);
            duration = Moment.duration({minutes: ((12 * 60) -(timeslept)/2)})
            midpoints[days.indexOf(key)] = Moment(value.waketime, "HH:mm").subtract(duration).format("HH:mm");
          }
          else{
            hoursSlept[days.indexOf(key)] = Number(-(timeslept / 60).toFixed(1));
            duration = Moment.duration({minutes: Number(-(timeslept/2))})
          }
          midpoints[days.indexOf(key)] = Moment(value.waketime, "HH:mm").subtract(duration).format("HH:mm");
        }
      })
      .then( () => {
        const average = arr => arr.reduce( ( p, c ) => Number(p) + Number(c), 0 ) / arr.length;
        const averageRating = average( ratings ).toFixed(1);
        const averageDuration = average(hoursSlept).toFixed(1)
          var dayObjects = days.map( (day, i) =>{
            return {"date": day, sleepDuration: hoursSlept[i], rating: ratings[i]}
          })
        this.setState({
            days : dayObjects,
            averageRating,
            averageDuration
        })
      })
  }
  render() {
    return (
        <table className="history">
            <th><span>Date</span><span>Duration</span><span>Rating</span></th>
            <tr><td>Average: </td><td>{this.state.averageDuration}</td><td>{this.state.averageRating}</td></tr>
            {this.state.days.map( (day, key) =>{
                return (
                    <tr key={key}>
                        <td>{day.date}</td>
                        <td>{day.sleepDuration}</td>
                        <td>{day.rating}</td>
                    </tr>
                )
            })
        }
        </table>
    );
  }
}
