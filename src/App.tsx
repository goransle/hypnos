import React, { Component } from "react";
import "./App.css";
import moment from "moment";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Logging from "./components/Logging";
import Days from "./components/Days";
import Header from "./components/Header";
import History from "./components/History";

import localForage from "localforage";
import { Props } from "react-circular-input/dist/CircularTrack";

let today = moment();

var defaultData = {
  bedtime: "11:00",
  waketime: "07:25",
  rating: 3,
  troubleSleeping: 0,
  wakeDuring: 0,
  saved: false,
  caffeine: 1,
  exercise: 1,
  stress: 1
};

interface State {
  today: any,
  selectedDay: string,
  logData: object
}

class App extends Component <Props, State>{
  constructor(props:Props) {
    super(props);
    this.state = {
      today: today,
      selectedDay: today.format("L"),
      logData: {}
    };
  }

  componentDidMount() {
    this.onChange(this.state.selectedDay);
    console.log("loaded")
  }

  onChange = (date:string) => {
    this.setState({ selectedDay: date });
    //setting default data
    // this.setState({ logData: defaultData });
    //gets stuff from storage
    localForage.getItem(date).then((item:object) => {
      if (item) {
        this.setState({ logData: item });
      } else this.setState({ logData: defaultData });
    });
  };

  inputHandler = object => {
    localForage.setItem(this.state.selectedDay, object);
  };

  render() {
    return (
      <Router>
        <Header />
        <div className="App">
          <Route
            exact path="/"
            render={() => (
              <React.Fragment>
                <Days
                  today={this.state.today}
                  selected={this.state.selectedDay}
                  dateChange={this.onChange}
                />
                <Logging
                  day={this.state.selectedDay}
                  data={this.state.logData}
                  inputHandler={this.inputHandler}
                />
              </React.Fragment>
            )}
          />
          <Route exact path="/history" render={() => (<History />)} />
        </div>
      </Router>
    );
  }
}

export default App;
