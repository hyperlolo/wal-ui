// src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppBar } from "./components"; // Adjust the path as necessary
import { Docs, WeatherPage } from "./pages"; // Adjust the path as necessary
import Home from "./App"; // Adjust the path as necessary

const AppRoutes = () => {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
