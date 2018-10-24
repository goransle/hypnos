import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';

import Logging from './components/Logging'
import Days from './components/Days'

import localForage from 'localforage'

const today = new Date();
var defaultData = {bedtime:"23:00", waketime: '07:25', rating:50};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: Moment(today),
      selectedDay: Moment(today),
      logData: {}
    }
    this.onChange = this.onChange.bind(this);
  }


  componentDidMount(){
    this.setState({logData: defaultData});
  }

  onChange(date) {
    this.setState({ selectedDay: Moment(date).format('L') });
    //setting default data
    this.setState({logData: defaultData});
    //gets stuff from storage
    localForage.getItem(date).then((item)=>{
      if(item){
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
          <Logging day={this.state.selectedDay} data={this.state.logData} />
      </div>
    );
  }
}

export default App;