import React, { Component } from "react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Body from "./body";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="Content">
          <div className="LeftContainer">
            <Body />
          </div>
          <div className="RightContainer">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}
