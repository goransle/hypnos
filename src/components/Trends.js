import React, { Component } from "react";
import Chart from "react-apexcharts";
import localForage from "localforage";
import Moment from "moment";

export default class Trends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: Moment(this.props.today),
      options: {
        annotations: {
          yaxis: [
            {
              y: 5,
              borderColor: "#00E396",
              label: {
                borderColor: "#00E396",
                offsetX: -100,
                style: {
                  color: "#fff",
                  background: "#00E396"
                },
                text: "Average?"
              }
            }
          ],
          // xaxis: [
          //   {
          //     x: new Date("16 Nov 2018").getTime(),
          //     borderColor: "#FEB019",
          //     label: {
          //       borderColor: "#FEB019",
          //       style: {
          //         color: "#fff",
          //         background: "#FEB019"
          //       },
          //       orientation: "horizontal",
          //       text: "X Axis Anno Horizonal"
          //     }
          //   }
          // ],
          points: [
            {
              x: new Date("17 Nov 2018").getTime(),
              y: 3,
              marker: {
                size: 6,
                fillColor: "#fff",
                strokeColor: "#2698FF",
                radius: 2
              },
              label: {
                borderColor: "#FF4560",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#FF4560"
                },
      
                text: "Very important"
              }
            }
          ]
        },      
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
          name: "series-1",
          data: []
        }
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
    var ratings = [0,0,0,0,0,0,0];
    var hoursSlept = [0,0,0,0,0,0,0];
    localForage
      .iterate(function(value, key, iterationNumber) {
        //console.log([key, value]);
        if(days.includes(key)) {
          ratings[days.indexOf(key)] = Number(value.rating/10)
          var x = Moment(value.bedtime, "HH:mm").diff(Moment(value.waketime, "HH:mm"), "hours")
          if(x>=0){
            hoursSlept[days.indexOf(key)] = 24-x;
          }
          else{
            hoursSlept[days.indexOf(key)] = -x;
          }
        }
      })
      .then( () => {
        this.setState({
          options: {
            ...this.state.options,
            xaxis: { ...this.state.options.xaxis, categories: days }
          }
        })
        this.setState({
          series: [{name: "Rating", data: ratings}, {name: "Hours slept", data: hoursSlept}]
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