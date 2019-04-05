import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import Moment from "moment";

export default function Graphs(props) {
  const options = {
    title: {
      text: 'Trends'
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
      data: props.days.reverse().filter(day => day.sleepDuration !== undefined && day.sleepDuration !== 0).map(({ sleepDuration, date }) => ([Moment(date).valueOf(), Number(sleepDuration)]))
    },
    {
      name: "Rating",
      type: "line",
      data: props.days.reverse().filter(day => day.rating !== undefined).map(day => ([Moment(day.date).valueOf(), Number(day.rating)])),
    }
    ],
    xAxis: {
      type: "datetime",
      reversed: true,
      crosshair: true
    },
    yAxis: {
    }
  }

  console.log(options)
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}
