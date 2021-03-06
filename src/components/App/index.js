import React, { Component } from "react";
import { render } from "react-dom";
import Map from "../Map";

const API_URL =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }

  render() {
    return (
      <div>
        <Map
          googleMapURL={API_URL}
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          loadingElement={<p>Cargando...</p>}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
