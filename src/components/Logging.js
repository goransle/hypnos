import React, { Component } from "react";
import TimePicker from 'react-time-picker';

import {
	CircularInput,
	CircularTrack,
	CircularProgress,
  CircularThumb,
  useCircularInputContext
} from 'react-circular-input';

class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bedtime: '',
      waketime: '',
      rating: 0,
      troubleSleeping: 0
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.data !== prevProps.data) {
      this.setState({
        bedtime: this.props.data.bedtime,
        waketime: this.props.data.waketime,
        rating: this.props.data.rating,
        troubleSleeping: this.props.data.troubleSleeping
      })
    }
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCircle = (e, n) =>{
    console.log(e)
    this.setState({rating: Math.round(e * 10)})
  }

  handleBedtime = value =>{
    this.setState({ bedtime: value })
  }
  handleWaketime = value =>{
    this.setState({ waketime: value })
  }

  handleClick = e =>{
    console.log(e.target);
    if(e.target.innerHTML === "No"){
      this.setState({troubleSleeping: 0})
      console.log("what")}
    else if(e.target.innerHTML === "Yes")
      this.setState({troubleSleeping: 1})
  }

  onSubmit = form => {
    this.props.inputHandler(this.state)
  };
  
  render() {
    var {data} = this.props
    
    const CenterText = () => {
      const {value} = useCircularInputContext()
    
      return (
        <text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold">
			    {Math.round(value * 10)}
		    </text>
      )
    }

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <div className="form-group">
            <label>I went to bed at</label>
            <TimePicker
              name="bedtime"
              onChange={this.handleBedtime}
              value={data.bedtime}
              disableClock={true}
              locale={"en-GB"}
            />
            <label style={{"paddingLeft": "1em"}}>and woke up</label>
            <TimePicker
              type="time"
              name="waketime"
              onChange={this.handleWaketime}
              value={data.waketime}
              disableClock={true}
              locale={"en-GB"}
            />
          </div>
          <div className="form-group">
          <CircularInput value={this.state.rating / 10} onChange={this.handleCircle}>
            <CircularTrack />
            <CircularProgress />
            <CircularThumb />
            <CenterText />
          </CircularInput>
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
            <label htmlFor="">Did you have trouble with getting to sleep?</label>
            <br/>
            <div className="btn-group" data-toggle="buttons">
            <button type="button" className={"btn btn-primary btn-lg" + (this.state.troubleSleeping ? '' : ' active')} onClick={this.handleClick}>No</button>
            <button type="button" className={"btn btn-primary btn-lg" + (this.state.troubleSleeping ? ' active' : '')} onClick={this.handleClick}>Yes</button>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" className={"btn btn-primary btn-lg"} value="Save" />
          </div>
        </div>
      </form>
    );
  }
}

export default Logging;
