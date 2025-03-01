
import Sidebar from '../../components/ui/sidebar';
import WeatherPage from '../../components/Weather';

export default function WeatherPageLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 ">
      <Sidebar activePage="weather" />
      <WeatherPage />
    </div>
  );
}