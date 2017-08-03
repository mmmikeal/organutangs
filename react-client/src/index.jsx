import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import Map from './components/Map.jsx';
import MeetUpForm from './components/MeetUpForm.jsx';
import Title from './components/Title.jsx';
import LoginViewController from './components/LoginViewController.jsx';
import sampleData from './sampleData.js';
const io = require('socket.io-client');
const socket = io();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: sampleData,
      meetingLocations: [{ id: 'tacos-y-quesadillas-mexico-manhattan',
        name: 'Tacos Y Quesadillas Mexico',
        image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/drLoFbH5OHpiptuadnXw_A/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/tacos-y-quesadillas-mexico-manhattan?adjust_creative=TuI7KPQ2iOcLaRBdE3LpMA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TuI7KPQ2iOcLaRBdE3LpMA',
        review_count: 37,
        categories: [ [Object] ],
        rating: 4.5,
        coordinates: { latitude: 40.7687515765429, longitude: -73.9850422739983 },
        transactions: [],
        price: '$',
        location:
        { address1: '924 9th Ave',
          address2: '',
          address3: '',
          city: 'Manhattan',
          zip_code: '10019',
          country: 'US',
          state: 'NY',
          display_address: [Array] },
        phone: '',
        display_phone: '',
        distance: 309.03863120119996 }],
      auth: false
    };

    this.setAuth = this.setAuth.bind(this);
  }

  handleClick(item) {
    console.log(item);
  }

  componentDidMount() {
    socket.on('meeting locations', (data) => {
      console.log('data', data);
      this.setState({ meetingLocations: data });
    })

  }

  setAuth(input) {
    this.setState({auth: input});
  }

  render () {
    return (
      <div>
       <LoginViewController isLoggedIn={this.state.auth} setAuth={this.setAuth}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));