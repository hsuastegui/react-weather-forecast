import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      forecast: {},
      ready: false,
      error: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getForecast = this.getForecast.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  getForecast(){
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    const api = '&units=metric&appid=185d4581e0ad008283b855d32de6db09';
    const url = baseUrl + this.state.city + api;
    fetch(url,{

    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      if(data.cod == 200) {
        this.setState({forecast: data, ready: true, error: ''});
      }else{
        this.setState({error: data.message});
      }
    }.bind(this));
  }
  handleInput(event){
    this.setState({
      city: event.target.value
    });
  }
  handleClear(){
    this.setState({
      city: '',
      forecast: {},
      ready: false
    });
  }
  handleSubmit(event){
    event.preventDefault();
    if(this.state.city !=='') this.getForecast();
  }
  formatTemperature(temperature){
    if(this.state.units === 'C'){
      return (temperature - 32) / 1.8;
    }else{
      return temperature;
    }
  }
  renderForecast(){
    const forecast = this.state.forecast.list.map((day, index) => {
          return(
            <div className="col s12 m4" key={index}>
              <div className="card cyan lighten-4">
                <div className="card-content">
                  <p className="card-title">{moment.unix(day.dt).format("LLLL")}</p>
                  <p>{day.weather[0].main}</p>
                  <p>Temperature: {day.main.temp} °C</p>
                  <p>Min: {day.main.temp_min} °C</p>
                  <p>Max: {day.main.temp_max} °C</p>
                </div>
              </div>
            </div>
          );
    });
    return(
      <div className="app_forecast">
        <h2>Showing forecast for: {this.state.forecast.city.name}, {this.state.forecast.city.country}</h2>
        <div className="row">{forecast}</div>
      </div>
    );
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} className="app_form">
          <div className="input-field">
            <input className="app_input" type="text" placeholder="City" id="city" value={this.state.city} onChange={this.handleInput} />
          </div>
          <p>{this.state.error}</p>
          <button className="app_btn btn waves-effect cyan darken-2" type="submit">Send</button>
          <button className="app_btn btn waves-effect deep-orange darken-3" onClick={this.handleClear}>Clear</button>
        </form>
        {this.state.ready ? this.renderForecast() : null}
      </div>
    );
  }
}

export default App;
