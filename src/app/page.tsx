"use client";

import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeatherTab from "@/components/weather/weather-tab";
import CropSuggestionTab from "@/components/crop-suggestion/crop-suggestion-tab";
import FarmingAdviceTab from "@/components/farming-advice/farming-advice-tab";
import GovernmentSchemesTab from "@/components/government-schemes/government-schemes-tab";
import { Toaster } from "@/components/ui/toaster";
import CropPricesTab from "@/components/crop-prices/crop-prices-tab";
import { 
  CloudSun, 
  Sprout, 
  BookOpen, 
  Building2, 
  BarChart3, 
  ChevronRight,
  ArrowRight,
  PlaneTakeoff,
  BarChart,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <CloudSun className="h-12 w-12 text-primary" />,
    title: "Real-time Weather",
    description: "Access accurate weather forecasts to make informed farming decisions."
  },
  {
    icon: <Sprout className="h-12 w-12 text-primary" />,
    title: "Crop Recommendations",
    description: "Get AI-powered crop suggestions based on your soil, climate, and location."
  },
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: "Expert Advice",
    description: "Access tailored farming advice from AI and agricultural experts."
  },
  {
    icon: <BarChart className="h-12 w-12 text-primary" />,
    title: "Market Prices",
    description: "Track real-time market prices to maximize your profits."
  }
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="hero-pattern absolute inset-0 z-0"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent z-0"
          aria-hidden="true"
        ></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent text-accent-foreground hover:bg-accent/80">
                <span>New AI-powered farming insights available</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Modern Farming,
                <span className="text-gradient"> Smarter Decisions</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                AgroWise helps farmers make data-driven decisions with AI-powered insights on weather, crop selection, and market prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="#tools-section">
                  <Button size="lg" className="gap-2 w-full">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="gap-2 w-full">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl animate-fadeIn">
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Smart Farming"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container">
          <div className="flex flex-col gap-2 text-center max-w-[800px] mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need for <span className="text-gradient">smart farming</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our platform provides comprehensive tools and insights to help you optimize your agricultural activities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-4 p-6 rounded-xl bg-card shadow-sm card-hover border"
              >
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools-section" className="py-20 scroll-mt-16">
        <div className="container">
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Farming Tools
            </h2>
            <p className="text-muted-foreground text-lg">
              Access our suite of intelligent farming tools designed to optimize your agricultural decisions
            </p>
          </div>

          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <Tabs defaultValue="weather" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto p-0 bg-muted/50 border-b rounded-none scrollbar-hidden flex-wrap md:flex-nowrap">
                <TabsTrigger 
                  value="weather" 
                  className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <CloudSun className="h-5 w-5" /> Weather Forecast
                </TabsTrigger>
                <TabsTrigger 
                  value="cropSuggestion" 
                  className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <Sprout className="h-5 w-5" /> Crop Suggestions
                </TabsTrigger>
                <TabsTrigger 
                  value="farmingAdvice" 
                  className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <BookOpen className="h-5 w-5" /> Farming Advice
                </TabsTrigger>
                <TabsTrigger 
                  value="governmentSchemes" 
                  className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <Building2 className="h-5 w-5" /> Government Schemes
                </TabsTrigger>
                <TabsTrigger 
                  value="cropPrices" 
                  className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <BarChart3 className="h-5 w-5" /> Crop Prices
                </TabsTrigger>
              </TabsList>
              <TabsContent value="weather" className="p-0 pt-1 m-0">
                <WeatherTab />
              </TabsContent>
              <TabsContent value="cropSuggestion" className="p-0 pt-1 m-0">
                <CropSuggestionTab />
              </TabsContent>
              <TabsContent value="farmingAdvice" className="p-0 pt-1 m-0">
                <FarmingAdviceTab />
              </TabsContent>
              <TabsContent value="governmentSchemes" className="p-0 pt-1 m-0">
                <GovernmentSchemesTab />
              </TabsContent>
              <TabsContent value="cropPrices" className="p-0 pt-1 m-0">
                <CropPricesTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Remove mock Stats Section and replace with more informative content */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose AgroWise</h2>
            <p className="text-muted-foreground text-lg mx-auto max-w-3xl">
              Our platform is designed to provide practical tools and information to help improve agricultural productivity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card shadow-sm border">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold">Community-Driven</h3>
              <p className="text-muted-foreground mt-2">Built with feedback from farmers across different regions</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card shadow-sm border">
              <Sprout className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold">Crop Variety</h3>
              <p className="text-muted-foreground mt-2">Information on suitable crops for different soil and climate conditions</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card shadow-sm border">
              <PlaneTakeoff className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold">Global Insights</h3>
              <p className="text-muted-foreground mt-2">Agricultural practices and data from around the world</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-primary rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Ready to transform your farming?
                </h2>
                <p className="text-primary-foreground/90 text-lg">
                  Start using our tools today to make better-informed agricultural decisions.
                </p>
                <div className="flex gap-4 mt-2">
                  <Link href="#tools-section">
                    <Button size="lg" variant="secondary" className="text-primary font-semibold">
                      Try Our Tools
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                      About Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Farmer in field" 
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster />
    </div>
  );
};

export default Home;
