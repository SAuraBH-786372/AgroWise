"use client";

import React, { useState } from "react";
import { getFarmingAdvice, FarmingAdviceInput, FarmingAdviceOutput } from "@/ai/flows/farming-advice-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";

const FarmingAdviceTab = () => {
  const [cropType, setCropType] = useState("");
  const [region, setRegion] = useState("");
  const [query, setQuery] = useState("");
  const [advice, setAdvice] = useState<FarmingAdviceOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAdvice(null);

    const input: FarmingAdviceInput = {
      cropType,
      region,
      query,
    };

    try {
      const result = await getFarmingAdvice(input);
      setAdvice(result);
      if (!result || !result.advice) {
        setError("No advice found for the given inputs. Please try different criteria.");
        toast({
          title: "No Advice",
          description: "No advice was suggested. Try different input criteria.",
        });
      }
    } catch (err: any) {
      console.error("Error getting farming advice:", err);
      setError(`Failed to get farming advice: ${err.message || 'Unknown error'}. Please try again.`);
      toast({
        title: "Error",
        description: `Failed to get farming advice: ${err.message || 'Unknown error'}.`,
        variant: "destructive",
      });
      setAdvice(null);
    } finally {
      setLoading(false);
    }
  };

  const commonQueries = [
    "Best time to fertilize",
    "How to prevent pests",
    "Irrigation techniques",
    "Optimal harvesting time",
    "Dealing with weather challenges",
    "Organic farming practices"
  ];

  const setQueryHelper = (q: string) => {
    setQuery(q);
  };

  return (
    <div className="p-6 space-y-8">
      <Card className="shadow-sm border rounded-xl overflow-hidden">
        <CardHeader className="px-6 py-5 bg-secondary/50">
          <CardTitle className="text-xl font-medium">Expert Farming Advice</CardTitle>
          <CardDescription>Get personalized farming advice from our AI agricultural assistant</CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="cropType" className="text-sm font-medium">
                Crop Type
              </label>
              <Input
                id="cropType"
                type="text"
                placeholder="e.g., Rice, Wheat, Cotton"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="input-focus"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="region" className="text-sm font-medium">
                Farming Region
              </label>
              <Input
                id="region"
                type="text"
                placeholder="e.g., Punjab, Maharashtra, Midwest"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="input-focus"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="query" className="text-sm font-medium">
                Your Farming Question
              </label>
              <Textarea
                id="query"
                placeholder="Ask any farming related question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[100px] input-focus resize-none"
              />
              
              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Common Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {commonQueries.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQueryHelper(q)}
                      className="text-xs bg-secondary px-3 py-1 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="px-6 py-4 bg-background border-t">
          <Button 
            onClick={handleSubmit} 
            disabled={loading || !cropType || !region || !query} 
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Icons.spinner className="h-4 w-4 animate-spin" />
                <span>Getting Expert Advice...</span>
              </div>
            ) : "Get Farming Advice"}
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
      
      {advice && advice.advice && (
        <div className="animate-fadeIn">
          <Card className="overflow-hidden shadow-sm">
            <CardHeader className="px-6 py-5 bg-primary/10">
              <div className="flex items-center gap-3">
                <Icons.leaf className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Expert Advice</CardTitle>
              </div>
              <CardDescription>
                Advice for {cropType} farming in {region}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-6 py-6">
              <div className="prose prose-green dark:prose-invert max-w-none">
                <p className="leading-relaxed">{advice.advice}</p>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 py-4 bg-secondary/30 border-t">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Need more specific advice? Try asking a more detailed question.
                </p>
                <Button variant="outline" size="sm">
                  Save Advice
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FarmingAdviceTab;
