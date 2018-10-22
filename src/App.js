import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';

import Logging from './components/Logging'
import Days from './components/Days'

import localForage from 'localforage'

const today = new Date();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: Moment(today),
      selectedDay: null,
      logData: {}
    }
    this.onChange = this.onChange.bind(this);
    this.getLocalForageData = this.getLocalForageData.bind(this);
  }

  getLocalForageData() {
    return localForage.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            return localForage.getItem(key)
                .then(function (value) {
                    return { key: key, value: value };
                });
        }));
    });
  }


  componentDidMount() {
    this.getLocalForageData()
      .then((values) => {
        console.log(values)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  onChange(date) {
    console.log(date)
    this.setState({ selectedDay: Moment(date).format('L') })
    localForage.getItem(date).then((item)=>{
      if(item != null){
        this.setState({logData: item});
        console.log(item)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Hypnos</h1>
        </header>
        <Days today={this.state.today} dateChange={this.onChange} />
        {this.state.selectedDay && 
          <Logging day={this.state.selectedDay} data={this.state.logData} />}
      </div>
    );
  }
}

export default App;