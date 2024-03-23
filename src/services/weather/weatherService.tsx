import config from "../../../config"; // Adjust the path according to your project structure
import { WeatherConditions } from "./model";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function getWeatherByCoordinates(
  coordinates: Coordinates
): Promise<WeatherConditions | null> {
  try {
    const endpoint = `${config.apiBaseUrl}${config.weatherApi.endpoint}/${coordinates.latitude},${coordinates.longitude}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error("Failed to parse response as JSON.");
    }

    if (!data.properties || !data.properties.forecast) {
      throw new Error("Invalid data structure: missing forecast information.");
    }

    const forecastResponse = await fetch(data.properties.forecast);

    if (!forecastResponse.ok) {
      throw new Error(`HTTP error! Status: ${forecastResponse.status}`);
    }

    let forecastData;
    try {
      forecastData = await forecastResponse.json();
    } catch (e) {
      throw new Error("Failed to parse forecast response as JSON.");
    }

    if (
      !forecastData ||
      !forecastData.properties ||
      !forecastData.properties.periods ||
      !forecastData.properties.periods[0]
    ) {
      throw new Error("Invalid forecast data structure.");
    }

    const currentConditions = forecastData.properties.periods[0];

    return {
      temperature: currentConditions.temperature,
      windSpeed: currentConditions.windSpeed,
      windDirection: currentConditions.windDirection,
      detailedForecast: currentConditions.detailedForecast,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
