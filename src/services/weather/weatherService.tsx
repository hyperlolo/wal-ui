// weatherService.ts
import config from "../../../config";
import { WeatherConditions } from "./model";

// This is a base URL for the National Weather Service API.
const BASE_URL = config.apiBaseUrl;

// TypeScript interfaces to describe the data shapes
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Function to get weather conditions by coordinates
export async function getWeatherByCoordinates(
  coordinates: Coordinates
): Promise<WeatherConditions | null> {
  try {
    // Construct the URL for the weather endpoint
    const endpoint = `/points/${coordinates.latitude},${coordinates.longitude}`;
    const originalForeCastUrl = `${BASE_URL}${endpoint}`;
    console.log("originalForeCastUrl is: ", originalForeCastUrl);
    const response = await fetch(originalForeCastUrl);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // You might need to navigate the JSON structure based on the API response
    // For example, let's say the forecast URL is in data.properties.forecast
    const forecastUrl = data.properties.forecast;
    console.log("forecastUrl is: ", forecastUrl);
    const forecastResponse = await fetch(forecastUrl);
    console.log("forecastResponse is: ", forecastResponse);

    if (!forecastResponse.ok) {
      throw new Error(
        `Error fetching forecast data: ${forecastResponse.statusText}`
      );
    }

    const forecastData = await forecastResponse.json();

    // Again, this structure depends on the actual API response
    // This is an example of how you might access the current conditions
    const currentConditions = forecastData.properties.periods[0];

    // Return the weather conditions in a structured format
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
