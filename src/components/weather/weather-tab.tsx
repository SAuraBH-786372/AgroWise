"use client";

import React, { useState, useEffect } from "react";
import { Weather, DailyForecast, getWeather, getWeeklyWeatherForecast } from "@/services/weather";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { suggestCrops } from "@/ai/flows/crop-suggestion";
import { CropSuggestionOutput } from "@/ai/flows/crop-suggestion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const WeatherTab = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [cropSuggestions, setCropSuggestions] = useState<CropSuggestionOutput | null>(null);

  const handleWeatherSearch = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setWeeklyForecast([]);
    setCropSuggestions(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeather(city, country),
        getWeeklyWeatherForecast(city, country)
      ]);

      setWeather(weatherData);
      setWeeklyForecast(forecastData);

      if (!weatherData && !forecastData.length) {
        toast({
          title: "Weather Error",
          description: "Could not retrieve weather data for the specified location.",
          variant: "destructive",
        });
      }

      // Fetch crop suggestions based on weather data
      if (weatherData) {
        const season = getSeasonFromMonth(new Date().getMonth());
        const suggestions = await suggestCrops({
          soilType: "loam", // Default soil type, can be made dynamic
          location: `${city}, ${country}`,
          season: season,
        });
        setCropSuggestions(suggestions);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again later.");
      toast({
        title: "Weather Error",
        description: "Failed to retrieve weather data. Please check your inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeasonFromMonth = (month: number) => {
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    if (month >= 8 && month <= 10) return "Autumn";
    return "Winter";
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes("rain")) {
      return <Icons.cloudRain className="h-10 w-10 text-blue-500" />;
    } else if (condition.toLowerCase().includes("cloud")) {
      return <Icons.cloud className="h-10 w-10 text-gray-500" />;
    } else if (condition.toLowerCase().includes("sun") || condition.toLowerCase().includes("clear")) {
      return <Icons.sun className="h-10 w-10 text-yellow-500" />;
    } else if (condition.toLowerCase().includes("snow")) {
      return <Icons.cloudSnow className="h-10 w-10 text-blue-200" />;
    } else if (condition.toLowerCase().includes("thunder")) {
      return <Icons.cloudLightning className="h-10 w-10 text-purple-500" />;
    } else {
      return <Icons.cloud className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-8">
      <Card className="shadow-sm border rounded-xl overflow-hidden">
        <CardHeader className="px-6 py-5 bg-secondary/50">
          <CardTitle className="text-xl font-medium">Weather Forecast</CardTitle>
          <CardDescription>Enter your location to get weather forecasts and insights</CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <Input
                id="city"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-focus"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <Input
                id="country"
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input-focus"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 bg-background border-t">
          <Button 
            onClick={handleWeatherSearch} 
            disabled={loading} 
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Icons.spinner className="h-4 w-4 animate-spin" />
                <span>Fetching Weather...</span>
              </div>
            ) : "Get Weather Forecast"}
          </Button>
        </CardFooter>
      </Card>
      
      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg p-4 border border-destructive/20">
          <div className="flex items-start gap-3">
            <Icons.alertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {(weather || weeklyForecast.length > 0) && (
        <div className="space-y-6 animate-fadeIn">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="current">Current Weather</TabsTrigger>
              <TabsTrigger value="forecast">Weekly Forecast</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="mt-4 space-y-4">
              {weather && (
                <Card className="overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b">
                    <h3 className="text-lg font-medium">
                      Current Weather in {city}, {country}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      As of {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <CardContent className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                          {getWeatherIcon(weather.condition)}
                        </div>
                        <div>
                          <h4 className="text-3xl font-bold">{weather.temperatureCelsius}°C</h4>
                          <p className="text-muted-foreground">{weather.condition}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-center text-center">
                          <Icons.droplets className="h-8 w-8 text-blue-500 mb-2" />
                          <span className="text-xl font-medium">{weather.rainfallMm} mm</span>
                          <span className="text-sm text-muted-foreground">Rainfall</span>
                        </div>
                        
                        <div className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-center text-center">
                          <Icons.droplets className="h-8 w-8 text-blue-400 mb-2" />
                          <span className="text-xl font-medium">{weather.humidityPercent}%</span>
                          <span className="text-sm text-muted-foreground">Humidity</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  {cropSuggestions && cropSuggestions.crops && cropSuggestions.crops.length > 0 && (
                    <div className="px-6 py-5 border-t">
                      <h4 className="text-lg font-medium mb-3">Recommended Crops Based on Weather</h4>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hidden">
                        <div 
                          className="flex-shrink-0 p-3 bg-secondary rounded-lg w-56 border"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Icons.leaf className="h-5 w-5 text-primary" />
                            <h5 className="font-medium truncate">Radish</h5>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Growth: 3-4 weeks</p>
                          <p className="text-xs text-muted-foreground">Value: INR 10-15/kg</p>
                        </div>
                        
                        {cropSuggestions.crops.slice(0, 3).map((crop, idx) => (
                          <div 
                            key={idx} 
                            className="flex-shrink-0 p-3 bg-secondary rounded-lg w-56 border"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icons.leaf className="h-5 w-5 text-primary" />
                              <h5 className="font-medium truncate">{crop.name}</h5>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              Growth: {crop.growthDuration}
                              {!crop.growthDuration.toLowerCase().includes('month') && 
                               !crop.growthDuration.toLowerCase().includes('week') && 
                               !crop.growthDuration.toLowerCase().includes('day') ? ' months' : ''}
                            </p>
                            <p className="text-xs text-muted-foreground">Value: {crop.marketValue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="forecast" className="mt-4">
              {weeklyForecast.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                  {weeklyForecast.map((forecast, index) => (
                    <Card key={index} className="overflow-hidden shadow-sm card-hover">
                      <div className="p-4 bg-secondary/50 text-center border-b">
                        <h4 className="font-medium">{forecast.day}</h4>
                      </div>
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        {getWeatherIcon(forecast.condition)}
                        <div className="mt-3">
                          <p className="text-2xl font-bold">{forecast.temperatureCelsius}°C</p>
                          <p className="text-sm text-muted-foreground">{forecast.condition}</p>
                        </div>
                        <div className="flex flex-col gap-1 mt-3 w-full">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center">
                              <Icons.droplets className="h-3 w-3 mr-1" /> Rainfall
                            </span>
                            <span>{forecast.rainfallMm} mm</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center">
                              <Icons.droplets className="h-3 w-3 mr-1" /> Humidity
                            </span>
                            <span>{forecast.humidityPercent}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default WeatherTab;
