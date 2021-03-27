import React, { Component } from "react";

import Sidebar from "./sidebar";
import Body from "./body";

export default class Layout extends Component {
  render() {
    return (
      <div className="content">
        <div className="leftContainer">
          <Body />
        </div>
        <div className="rightContainer">
          <Sidebar />
        </div>
      </div>
    );
  }
}
