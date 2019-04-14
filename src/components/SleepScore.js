import React, { Component } from 'react'

import SleepGauge from './SleepGauge'

import Moment from "moment";

export default class SleepScore extends Component {
    durationScores = () => this.props.days
        .filter(({ sleepDuration }) => Number(sleepDuration) > 0)
        .map(({ sleepDuration }) => {
            if (Number(sleepDuration) <= 5) {
                return 25
            }
            else if (Number(sleepDuration) <= 6) {
                return 50
            }
            else if (Number(sleepDuration) <= 7) {
                return 75
            }
            else if (Number(sleepDuration) <= 8) {
                return 85
            }
            return 100
        })

    ratingScores = () => this.props.days
        .filter(({ sleepDuration }) => Number(sleepDuration) > 0)
        .map(({ rating }) => {
            return rating * 20
        })

    consistencyScores = () => this.props.days
        .filter(({ sleepDuration }) => Number(sleepDuration) > 0)
        .map(({ midpoint }, i, arr) => {
            if(i >= 1){
                return Moment(midpoint, "hh:mm").diff(Moment(arr[i - 1].midpoint, "hh:mm").valueOf(), "minutes")
            }
            else return null
        }).filter((minutes) => minutes !== null ).map((minutes) =>{
            if(minutes < 0) minutes = - minutes
            console.log(minutes)

            if (Number(minutes) <= 10) {
                return 100
            }
            if (Number(minutes) <= 20) {
                return 85
            }
            if (Number(minutes) <= 30) {
                return 75
            }
            if (Number(minutes) <= 50) {
                return 50
            }
            if (Number(minutes) <= 75) {
                return 40
            }
            if (Number(minutes) > 75) {
                return 25
            }
            return 10
        })

    render() {
        console.log(this.consistencyScores())
        return (
            <div>
                <SleepGauge durationScore={[this.durationScores()[0]]} ratingScore={[this.ratingScores()[0]]} consistencyScore={[this.consistencyScores()[0]]} />
            </div >
        )
    }
}