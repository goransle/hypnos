import React from 'react'

import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'
import Moment from "moment";

HC_more(Highcharts)

export default function Graphs(props) {
  console.log(props)
  const durationOptions = {
    title: {
      text: ''
    },
    chart: {
      zoomType: 'x'
    },
    tooltip: {
      shared: true,
      dateTimeLabelFormats: {
        day: "%A, %b %e, %Y",
        hour: "%A, %b %e, %Y",
        month: "%B %Y"
      }
    },
    series: [{
      name: "Sleep duration",
      zones: [{
        value: 0,
        color: '#ff4136'
      },
      {
        value: 5,
        color: '#ff4136'
      },
      {
        value: 6,
        color: '#FF851B'
      },
      {
        value: 7,
        color: '#01FF70'
      }, {
        color: '#2ECC40'
      }],
      type: "column",
      data: props.days.reverse()
        .filter(day => day.sleepDuration !== undefined && day.sleepDuration > 0)
        .map(({ sleepDuration, date }) => ([Moment(date).utc(true).valueOf(), Number(sleepDuration)]))
    },
    {
      name: "Rating",
      type: "spline",
      data: props.days.reverse().filter(day => day.rating !== undefined)
        .map(day => ([Moment(day.date).utc(true).valueOf(), Number(day.rating)])),
    }
    ],
    xAxis: {
      type: "datetime",
      reversed: true,
      crosshair: true
    },
    yAxis: {
      title: {
        text: "Hours"
      }
    }
  }

  const timeOptions = {
    title: {
      text: ""
    },
    chart: {
      type: 'columnrange',
      inverted: true
    },
    plotOptions: {
      columnrange: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Moment(this.y).utc(true).format("HH:mm");
          },
          y: 0
        }
      }
    },
    xAxis: {
      type: 'datetime',
      reversed: true,
      categories: props.days
        .filter(day => day.sleepDuration !== undefined && day.sleepDuration > 0)
        .map(({ date }) => ([Moment(date).format("DD MMM")]))
    },
    yAxis: {
      type: 'datetime',
      title: {text: null},
      max: Moment({hour: 10}).utc(true),
      min: Moment({hour: 18}).subtract(24, "hours").utc(true),
      tickInterval: 3600,
      pointInterval: 1,
      dateTimeLabelFormats: {
        day: '%H:%M',
        hour: '%H:%M',
      },
      labels: {
        formatter: function () {
          var label = this.axis.defaultLabelFormatter.call(this);
          return Moment(label, "HH:mm").add(2, "hours").format("HH");
        }
      }
    },
    tooltip: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Sleepy times',
      data: props.days
        .filter(day => day.sleepDuration !== undefined && day.sleepDuration > 0)
        .map(({ time }) => {
          if (Moment(time.bedtime, "hh:mm").valueOf() > Moment(time.waketime, "hh:mm").valueOf()) {
            return ([Moment(time.bedtime, "hh:mm").subtract(12, "hours").valueOf(), Moment(time.waketime, "hh:mm").utc().valueOf()])
          }
          return ([Moment(time.bedtime, "hh:mm").utc().valueOf(), Moment(time.waketime, "hh:mm").utc().valueOf()])
        })
    }]
  }
  console.log(timeOptions)
  return (
    <div>
      <h3>Sleep duration and rating</h3>
      <HighchartsReact
        highcharts={Highcharts}
        options={durationOptions}
      />
      <div>
        <h3>Bedtime and waketime</h3>
        <HighchartsReact
          highcharts={Highcharts}
          options={timeOptions}
        />
      </div>
    </div>
  )
}
