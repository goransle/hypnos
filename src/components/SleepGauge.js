import React from 'react'

import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
import HC_solidGauge from 'highcharts/modules/solid-gauge'
import HighchartsReact from 'highcharts-react-official'

HC_more(Highcharts)
HC_solidGauge(Highcharts)

export default function SleepGauge(props) {
    function renderIcons() {

        // Move icon
        if (!this.series[0].icon) {
            this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
                .attr({
                    stroke: '#303030',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    zIndex: 10
                })
                .add(this.series[2].group);
        }
        this.series[0].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
            (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
        );

        // Exercise icon
        if (!this.series[1].icon) {
            this.series[1].icon = this.renderer.path(
                ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                    'M', 8, -8, 'L', 16, 0, 8, 8]
            )
                .attr({
                    stroke: '#ffffff',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    zIndex: 10
                })
                .add(this.series[2].group);
        }
        this.series[1].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
            (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
        );

        // Stand icon
        if (!this.series[2].icon) {
            this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
                .attr({
                    stroke: '#303030',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    zIndex: 10
                })
                .add(this.series[2].group);
        }

        this.series[2].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
            (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
        );
    }
    const options = {

        chart: {
            type: 'solidgauge',
            height: '110%',
            events: {
                render: (renderIcons,
                function() {
                    let series = this.series
                    let sum = 0
                    for(let i = 0; i < series.length; i++) {
                      if(series[i].visible){
                        for(let j = 0; j < series[i].data.length; j++) {
                          sum += series[i].data[j].y
                        }
                      }
                    }
                  this.title.update({text: `Total <br><span style="font-size:2em; color: {point.color}; font-weight: bold">${Number(sum/3).toFixed(0)}</span>`}, false, false) 
                  })
            }
        },

        title: {
            text: "",
            style: {
                fontSize: '16px'
            },
            align: "center",
            verticalAlign: "middle"
        },

        tooltip: {
            useHTML: true,
            borderWidth: 1,
            borderRadius: 25,
            backgroundColor: 'white',
            shadow: false,
            style: {
                fontSize: '16px',
                borderRadius:'50%',
                width: '250px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 2) - 15
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: [0, 25, 50, 75, 100]
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },

        series: [{
            name: 'Duration',
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '112%',
                innerRadius: '88%',
                y: Number(props.durationScore)
            }]
        }, {
            name: 'Rating',
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '87%',
                innerRadius: '63%',
                y: Number(props.ratingScore)
            }]
        }, 
        {
            name: 'Consistency',
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '62%',
                innerRadius: '38%',
                y: Number(props.consistencyScore) || 25
            }]
        }
    ]
    }
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}
