import React from 'react'

import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
import HC_solidGauge from 'highcharts/modules/solid-gauge'
import HC_bulletGraph from 'highcharts/modules/bullet'
import HighchartsReact from 'highcharts-react-official'

HC_more(Highcharts)
HC_solidGauge(Highcharts)
HC_bulletGraph(Highcharts)


export default function SleepGauge(props) {
    var durationGauge = {
        chart: {
            inverted: true,
            marginLeft: 100,
            type: 'bullet'
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['<span class="hc-cat-title">Duration</span>']
        },
        yAxis: {
            plotBands: [{
                from: 0,
                to: 50,
                color: '#666'
            }, {
                from: 50,
                to: 75,
                color: '#999'
            }, {
                from: 75,
                to: 9e9,
                color: '#bbb'
            }],
            title: null,
            gridLineWidth: 0,
            max: 100
        },
        series: [{
            data: [{
                target: 101,
                y: Number(props.durationScore)
            }]
        }],
        tooltip: {
            pointFormat: '<b>{point.y}</b> (of 100)'
        },
        plotOptions: {
            series: {
                pointPadding: 0.25,
                borderWidth: 0,
                color: '#000',
                targetOptions: {
                    width: '200%'
                }
            }
        },
        credits: {
            enabled: false
        },
    };
    var ratingGauge = {
        chart: {
            inverted: true,
            marginLeft: 100,
            type: 'bullet'
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['<span class="hc-cat-title">Sleep quality</span>']
        },
        yAxis: {
            plotBands: [{
                from: 0,
                to: 50,
                color: '#666'
            }, {
                from: 50,
                to: 75,
                color: '#999'
            }, {
                from: 75,
                to: 9e9,
                color: '#bbb'
            }],
            title: null,
            gridLineWidth: 0,
            max: 100
        },
        series: [{
            data: [{
                target: 101,
                y: Number(props.ratingScore)
            }]
        }],
        tooltip: {
            pointFormat: '<b>{point.y}</b> (of 100)'
        },
        plotOptions: {
            series: {
                pointPadding: 0.25,
                borderWidth: 0,
                color: '#000',
                targetOptions: {
                    width: '200%'
                }
            }
        },
        credits: {
            enabled: false
        }
    };

    var consistencyGauge = {
        chart: {
            inverted: true,
            marginLeft: 100,
            type: 'bullet'
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['<span class="hc-cat-title">Consistency</span>']
        },
        yAxis: {
            plotBands: [{
                from: 0,
                to: 50,
                color: '#666'
            }, {
                from: 50,
                to: 75,
                color: '#999'
            }, {
                from: 75,
                to: 9e9,
                color: '#bbb'
            }],
            title: null,
            gridLineWidth: 0,
            max: 100
        },
        series: [{
            data: [{
                target: 101,
                y: Number(props.consistencyScore)
            }]
        }],
        tooltip: {
            pointFormat: '<b>{point.y}</b> (of 100)'
        },
        plotOptions: {
            series: {
                pointPadding: 0.25,
                borderWidth: 0,
                color: '#000',
                targetOptions: {
                    width: '200%'
                }
            }
        },
        credits: {
            enabled: false
        }
    };



    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={durationGauge}
                containerProps={{ className: 'gauge', style: { height: "100px" } }}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={ratingGauge}
                containerProps={{ className: 'gauge', style: { height: "100px" } }}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={consistencyGauge}
                containerProps={{ className: 'gauge', style: { height: "100px" } }}
            />
        </div>
    )
}
