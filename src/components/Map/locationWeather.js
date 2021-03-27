import React from "react";
import PropTypes from "prop-types";
import getLocationWeather from "./getLocationWeather";

function LoadingIndicator({ isLoading }) {
  return isLoading ? <div>Loading...</div> : null;
}

function ErrorMessage({ apiError }) {
  if (!apiError) return null;

  return (
    <>
      <div>{apiError}</div>
    </>
  );
}

function WeatherDisplay({ weatherData }) {
  const { temp } = React.useMemo(() => {
    return {
      temp:
        weatherData.main && weatherData.main.temp
          ? Math.round(weatherData.main.temp).toString()
          : "",
    };
  }, [weatherData]);

  return <>{temp && <h1>{temp}&deg;C</h1>}</>;
}

function LocationWeather({ location }) {
  const [weatherData, setWeatherData] = React.useState({});
  const [apiError, setApiError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const loadingIndicatorTimeout = setTimeout(() => setIsLoading(true), 500);
    const getWeather = async () => {
      const result = await getLocationWeather(location);
      clearTimeout(loadingIndicatorTimeout);
      setIsLoading(false);
      setWeatherData(result.success ? result.data : {});
      setApiError(result.success ? "" : result.error);
    };

    getWeather();
    return () => clearTimeout(loadingIndicatorTimeout);
  }, [location]);

  return (
    <>
      <div>{location}</div>
      <div>
        <LoadingIndicator isLoading={isLoading} />
        <ErrorMessage apiError={apiError} />
        <WeatherDisplay weatherData={weatherData} />
      </div>
    </>
  );
}

LocationWeather.propTypes = {
  location: PropTypes.string.isRequired,
};

export default LocationWeather;
