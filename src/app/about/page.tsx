'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Leaf, Users, Target, BarChart3, Award, Mail, User, UserCircle, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Saurabh Joshi',
    role: 'Developer',
    bio: 'Passionate about building robust and scalable web applications.',
    gender: 'male'
  },
  {
    name: 'Trisa Das',
    role: 'UI Designer',
    bio: 'Focused on creating aesthetically pleasing and user-friendly interfaces.',
    gender: 'female'
  }
];

export default function AboutPage() {
  const scrollToMission = () => {
    const missionSection = document.getElementById('mission-section');
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  // Function to render gender icon
  const renderGenderIcon = (gender: string) => {
    if (gender === 'male') {
      return (
        <User className="h-24 w-24 text-blue-500" />
      );
    } else if (gender === 'female') {
      return (
        <UserCircle className="h-24 w-24 text-pink-500" />
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-secondary/30">
        <div className="container relative">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8">
              <ArrowLeft className="h-4 w-4" /> HOME
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                About <span className="text-gradient">AgroWise</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                AgroWise is an AI-powered platform dedicated to revolutionizing agriculture through data-driven insights and intelligent recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2" onClick={scrollToMission}>
                  Our Mission <Target className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={scrollToContact}>
                  Contact Us <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Farming Technology"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission-section" className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At AgroWise, we are committed to empowering farmers with cutting-edge technology and data-driven insights to optimize their agricultural practices and increase productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden shadow-sm card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Farming</h3>
                <p className="text-muted-foreground">
                  Promoting sustainable agricultural practices that respect the environment while maximizing yield.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden shadow-sm card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Data-Driven Decisions</h3>
                <p className="text-muted-foreground">
                  Leveraging AI and data analytics to provide actionable insights for optimal farming outcomes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden shadow-sm card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Farmer Empowerment</h3>
                <p className="text-muted-foreground">
                  Equipping farmers with knowledge and tools to thrive in changing agricultural landscapes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated professionals behind AgroWise who combine expertise with technological innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden shadow-sm card-hover">
                <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center">
                  {renderGenderIcon(member.gender)}
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
              <p className="text-lg text-muted-foreground">
                Have questions or want to learn more about how AgroWise can help your farming operations? Contact us today.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-muted-foreground">vvce23cseaiml0074@vvce.ac.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <a href="https://github.com/SAuraBH-786372" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      SAuraBH-786372
                    </a>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => {
                  window.location.href = "mailto:vvce23cseaiml0074@vvce.ac.in";
                }}
              >
                Contact Support <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </div>
            <div className="bg-card rounded-xl shadow-sm p-8 border">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
