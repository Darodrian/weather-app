import React, { Component } from "react";
import { render } from "react-dom";
import Map from "./components/map";
import credentials from "./credentials";

const mapURL =
  "https://maps.googleapis.com/maps/api/js?key=" + credentials.mapsKey;

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
          googleMapURL={mapURL}
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          loadingElement={<p>Cargando...</p>}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
