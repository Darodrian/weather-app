import React from "react";
import PropTypes from "prop-types";
import LocationWeather from "./locationWeather";

function WeatherCard({ location }) {
  return <div>{location && <LocationWeather location={location} />}</div>;
}

WeatherCard.propTypes = {
  location: PropTypes.string.isRequired,
};

export default WeatherCard;
