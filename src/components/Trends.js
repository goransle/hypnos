import React, { Component } from "react";
import Chart from "react-apexcharts";
import localForage from "localforage";
import Moment from "moment";

export default class Trends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: Moment(this.props.today),
      average: 5,
      options: {     
        chart: {
          id: "apexchart-example"
        },
        xaxis: {
          type: "datetime",
          lines: {
            show: true
          },
          categories: []
        },
        yaxis:{
          type:"",
          lines:{show:true}
        }
      },
      series: [
        {
          name: "Rating",
          data: []
        },
        {
          name: "Time Slept",
          data: []
        },
      ]
    };
  }
  componentDidMount() {
    var days = [];
    for (var i = 0; i < 7; i++) {
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
          console.log(timeslept)
          var duration;
          if(timeslept > 0){
            hoursSlept[days.indexOf(key)] = Number(24 - (timeslept / 60)).toFixed(1);
            duration = Moment.duration({minutes: ((12 * 60) -(timeslept)/2)})
            midpoints[days.indexOf(key)] = Moment(value.waketime, "HH:mm").subtract(duration).format("HH:mm");
          }
          else{
            hoursSlept[days.indexOf(key)] = Number(-(timeslept / 60)).toFixed(1);
            duration = Moment.duration({minutes: Number(-(timeslept/2))})
          }
          midpoints[days.indexOf(key)] = Moment(value.waketime, "HH:mm").subtract(duration).format("HH:mm");
        }
      })
      .then( () => {
        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
        const result = average( ratings );
        this.setState({
          options: {
            ...this.state.options,
            xaxis: { ...this.state.options.xaxis, categories: days }
          }
        })
        this.setState({
          series: [{name: "Rating", data: ratings}, 
          {name: "Midpoint", data: midpoints}, 
          {name: "Hours slept", data: hoursSlept}]
        })
      })
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={320}
      />
    );
  }
}
