import React, { Component, useRef } from "react";
import TimePicker from "react-time-picker";
import Moment from "moment";

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
  useCircularInputContext,
  useCircularDrag
} from "react-circular-input";

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

    const CenterText = (props) => {
      var diff = () => {
      if(props.end > props.start){
        return `${Moment.duration({hours: props.end.hours() - props.start.hours()}).humanize()} ${Moment.duration({minutes: props.end.minutes() - props.start.minutes()}).humanize()}`;
      }
      else{
        return `${Moment.duration({hours: 24 + props.end.hours() - props.start.hours()}).humanize()} ${Moment.duration({minutes: props.end.minutes() - props.start.minutes()}).humanize()}`;
      }
    }
      return (
        <text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold">
          {diff()}
        </text>
      );
    };
    const CustomProgress = (props) => {
      const {value, radius, center } = useCircularInputContext()
      const innerCircumference = (Math.PI * 360)

      var duration = () =>{ 
        if(props.start > props.end && props.start < 1 ){
          return  1 - (props.end + (1 - props.start)) / 1.8
        }
        else if(props.start > props.end && props.start < 2 ){
          return  1 - (props.end + (2 - props.start)) / 1.8
        }
        return 1 - (props.end - props.start) / 1.8
      }
      console.log(duration())
      var degrees = () =>{ 
        if(props.start < 1){
          return (360 * props.start) - 90
        }
        return (360 * props.start) + 270
      }
      console.log(degrees())
      return (
        <CircularTrack
          {... props}
          stroke= {'#3D99FF'}
          strokeDasharray={innerCircumference}
          strokeDashoffset={innerCircumference * duration()}
          transform={`rotate(${(degrees())} ${center.x} ${center.y})`}
        />
      )
    };
    const CustomThumb = () => {
      const { getPointFromValue } = useCircularInputContext();
      const { x, y } = getPointFromValue();

      const ref = useRef(CircularInput);
      useCircularDrag(ref);

      return <circle ref={ref} cx={x} cy={y} r={20} />;
    };

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
        <div className="form-group">
          <CircularInput
            value={
              Moment(this.state.waketime, "hh:mm").hours() / 12 +
              Moment(this.state.waketime, "hh:mm").minutes() / 720
            }
            onChange={this.handleCircle}
          >
            <CircularTrack />
            <CustomProgress end={
              Moment(this.state.waketime, "hh:mm").hours() / 12 +
              Moment(this.state.waketime, "hh:mm").minutes() / 720
            } start={
              Moment(this.state.bedtime, "hh:mm").hours() / 12 +
              Moment(this.state.bedtime, "hh:mm").minutes() / 720
            } />
            <CircularThumb/>
            <CircularInput
              value={
                Moment(this.state.bedtime, "hh:mm").hours() / 12 +
                Moment(this.state.bedtime, "hh:mm").minutes() / 720
              }
              onChange={this.handleCustom}
            >
              <CustomThumb/>
            </CircularInput>
            <CenterText end={
              Moment(this.state.waketime, "hh:mm")
            } start={
              Moment(this.state.bedtime, "hh:mm")
            } />
          </CircularInput>
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
