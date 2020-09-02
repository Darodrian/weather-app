import React, { Component } from "react";
import { render } from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../../style/main.css";

import Layout from "./layout";

class App extends Component {
  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
