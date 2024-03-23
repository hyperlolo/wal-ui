interface Config {
  apiBaseUrl: string;
  weatherApi: {
    scopes: string[];
  };
}

const config: Config = {
  apiBaseUrl: "https://api.weather.gov", // Base URL for APIs
  weatherApi: {
    scopes: ["read:weather"], // Scopes for the weather API if applicable
  },
};

export default config;
