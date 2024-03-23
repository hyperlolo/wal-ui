export interface WeatherPageProps {
  className?: string;
}

export function WeatherPage({ className }: WeatherPageProps): JSX.Element {
  return (
    <div>
      <h1>Weather</h1>
      <p>Weather coming soon!</p>
    </div>
  );
}
