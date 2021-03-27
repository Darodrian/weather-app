import React, { Component } from "react";

import Map from "../../../Map";

const API_URL =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default class Body extends Component {
  render() {
    return (
      <Map
        googleMapURL={API_URL}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        loadingElement={<p>Loading...</p>}
      />
    );
  }
}
