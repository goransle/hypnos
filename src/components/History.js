import React, { Component } from "react";
import localForage from "localforage";
import Moment from "moment";

import { BarChart } from "reaviz";

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
    var times = []
    localForage
      .iterate(function(value, key, iterationNumber) {
        //console.log([key, value]);
        if(days.includes(key)) {
          ratings[days.indexOf(key)] = Number(value.rating)
          var bedtime = Moment(value.bedtime, "HH:mm")
          var waketime = Moment(value.waketime, "HH:mm")
          times[days.indexOf(key)] = {bedtime: bedtime.format("HH:mm"), waketime: waketime.format("HH:mm")}
          console.log(times)
          var timeslept = bedtime.diff(waketime, "minutes");
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
            return {"date": day, sleepDuration: hoursSlept[i], rating: ratings[i], midpoint: midpoints[i], time: times[i]}
          })

        this.setState({
            days : dayObjects,
            averageRating,
            averageDuration
        })
      })
  }
  render() {
    const ratingsList = this.state.days.filter((day) =>{
      if(day.rating === undefined){
        return false
      }
      return true
    }).map( (day) =>{
        console.log(day)
        return (
            {key:day.date, data: day.rating}
        )
    })

    const durationList = this.state.days.filter((day) =>{
      if(day.sleepDuration === undefined){
        return false
      }
      return true
    }).map( (day) =>{
        console.log(day)
        return (
            {key:day.date, data: day.sleepDuration}
        )
    })
    
    return (
      <div>
        <table className="history">
          <tbody>
            <tr><th>Date</th><th>Bedtime</th><th>Waketime</th><th>Duration</th><th>Rating</th></tr>
            <tr><td>Average: </td><td></td><td></td><td>{this.state.averageDuration}</td><td>{this.state.averageRating}</td></tr>
            {this.state.days.map( (day, key) =>{
              if(day.time){
                return (
                    <tr key={key}>
                        <td>{day.date}</td>
                        <td>{day.time.bedtime}</td>
                        <td>{day.time.waketime}</td>
                        <td>{day.sleepDuration}</td>
                        <td>{day.rating}</td>
                    </tr>
                )
              }
            })
        }
        </tbody>
        </table>
        <h3>Ratings</h3>
        <BarChart width={350} height={250} data={ratingsList} />
        <h3>Duration</h3>
        <BarChart width={350} height={250} data={durationList} />
        </div>
    );
  }
}
