import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Moment from 'moment';

class App extends Component {
  state = {
    today: new Moment()
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Hypnos</h1>
        </header>
        <Days today={this.state.today}/>
        <Logging day={this.state.today}/>
      </div>
    );
  }
}

class Days extends Component{
  render(){
    function weekdays(moment){
      var array = []
      for (var i = 0; i < 7; i++) {
        array.push(moment.subtract(i, "days").format("dddd"))
    }
    return array;
  }
    return(
      <div>
        <p>Today is {this.props.today.format("dddd")}</p>
        {weekdays(this.props.today)}
      </div>
    )
  }
}

class Logging extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      today: this.props.day,
      bedTime:'23:00',
      wakeTime:"07:30",
      rating:"75"
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name + " " + e.target.value);
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(){
    var object = {};
    object.bedTime = this.state.bedTime;
    object.waketime = this.state.wakeTime;
    object.rating = this.state.rating;

    localStorage.setItem(this.state.today, object)
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
        <span>
          <label>I went to bed at</label>
          <input type="time" name="bedTime" onChange={this.handleChange} value={this.state.bedTime}/>
        </span>
        <span>
          <label>and woke up</label>
          <input type="time" name="wakeTime" onChange={this.handleChange} value={this.state.wakeTime}/>
        </span>
        <input name="rating" type="range" defaultValue={this.state.rating} onChange={this.handleChange}/>
        <input type="submit" value="Save" />
        </div>
      </form>

    )
  }
}

export default App;
