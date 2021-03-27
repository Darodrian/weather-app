import React, { Component } from "react";
import WeatherCard from "../../../Map/weatherCard";

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <h1>Sidebar</h1>
        <WeatherCard location={"Santiago, Chile"} />
      </div>
    );
  }
}
