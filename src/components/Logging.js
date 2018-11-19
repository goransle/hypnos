import React, { Component } from "react";
import Moment from "moment";

import localForage from "localforage";

class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bedtime: this.props.data.bedtime,
      waketime: this.props.data.waketime,
      rating: this.props.data.rating
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.data !== prevProps.data) {
      this.setState({
        bedtime: this.props.data.bedtime,
        waketime: this.props.data.waketime,
        rating: this.props.data.rating
      })
    }
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = form => {
    var object = {};
    object.bedtime = this.state.bedtime;
    object.waketime = this.state.waketime;
    object.rating = this.state.rating;
    localForage.setItem(this.props.day, object);
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <div className="form-group">
            <label>I went to bed at</label>
            <input
              type="time"
              name="bedtime"
              onChange={this.handleChange}
              defaultValue={this.props.data.bedtime}
            />
          </div>
          <br/>
          <div className="form-group">
            <label>and woke up</label>
            <input
              type="time"
              name="waketime"
              onChange={this.handleChange}
              defaultValue={this.props.data.waketime}
            />
          </div>
          <div className="form-group"></div>
          <input
            name="rating"
            type="range"
            value={this.props.data.rating}
            onChange={this.handleChange}
          />
          <div className="form-group">
            <input type="submit" value="Save" />
          </div>
        </div>
      </form>
    );
  }
}

export default Logging;
