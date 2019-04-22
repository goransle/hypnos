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
            if (i >= 1) {
                return Moment(midpoint, "hh:mm").diff(Moment(arr[i - 1].midpoint, "hh:mm").valueOf(), "minutes")
            }
            else return null
        }).filter((minutes) => minutes !== null).map((minutes) => {
            if (minutes < 0) minutes = - minutes
            console.log(minutes)

            if (Number(minutes) <= 30) {
                return 100
            }
            if (Number(minutes) <= 45) {
                return 85
            }
            if (Number(minutes) <= 60) {
                return 75
            }
            if (Number(minutes) <= 75) {
                return 50
            }
            if (Number(minutes) <= 90) {
                return 40
            }
            if (Number(minutes) > 105) {
                return 25
            }
            return 10
        })

    render() {
        console.log(this.consistencyScores())
        return (
            <div>
                <h3>Sleep score</h3>
                <SleepGauge
                    durationScore={[this.durationScores()[0]]}
                    ratingScore={[this.ratingScores()[0]]}
                    consistencyScore={[this.consistencyScores()[0]]}
                />
                <div id="analysis">
                    <h3>Analysis</h3>
                    <p>{
                        ([this.durationScores()[0]] > 75 &&
                            "You slept for at least 7 hours, which is great!") ||
                        ([this.durationScores()[0]] <= 50 &&
                            "You slept for less than 6 hours, which is less than recommended.") ||
                        ("Your sleep duration was adequate")
                    }</p>
                    <p>
                    {
                        ([this.ratingScores()[0]] > 75 &&
                            "You reported feeling good, which is indicative of good quality sleep.") ||
                        ([this.ratingScores()[0]] <= 50 &&
                            "You reported feeling bad, which is indicative of worse quality sleep.") ||
                        ("You reported feeling OK")
                    }
                    </p>
                    <p>
                    {
                        ([this.consistencyScores()[0]] >= 85 &&
                            "Your sleep times have been pretty consistant, which means you are maintaining a good circadian rhythm") ||
                        ([this.consistencyScores()[0]] < 85 &&
                            "Your sleep times have not been too consistant. This can make it more difficult to fall asleep at a regular time")
                    }
                    </p>
                </div>
            </div >
        )
    }
}