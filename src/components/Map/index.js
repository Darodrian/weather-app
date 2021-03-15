import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { formatRelative } from "date-fns";
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
  const [selected, setSelected] = React.useState(null);
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
          onClick={() => {
            setSelected(marker);
          }}
        />
      ))}

      {selected ? (
      <InfoWindow 
      position={{ lat: selected.lat, lng: selected.lng }}
      onCloseClick={() => {
        setSelected(null);
      }}
      >
        <div>
          <h2>Hola</h2>
          <p>Marked {formatRelative(selected.time, new Date())}</p>
        </div>
      </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));