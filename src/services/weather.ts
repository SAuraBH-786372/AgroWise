/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents weather information, including temperature, rainfall, and humidity.
 */
export interface Weather {
  /**
   * The temperature in Celsius.
   */
  temperatureCelsius: number;
  /**
   * The amount of rainfall in mm.
   */
  rainfallMm: number;
  /**
   * The humidity as a percentage.
   */
  humidityPercent: number;
  /**
   * Weather condition description
   */
  condition: string;
}

/**
 * Asynchronously retrieves weather information for a given location.
 *
 * @param city The city for which to retrieve weather data.
 * @param country The country for which to retrieve weather data.
 * @returns A promise that resolves to a Weather object containing temperature, rainfall, and humidity.
 */
export async function getWeather(city: string, country: string): Promise<Weather | null> {
  const apiKey = 'e5e31e02c33e648617a83557ee6283d5';
  if (!apiKey) {
    console.error("OpenWeather API key not found.");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      console.error(`Error fetching weather data: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data) {
          return {
            temperatureCelsius: data.main?.temp,
            rainfallMm: data.rain?.['1h'] || 0,
            humidityPercent: data.main?.humidity,
            condition: data.weather?.[0]?.description,
          };
    }
      return null
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

/**
 * Represents the weather forecast for a single day.
 */
export interface DailyForecast {
  /**
   * The day of the week.
   */
  day: string;
  /**
   * The temperature in Celsius.
   */
  temperatureCelsius: number;
  /**
   * The amount of rainfall in mm.
   */
  rainfallMm: number;
   /**
   * The humidity as a percentage.
   */
  humidityPercent: number;
  /**
   * Weather condition description.
   */
  condition: string;
}

/**
 * Asynchronously retrieves the weekly weather forecast for a given location.
 *
 * @param city The city for which to retrieve weather forecast data.
 * @param country The country for which to retrieve weather forecast data.
 * @returns A promise that resolves to an array of DailyForecast objects.
 */
export async function getWeeklyWeatherForecast(city: string, country: string): Promise<DailyForecast[]> {
  const apiKey = 'e5e31e02c33e648617a83557ee6283d5';
  if (!apiKey) {
    console.error("OpenWeather API key not found.");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      console.error(`Error fetching weekly weather forecast: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
      const dailyData = data.list?.filter((item: any, index: number) => index % 8 === 0) ?? [];

      const forecast = dailyData.map((item: any) => ({
        day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
        temperatureCelsius: item.main?.temp,
        rainfallMm: item.rain?.['3h'] || 0,
        humidityPercent: item.main?.humidity,
        condition: item.weather?.[0]?.description,
      }));
      return forecast;
  } catch (error) {
    console.error("Error fetching weekly weather forecast:", error);
    return [];
  }
}
