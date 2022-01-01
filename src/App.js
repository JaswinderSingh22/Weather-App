import React, { Component } from 'react'
import './App.css';
import { Weather } from './Weather.js';
import { Form } from './Form';
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css"

// api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_Key = "e4ae41adf2c5e12fd01e7d271fbf4d54";


class App extends Component {
  constructor() {
    super()

    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      Temp_max: undefined,
      Temp_min: undefined,
      Description: "",
      error: false
    }
    // this.Getweather();
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-strom-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calcCelsius(temp) {
    let cel = Math.floor(temp - 273.5);
    return cel;
  }

  get_Weathericon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId == 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  Getweather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (country && city) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`)
      const response = await api_call.json();
      console.log(response);

      this.setState({
        
        city: `${response.name},${response.sys.country}`,
        celsius: this.calcCelsius(response.main.temp),
        Temp_min: this.calcCelsius(response.main.temp_min),
        Temp_max: this.calcCelsius(response.main.temp_max),
        Description: response.weather[0].description,
        error:false


      });
      this.get_Weathericon(this.weatherIcon, response.weather[0].id);
    }else{
      this.setState({error:true});
    }
  };
  render() {
    return (
      <div className="App">
        <Form loadweather={this.Getweather} error={this.state.error} />
        <Weather  city={this.state.city}
          country={this.state.country}
          celsius={this.state.celsius}
          Temp_min={this.state.Temp_min}
          Temp_max={this.state.Temp_max}
          Description={this.state.Description}
          weatherIcon={this.state.icon}
        />

      </div>
    )
  }
}



export default App;
