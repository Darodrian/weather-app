import React from "react";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { formatRelative } from "date-fns";
import mapStyle from "../../style/mapStyle";

import Search from "../Search";
import WeatherCard from "./weatherCard";

// Geocode settings
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("es");
Geocode.setRegion("es");
Geocode.setLocationType("APPROXIMATE");

// Local storage
const LOCAL_STORAGE_KEY = "locations";
function saveToLocalStorage(locations) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
}
function readFromLocalStorage() {
  const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedLocations ? JSON.parse(storedLocations) : [];
}

const Map = (props) => {
  // Map settings
  const center = {
    lat: -33.4489,
    lng: -70.6693,
  };
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
  };

  // Markers
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  // Map reference
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Map relocation
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  // Open Weather
  const [weatherLocations, setWeatherLocations] = React.useState(
    readFromLocalStorage()
  );
  const updateLocations = (locations) => {
    setWeatherLocations(locations);
    saveToLocalStorage(locations);
  };
  const removeAtIndex = (index) => () =>
    updateLocations(
      weatherLocations.filter((_, locationIndex) => locationIndex !== index)
    );
  const updateAtIndex = (index) => (updatedLocation) =>
    updateLocations(
      weatherLocations.map((location, locationIndex) =>
        locationIndex === index ? updatedLocation : location
      )
    );
  const canAddOrRemove = React.useMemo(
    () => weatherLocations.every((location) => location !== ""),
    [weatherLocations]
  );

  // onMapClick handler
  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
    setSelected({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    });
    Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setWeatherLocations([...weatherLocations, address]);
      },
      (error) => {
        console.error(error);
      }
    );
    // eslint-disable-next-line
  }, []);

  function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
      markers[i] = null;
    }
  }

  return (
    <>
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={{ height: "100%" }}
        zoom={10}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/marker.svg",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected
          ? weatherLocations.map((location, index) => (
              <InfoWindow
                key={index}
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <>
                  <WeatherCard
                    key={index}
                    location={location}
                    canDelete={!location || canAddOrRemove}
                    onDelete={removeAtIndex(index)}
                    onUpdate={updateAtIndex(index)}
                  />
                  <p>Marked {formatRelative(selected.time, new Date())}</p>
                </>
              </InfoWindow>
            ))
          : null}
      </GoogleMap>
    </>
  );
};

export default React.memo(Map);
