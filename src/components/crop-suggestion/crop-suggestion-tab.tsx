"use client";

import React, { useState } from "react";
import { suggestCrops, CropSuggestionInput, CropSuggestionOutput } from "@/ai/flows/crop-suggestion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Common soil types for the dropdown
const soilTypes = [
  "Clay", "Sandy", "Silty", "Peaty", "Chalky", "Loamy", "Clay Loam", "Sandy Loam", "Silty Loam", "Black", "Red", "Alluvial"
];

// Seasons for the dropdown
const seasons = [
  "Spring", "Summer", "Autumn", "Winter", "Rainy", "Dry"
];

const CropSuggestionTab = () => {
  const [soilType, setSoilType] = useState("");
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [suggestions, setSuggestions] = useState<CropSuggestionOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const input: CropSuggestionInput = {
      soilType,
      location,
      season,
    };

    try {
      const result = await suggestCrops(input);
      setSuggestions(result);
      if (!result || !result.crops || result.crops.length === 0) {
        setError("No crops suggested for the given inputs. Please try different criteria.");
        toast({
          title: "No Suggestions",
          description: "No crops were suggested. Try different input criteria.",
        });
      }
    } catch (err: any) {
      console.error("Error getting crop suggestions:", err);
      setError(`Failed to get crop suggestions: ${err.message || 'Unknown error'}. Please try again.`);
      toast({
        title: "Error",
        description: `Failed to get crop suggestions: ${err.message || 'Unknown error'}.`,
        variant: "destructive",
      });
      setSuggestions(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <Card className="shadow-sm border rounded-xl overflow-hidden">
        <CardHeader className="px-6 py-5 bg-secondary/50">
          <CardTitle className="text-xl font-medium">AI Crop Suggestions</CardTitle>
          <CardDescription>Get personalized crop recommendations based on your local conditions</CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="soilType" className="text-sm font-medium">
                Soil Type
              </label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger id="soilType" className="w-full input-focus">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Different soil types support different crops
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location (State/Region)
              </label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., Maharashtra, Punjab, California"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-focus"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your region's climate affects crop suitability
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="season" className="text-sm font-medium">
                Current Season
              </label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger id="season" className="w-full input-focus">
                  <SelectValue placeholder="Select current season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Growing season impacts crop selection and yield
              </p>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="px-6 py-4 bg-background border-t">
          <Button 
            onClick={handleSubmit} 
            disabled={loading || !soilType || !location || !season} 
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Icons.spinner className="h-4 w-4 animate-spin" />
                <span>Analyzing Conditions...</span>
              </div>
            ) : "Get Crop Suggestions"}
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
      
      {suggestions && suggestions.crops && suggestions.crops.length > 0 && (
        <div className="space-y-4 animate-fadeIn">
          <h2 className="text-2xl font-semibold">Recommended Crops</h2>
          <p className="text-muted-foreground">
            Based on {soilType} soil in {location} during {season} season
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.crops.map((crop, index) => (
              <Card key={index} className="overflow-hidden shadow-sm card-hover">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/400x200/?${crop.name},agriculture,farm,crop`}
                    alt={crop.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold">{crop.name}</h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Yield Estimate</span>
                      <span className="text-sm">{crop.yieldEstimate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Growth Duration</span>
                      <span className="text-sm">{crop.growthDuration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Market Value</span>
                      <span className="text-sm">{crop.marketValue}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="px-4 py-3 bg-secondary/50 border-t flex justify-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    View Detailed Guide
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropSuggestionTab;
