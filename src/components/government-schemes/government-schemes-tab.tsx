"use client";

import React, { useState } from "react";
import { getGovernmentSchemes as getAISchemes, GovernmentSchemesInput } from "@/ai/flows/government-schemes-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";

const GovernmentSchemesTab = () => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [schemes, setSchemes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSchemes(null);

    const input: GovernmentSchemesInput = {
      location,
      query,
    };

    try {
      const result = await getAISchemes(input);
      setSchemes(result.schemes);
      if (!result || !result.schemes) {
        setError("No schemes found for the given inputs. Please try different criteria.");
        toast({
          title: "No Schemes",
          description: "No schemes were found. Try different input criteria.",
        });
      }
    } catch (err: any) {
      console.error("Error getting government schemes:", err);
      setError(`Failed to get government schemes: ${err.message || 'Unknown error'}. Please try again.`);
      toast({
        title: "Error",
        description: `Failed to get government schemes: ${err.message || 'Unknown error'}.`,
        variant: "destructive",
      });
      setSchemes(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AI Government Schemes</CardTitle>
          <CardDescription>
            Enter details to get tailored information on government schemes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground">
                Location
              </label>
              <Input
                type="text"
                id="location"
                placeholder="e.g., Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-foreground">
                Specific Query
              </label>
              <Textarea
                id="query"
                placeholder="e.g., subsidies for fertilizer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Skeleton className="h-5 w-5 mr-2" />
                  Getting Schemes...
                </>
              ) : (
                "Get Schemes"
              )}
            </Button>
            {error &&
              <>
                <p className="text-red-500 text-sm mt-2">{error}</p>
                
              </>
            }
          </form>
        </CardContent>
      </Card>

      {schemes && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Government Schemes</h2>
          <Card className="shadow-md rounded-lg">
            <CardContent>
              {loading ? (
                <Skeleton className="h-6 w-full" />
              ) : error ? (
                <>
                  <p className="text-red-500 text-sm">{error}</p>
                  
                </>
              ) : (
                <>
                  <p className="text-sm">{schemes}</p>
                  
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Useful Resources</h2>
        <Card className="shadow-md rounded-lg overflow-hidden">
          <CardHeader className="px-6 py-4 bg-secondary/50">
            <CardTitle className="text-lg">Key Agricultural Websites</CardTitle>
            <CardDescription>Official resources for farmers</CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Icons.externalLink className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="https://agricoop.nic.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  Ministry of Agriculture & Farmers Welfare
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icons.externalLink className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="https://farmer.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  Farmers' Portal - Official Information Source
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icons.externalLink className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="https://pib.gov.in/indexd.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  Press Information Bureau - Agricultural News & Updates
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2 border-t mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open("https://farmer.gov.in/FarmerHome.aspx", "_blank")}
                >
                  <Icons.externalLink className="h-4 w-4 mr-2" /> Apply for Schemes Online
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {schemes && schemes.length > 0 && (
        <div className="space-y-4 animate-fadeIn">
          <Card className="shadow-sm border rounded-xl overflow-hidden">
            <CardHeader className="px-6 py-4 bg-secondary/50">
              <CardTitle className="text-lg">Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <p className="text-sm mb-4">
                For more information about agricultural schemes and benefits, visit these official government websites:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icons.externalLink className="h-4 w-4 text-primary" />
                  <a 
                    href="https://agricoop.nic.in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Ministry of Agriculture & Farmers Welfare (India)
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.externalLink className="h-4 w-4 text-primary" />
                  <a 
                    href="https://farmer.gov.in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Farmers' Portal
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.externalLink className="h-4 w-4 text-primary" />
                  <a 
                    href="https://pmkisan.gov.in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.externalLink className="h-4 w-4 text-primary" />
                  <a 
                    href="https://pgsindia-ncof.gov.in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Organic Farming Portal
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemesTab;
