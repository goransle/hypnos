import React, { Component } from "react";

class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bedtime: '',
      waketime: '',
      rating: 0
    }
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
    this.props.inputHandler(this.state)
  };
  render() {
    var {data} = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <div className="form-group">
            <label>I went to bed at</label>
            <input
              type="time"
              name="bedtime"
              onChange={this.handleChange}
              defaultValue={data.bedtime}
            />
          </div>
          <br/>
          <div className="form-group">
            <label>and woke up</label>
            <input
              type="time"
              name="waketime"
              onChange={this.handleChange}
              defaultValue={data.waketime}
            />
          </div>
          <div className="form-group">
          <input
            name="rating"
            type="range"
            value={this.state.rating}
            onChange={this.handleChange}
            max="10" min="0" step="1"
            list="steplist"
          />
          <datalist id="steplist">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </datalist>
          </div>
          <div className="form-group">
            <input type="submit" value="Save" />
          </div>
        </div>
      </form>
    );
  }
}

export default Logging;
