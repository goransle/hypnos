import React, { Component } from "react";
//import TimePicker from "react-time-picker";
import ClockInput from "./ClockInput";
import Moment from "moment";

class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bedtime: "",
      waketime: "",
      rating: 3,
      troubleSleeping: 0,
      wakeDuring: 0,
      saved: false,
      caffeine: 1,
      exercise: 1,
      stress: 1
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        bedtime: this.timeString(this.props.data.bedtime),
        waketime: this.timeString(this.props.data.waketime),
        rating: Number(this.props.data.rating),
        troubleSleeping: this.props.data.troubleSleeping,
        wakeDuring: this.props.data.wakeDuring,
        caffeine: this.props.data.caffeine,
        exercise: this.props.data.exercise,
        stress: this.props.data.stress
      });
    }
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  timeString = string => {
    return Moment(string, "H:m").format("HH:mm");
  };

  handleCircleWaketime = e => {
    console.log(e * 12);
    let hours = Moment.duration(e * 12, "hours").hours();
    let minutes = Moment.duration(e * 12, "hours").minutes();
    if (!isNaN(e))
      this.setState({ waketime: this.timeString(`${hours}:${minutes}`) });
  };
  handleCircleBedtime = e => {
    var hours, minutes;
    if (e > 1) {
      hours = Moment.duration(-(1 - e) * 12, "hours").hours();
      minutes = Moment.duration(e * 12, "hours").minutes();
    } else {
      hours = Moment.duration(e * 12, "hours").hours();
      minutes = Moment.duration(e * 12, "hours").minutes();
    }
    if (!isNaN(e))
      this.setState({ bedtime: this.timeString(`${hours}:${minutes}`) });
  };
  handleBedtime = value => {
    this.setState({ bedtime: value });
  };
  handleWaketime = value => {
    this.setState({ waketime: value });
  };

  handleClick = e => {
    console.log(e.target);
    if (e.target.classList.contains("wakebutton")) {
      if (e.target.innerHTML === "No") {
        this.setState({ wakeDuring: 0 });
      } else if (e.target.innerHTML === "Yes")
        this.setState({ wakeDuring: 1 });
    }
    else {
      if (e.target.innerHTML === "No") {
        this.setState({ troubleSleeping: 0 });
      } else if (e.target.innerHTML === "Yes")
        this.setState({ troubleSleeping: 1 });
    }
  };

  onSubmit = form => {
    form.preventDefault()
    this.setState({ saved: true })
    this.props.inputHandler(this.state);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div className="input-group-lg mb-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <label style={{ marginLeft: "1em", float: "left", fontSize: "1.25em" }} className="input">Bedtime <br /> {this.state.bedtime}</label>
            {/* <TimePicker
              name="bedtime"
              value={this.state.bedtime}
              disableClock={true}
              locale={"en-GB"}
            /> */}
            <label style={{ marginRight: "1em", float: "right", fontSize: "1.25em" }}>Woke up <br /> {this.state.waketime}</label>
            {/* <TimePicker
              type="time"
              name="waketime"
              value={this.state.waketime}
              disableClock={true}
              locale={"en-GB"}
            /> */}
          </div>
        </div>
        <div className="form-group">
          <ClockInput
            bedtime={this.timeString(this.state.bedtime)}
            waketime={this.timeString(this.state.waketime)}
            handleBedtime={this.handleCircleBedtime}
            handleWaketime={this.handleCircleWaketime}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">How did you feel this morning?</label>
          <br />
          <label htmlFor="rating">{
            (this.state.rating === 1 && "Very bad")
            || (this.state.rating === 2 && "Not great")
            || (this.state.rating === 3 && "OK")
            || (this.state.rating === 4 && "Pretty good")
            || (this.state.rating === 5 && "Awesome")
          }
          </label>
          <input
            name="rating"
            type="range"
            value={this.state.rating}
            onChange={this.handleChange}
            max="5"
            min="1"
            step="1"
            list="steplist"
            className="form-control-range"
          />
          <datalist id="steplist">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </datalist>
        </div>
        <div className="form-group">
          <label htmlFor="">Did you have trouble falling asleep?</label>
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
          <label htmlFor="">Did you wake up during the night without easily being able to sleep again?</label>
          <br />
          <div className="btn-group" data-toggle="buttons">
            <button
              type="button"
              className={
                "wakebutton btn btn-primary btn-lg" +
                (this.state.wakeDuring ? "" : " active")
              }
              onClick={this.handleClick}
            >
              No
            </button>
            <button
              type="button"
              className={
                "wakebutton btn btn-primary btn-lg" +
                (this.state.wakeDuring ? " active" : "")
              }
              onClick={this.handleClick}
            >
              Yes
            </button>
          </div>
        </div>

        <div className="form-group accordion" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  Additional data
                </button>
              </h2>
            </div>

            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="caffeine">Caffeine</label>
                  <br />
                  <label htmlFor="caffeine">{
                    (this.state.caffeine === 1 && "None")
                    || (this.state.caffeine === 2 && "A little")
                    || (this.state.caffeine === 3 && "Some")
                    || (this.state.caffeine === 4 && "A lot")
                    || (this.state.caffeine === 5 && "Too much")
                  }
                  </label>
                  <input
                    name="caffeine"
                    type="range"
                    value={this.state.caffeine}
                    onChange={this.handleChange}
                    max="5"
                    min="1"
                    step="1"
                    list="steplist"
                    className="form-control-range"
                  />
                  <datalist id="steplist">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="exercise">Exercise</label>
                  <br />
                  <label htmlFor="exercise">{
                    (this.state.exercise === 1 && "None")
                    || (this.state.exercise === 2 && "A little")
                    || (this.state.exercise === 3 && "Some")
                    || (this.state.exercise === 4 && "A lot")
                    || (this.state.exercise === 5 && "Too much")
                  }
                  </label>
                  <input
                    name="exercise"
                    type="range"
                    value={this.state.exercise}
                    onChange={this.handleChange}
                    max="5"
                    min="1"
                    step="1"
                    list="steplist"
                    className="form-control-range"
                  />
                  <datalist id="steplist">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="stress">Stress</label>
                  <br />
                  <label htmlFor="stress">{
                    (this.state.stress === 1 && "None")
                    || (this.state.stress === 2 && "A little")
                    || (this.state.stress === 3 && "Some")
                    || (this.state.stress === 4 && "A lot")
                    || (this.state.stress === 5 && "Too much")
                  }
                  </label>
                  <input
                    name="stress"
                    type="range"
                    value={this.state.stress}
                    onChange={this.handleChange}
                    max="5"
                    min="1"
                    step="1"
                    list="steplist"
                    className="form-control-range"
                  />
                  <datalist id="steplist">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </datalist>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="form-group">
          <input
            type="submit"
            className={`btn btn-primary btn-lg ${this.state.saved ? 'saved' : ''}`}
            value={this.state.saved ? "Save ✔" : "Save"}
          />
        </div>
      </form>
    );
  }
}

export default Logging;
