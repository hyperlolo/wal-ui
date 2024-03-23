interface Config {
  apiBaseUrl: string;
  weatherApi: {
    endpoint: string;
    scopes: string[];
  };
  // You can add more API configurations here
}

const config: Config = {
  apiBaseUrl: "https://api.weather.gov", // Base URL for APIs
  weatherApi: {
    endpoint: "/points", // Endpoint for the weather API
    scopes: ["read:weather"], // Scopes for the weather API if applicable
  },
  // Add more API configurations as needed
};

export default config;
