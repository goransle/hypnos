import React, { Component } from "react";
import "./App.css";
import Moment from "moment";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Logging from "./components/Logging";
import Days from "./components/Days";
import Header from "./components/Header";
import History from "./components/History";

import localForage from "localforage";

const today = Moment();
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

class App extends Component {
  constructor(props) {
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

  onChange = date => {
    this.setState({ selectedDay: date });
    //setting default data
    // this.setState({ logData: defaultData });
    //gets stuff from storage
    localForage.getItem(date).then(item => {
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
