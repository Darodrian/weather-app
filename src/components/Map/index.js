import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import mapStyle from "../../style/mapStyle";

const Map = (props) => {
  const center = {
    lat: -33.492,
    lng: -70.555115,
  };
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const [markers, setMarkers] = React.useState([]);
  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.time.toISOString()}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));
