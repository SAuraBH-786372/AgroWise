"use client";

import React, { useState, useEffect } from "react";
import { getCropPrices, CropPricesInput, CropPricesOutput } from "@/ai/flows/crop-prices-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Info, Calendar, MapPin } from "lucide-react";

interface CropPrice {
  crop: string;
  market: string;
  price: string;
  date: string;
}

const CropPricesTab = () => {
  const [query, setQuery] = useState("");
  const [prices, setPrices] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [hasEstimatedData, setHasEstimatedData] = useState(false);
  const { toast } = useToast();

  // Map for common state name spelling corrections
  const stateSpellingCorrections: Record<string, string> = {
    'andra pradesh': 'andhra pradesh',
    'andrha': 'andhra',
    'tamilnadu': 'tamil nadu',
    'telegana': 'telangana',
    'telengana': 'telangana',
    'karnatka': 'karnataka',
    'karnata': 'karnataka',
    'kerela': 'kerala',
    'chatisgarh': 'chhattisgarh',
    'chattisgarh': 'chhattisgarh',
    'maharastra': 'maharashtra',
    'gujrat': 'gujarat',
    'uttarpradesh': 'uttar pradesh',
    'U.P.': 'uttar pradesh',
    'UP': 'uttar pradesh',
    'madhyapradesh': 'madhya pradesh',
    'M.P.': 'madhya pradesh',
    'MP': 'madhya pradesh',
    'jammu kashmir': 'jammu and kashmir',
  };

  const correctStateSpelling = (input: string): string => {
    let corrected = input.toLowerCase();
    
    for (const [misspelled, correct] of Object.entries(stateSpellingCorrections)) {
      corrected = corrected.replace(new RegExp(`\\b${misspelled}\\b`, 'gi'), correct);
    }
    
    return corrected;
  };

  const suggestQueries = (): string[] => {
    return [
      "Rice price in Andhra Pradesh",
      "Wheat price in Punjab",
      "Tomato price in Karnataka",
      "Onion price in Maharashtra",
      "Potato price in Uttar Pradesh",
      "Soybean price in Madhya Pradesh",
      "Cotton price in Gujarat",
      "Sugarcane price in Tamil Nadu",
      "Maize price in Bihar"
    ];
  };

  const parseAIResponse = (response: string, cropName: string): CropPrice[] => {
    // Check if we have estimated data
    const isEstimated = response.toLowerCase().includes('estimated');
    setHasEstimatedData(isEstimated);
    
    // Parse the response lines
    const standardFormat = response.split('\n')
      .filter(line => line.trim().length > 0) // Skip empty lines
      .map(line => {
        // Try to match the pattern "Market: Price (Date)" or "Market: Price"
        const datePattern = /^(.+?):\s*(.+?)(?:\s*\((.+?)\))?$/;
        const match = line.match(datePattern);
        
        if (match) {
          const [_, market, price, date] = match;
          return {
            crop: cropName,
            market: market.trim(),
            price: price.trim(),
            date: date ? date.trim() : new Date().toLocaleDateString(),
          };
        }
        
        // Fallback to simple colon split if the regex didn't match
        const parts = line.split(':');
        if (parts.length === 2) {
          const [market, price] = parts.map(part => part.trim());
          return {
            crop: cropName,
            market: market,
            price: price,
            date: new Date().toLocaleDateString(),
          };
        }
        
        return null;
      })
      .filter(item => item !== null);
    
    if (standardFormat.length > 0) {
      return standardFormat as CropPrice[];
    }
    
    // If standard format doesn't work, try to extract any price information
    const priceRegex = /(\b₹\s*\d+(?:[,.]\d+)?|\b\d+(?:[,.]\d+)?\s*(?:rupees|INR|Rs\.?))\b/gi;
    const matches = [...response.matchAll(priceRegex)];
    
    if (matches.length > 0) {
      return matches.map((match, index) => ({
        crop: cropName,
        market: `Market ${index + 1}`,
        price: match[0],
        date: new Date().toLocaleDateString(),
      }));
    }
    
    return [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRawResponse(null);
    setPrices([]);
    setHasEstimatedData(false);

    if (!query.trim()) {
      setError("Please enter a valid crop and location query");
      setLoading(false);
      return;
    }

    // Apply spelling correction to the query
    const correctedQuery = correctStateSpelling(query.trim());
    
    // If the corrected query is different from the original, inform the user
    if (correctedQuery.toLowerCase() !== query.trim().toLowerCase()) {
      toast({
        title: "Query Corrected",
        description: `Searching for "${correctedQuery}" instead of "${query.trim()}"`,
      });
    }

    const input: CropPricesInput = {
      query: correctedQuery,
    };

    try {
      toast({
        title: "Searching...",
        description: "Searching for crop prices. This may take a moment.",
      });
      
      const aiResult: CropPricesOutput = await getCropPrices(input);
      
      // Save the raw response for debugging
      setRawResponse(aiResult.prices);
      
      // Parse the AI's response
      const parsedPrices = parseAIResponse(aiResult.prices, query);
      setPrices(parsedPrices);

      if (parsedPrices.length === 0) {
        // No structured data found
        setError(`No price data found. The AI returned: "${aiResult.prices}"`);
        toast({
          title: "No Prices Found",
          description: "Couldn't find any price information for this query.",
          variant: "destructive",
        });
      } else {
        toast({
          title: hasEstimatedData ? "Estimated Prices Found" : "Prices Found",
          description: `Found ${parsedPrices.length} price quotes for ${query}`,
        });
      }
    } catch (err: any) {
      console.error("Error getting crop prices:", err);
      setError(`Failed to get crop prices: ${err.message || 'Unknown error'}. Please try again.`);
      toast({
        title: "Error",
        description: `Failed to get crop prices: ${err.message || 'Unknown error'}.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Crop Prices</CardTitle>
          <CardDescription>
            Enter details to get real-time information on crop prices from agricultural markets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-foreground">
                Specific Query
              </label>
              <Input
                type="text"
                id="query"
                placeholder="e.g., Wheat price in Maharashtra"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Try specific queries like "Rice price in Andhra Pradesh" or "Tomato price in Karnataka"
              </p>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Skeleton className="h-5 w-5 mr-2" />
                  Searching Web for Prices...
                </>
              ) : (
                "Get Real-Time Prices"
              )}
            </Button>
            {error && (
              <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </form>
          
          {/* Suggested queries */}
          {(error || !query) && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Try these sample queries:</p>
              <div className="flex flex-wrap gap-2">
                {suggestQueries().map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuery(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {prices.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Crop Prices
            <span className="text-sm text-muted-foreground ml-2 font-normal">
              {hasEstimatedData ? '(Estimated prices)' : '(Market prices)'}
            </span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {prices.map((price, index) => (
              <Card key={index} className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle>{price.crop}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {price.market}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={`https://source.unsplash.com/400x200/?${encodeURIComponent(price.crop.split(' ')[0] + ',farm')}`}
                    alt={price.crop}
                    className="mb-4 rounded-md shadow-md"
                  />
                  <p className="text-lg font-semibold">Price: {price.price}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {price.date}
                  </p>
                  {price.date.toLowerCase().includes('estimated') && (
                    <p className="text-xs text-amber-600 mt-1">
                      This is an estimated price and may not reflect current market rates
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <h3 className="font-medium">About Data Sources</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {hasEstimatedData 
                ? "The prices shown are estimated based on available information and may not reflect exact current market conditions."
                : "The prices shown are retrieved from various web sources and may not be 100% accurate or up-to-date."
              }
              For official and most current crop prices, please visit:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              <li>
                <a href="https://agmarknet.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Agmarknet - Government Agricultural Marketing Information
                </a>
              </li>
              <li>
                <a href="https://enam.gov.in/web/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  e-NAM (National Agriculture Market)
                </a>
              </li>
              <li>
                <a href="https://farmer.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Farmers Portal - Ministry of Agriculture & Farmers Welfare
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {rawResponse && prices.length === 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Raw Response</CardTitle>
            <CardDescription>The AI returned the following information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
              {rawResponse}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropPricesTab;
