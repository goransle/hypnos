import React, { Component } from 'react';
import Moment from 'moment';

import localForage from 'localforage'

class Logging extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bedtime: '',
            waketime: '',
            rating: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(form) {
        var object = {};
        object.bedtime = this.state.bedtime;
        object.waketime = this.state.waketime;
        object.rating = this.state.rating;
        localForage.setItem(this.props.day, object)
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <span>
                        <label>I went to bed at</label>
                        <input type="time" name="bedtime" onChange={this.handleChange} defaultValue={this.props.data.bedtime}/>
                    </span>
                    <span>
                        <label>and woke up</label>
                        <input type="time" name="waketime" onChange={this.handleChange} defaultValue={this.props.data.waketime}/>
                    </span>
                    <input name="rating" type="range" value={this.state.rating} onChange={this.handleChange} />
                    <input type="submit" value="Save" />
                </div>
            </form>

        )
    }
}

export default Logging