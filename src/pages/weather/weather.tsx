import { useEffect, useState } from "react";
import {
  getWeatherByCoordinates,
  WeatherConditions,
} from "../../services/weather"; // Adjust the import path based on your file structure

export function WeatherPage() {
  const [weather, setWeather] = useState<WeatherConditions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const coords = { latitude: 40.712776, longitude: -74.005974 }; // Example coordinates (New York City)
      const weatherData = await getWeatherByCoordinates(coords);
      setWeather(weatherData);
      setIsLoading(false);
    } catch (e) {
      setError("Failed to fetch weather data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather Information</h1>
      {error && <p>Error: {error}</p>}
      {weather ? (
        <div>
          <p>Temperature: {weather.temperature}</p>
          <p>Wind Speed: {weather.windSpeed}</p>
          <p>Wind Direction: {weather.windDirection}</p>
          <p>Details: {weather.detailedForecast}</p>
        </div>
      ) : (
        <p>Failed to load weather data.</p>
      )}
    </div>
  );
}

export default WeatherPage;
