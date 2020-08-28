import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Map = (props) => {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: -33.492, lng: -70.555115 }}
    />
  );
};

export default withScriptjs(withGoogleMap(Map));
