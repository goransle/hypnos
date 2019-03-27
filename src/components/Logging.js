import React, { Component, useRef } from "react";
import TimePicker from "react-time-picker";
import ClockInput from "./ClockInput";

class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bedtime: "",
      waketime: "",
      rating: 0,
      troubleSleeping: 0
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        bedtime: this.props.data.bedtime,
        waketime: this.props.data.waketime,
        rating: this.props.data.rating,
        troubleSleeping: this.props.data.troubleSleeping
      });
    }
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCircle = (e, n) => {
    console.log(n);
    if(!isNaN(e))
      this.setState({waketime: Math.round(e*12)})
  };
  handleCustom = (e, n) => {
    console.log(n);
    if(!isNaN(e))
      this.setState({bedtime: Math.round(e*12)})
    if(e < 1)
      this.setState({bedtime: Math.round(e*12)})
  };
  customThing = (e) => {
    console.log(e);
  };

  handleBedtime = value => {
    this.setState({ bedtime: value });
  };
  handleWaketime = value => {
    this.setState({ waketime: value });
  };

  handleClick = e => {
    console.log(e.target);
    if (e.target.innerHTML === "No") {
      this.setState({ troubleSleeping: 0 });
      console.log("what");
    } else if (e.target.innerHTML === "Yes")
      this.setState({ troubleSleeping: 1 });
  };

  onSubmit = form => {
    this.props.inputHandler(this.state);
  };

  render() {
    var { data } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <div className="input-group-lg mb-3">
            <label className="input">I went to bed at</label>
            <TimePicker
              name="bedtime"
              onChange={this.handleBedtime}
              value={data.bedtime}
              disableClock={true}
              locale={"en-GB"}
            />
          </div>
          <div className="input-group-lg">
            <label style={{ paddingLeft: "1em" }}>and woke up</label>
            <TimePicker
              type="time"
              name="waketime"
              onChange={this.handleWaketime}
              value={data.waketime}
              disableClock={true}
              locale={"en-GB"}
            />
          </div>
        </div>
        <div className="form-group" style={{width: "50%", marginBottom:"250px"}}>
          <ClockInput bedtime={this.state.bedtime} waketime={this.state.waketime} handleBedtime={this.handleCircle} handleWaketime={this.handleCustom}/>
        </div>
        <div className="form-group">
          <input
            name="rating"
            type="range"
            value={this.state.rating}
            onChange={this.handleChange}
            max="10"
            min="0"
            step="1"
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
          <label htmlFor="">Did you have trouble getting to sleep?</label>
          <br />
          <div className="btn-group" data-toggle="buttons">
            <button
              type="button"
              className={
                "btn btn-primary btn-lg" +
                (this.state.troubleSleeping ? "" : " active")
              }
              onClick={this.handleClick}
            >
              No
            </button>
            <button
              type="button"
              className={
                "btn btn-primary btn-lg" +
                (this.state.troubleSleeping ? " active" : "")
              }
              onClick={this.handleClick}
            >
              Yes
            </button>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            className={"btn btn-primary btn-lg"}
            value="Save"
          />
        </div>
      </form>
    );
  }
}

export default Logging;
