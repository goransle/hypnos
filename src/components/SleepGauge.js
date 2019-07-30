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
    var plotBands = [{
        from: 0,
        to: 30,
        color: '#ff4136'
    }, {
        from: 30,
        to: 60,
        color: '#FF851B'
    }, {
        from: 60,
        to: 80,
        color: '#01FF70'
    },
    {
        from: 80,
        to: 9e9,
        color: '#2ECC40'
    }]

    var chart = {
        inverted: true,
        marginLeft: 0,
        type: 'bullet',
        useHTML: true
    };

    var durationGauge = {
        chart: chart,
        legend: {
            enabled: false
        },
        title: {
            text: "Duration"
        },
        xAxis: {
            categories: ['<span class="hc-cat-title">Duration <br/>' + props.durationScore + '</span>'],
            labels: {
                useHTML: true
            }
        },
        yAxis: {
            plotBands: plotBands,
            title: null,
            gridLineWidth: 0,
            max: 100
        },
        series: [{
            data: [{
                target: 101,
                y: Number(props.durationScore)
            }],
            color: 'blue'
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
        chart: chart,
        legend: {
            enabled: false
        },
        title: {
            text: 'Rating'
        },
        xAxis: {
            categories: ['<span class="hc-cat-title">Rating <br/>' + props.ratingScore + '</span>'],
            labels: {
                useHTML: true
            }
        },
        yAxis: {
            plotBands: plotBands,
            title: null,
            gridLineWidth: 0,
            max: 100
        },
        series: [{
            data: [{
                target: 101,
                y: Number(props.ratingScore)
            }],
            color: "blue"
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
        chart: chart,
        legend: {
            enabled: false
        },
        title: {
            text: 'Consistency'
        },
        xAxis: {
            categories: ['<span class="hc-cat-title">Consistency <br/>' + props.consistencyScore + '</span>'],
            labels: {
                useHTML: true
            }
        },
        yAxis: {
            plotBands: plotBands,
            title: null,
            gridLineWidth: 0,
            max: 100
        },
        series: [{
            data: [{
                target: 101,
                y: Number(props.consistencyScore)
            }],
            color: "blue"
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

    var style = {
        height: "125px"
    }

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={durationGauge}
                containerProps={{ className: 'gauge', style: style }}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={ratingGauge}
                containerProps={{ className: 'gauge', style: style }}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={consistencyGauge}
                containerProps={{ className: 'gauge', style: style }}
            />
            <h4>Total: {Number((Number(props.consistencyScore) + Number(props.ratingScore) + Number(props.durationScore)) / 3).toFixed(0)} </h4>
        </div>
    )
}
