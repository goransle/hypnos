import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Logging from './components/Logging'
import Days from './components/Days'
import Trends from './components/Trends'
import Header from './components/Header'
import History from './components/History'

import localForage from 'localforage'

const today = Moment();
var defaultData = { bedtime: "23:00", waketime: '07:25', rating: 5 };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: today,
      selectedDay: today.format('L'),
      logData: {}
    }
    this.onChange = this.onChange.bind(this);
  }


  componentDidMount() {
    this.setState({ logData: defaultData });
    this.onChange(this.state.selectedDay)
  }

  onChange(date) {
    console.log(date)
    this.setState({ selectedDay: date });
    //setting default data
    this.setState({ logData: defaultData });
    //gets stuff from storage
    localForage.getItem(date).then((item) => {
      if (item) {
        this.setState({ logData: item });
      }
    })
  }

  inputHandler = (object) => {
    localForage.setItem(this.state.selectedDay, object);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <Days today={this.state.today} selected={this.state.selectedDay} dateChange={this.onChange} />
              <Logging day={this.state.selectedDay} data={this.state.logData} inputHandler={this.inputHandler} />
              <History />
            </React.Fragment>
          )} />
        <Route path="/charts" render={props =>(
          <div className="chart"><Trends today={this.state.today} /></div>
        )} />
        </div>
      </Router>
    );
  }
}

export default App;