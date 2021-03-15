import React, { Component } from "react";

import Map from "../../../Map";
import Search from "../../../Search";

const API_URL =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default class Body extends Component {
  render() {
    return (
      <div>
        <Search />
        <Map
          googleMapURL={API_URL}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          loadingElement={<p>Loading...</p>}
        />
      </div>
    );
  }
}
