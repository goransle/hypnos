import React, { Component } from 'react'

import SleepGauge from './SleepGauge'

export default class SleepScore extends Component {
    durationScores = () => this.props.days
        .filter(({ sleepDuration }) => Number(sleepDuration) > 0)
        .map(({sleepDuration}) => {
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
        .map(({rating}) => {
            return rating * 10
        })

    render() {
        console.log(this.durationScores()[0])
        return (
            <div>
                <SleepGauge durationScore={[this.durationScores()[0]]} ratingScore={[this.ratingScores()[0]]} />
            </div >
        )
    }
}