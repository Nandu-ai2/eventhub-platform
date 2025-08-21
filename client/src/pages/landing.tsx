import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, MapPin, Star, ArrowRight, Sparkles, Zap, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Discover Amazing Events";

  useEffect(() => {
    setIsVisible(true);
    
    // Typewriter effect
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200/50 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center group">
                <div className="relative">
                  <Calendar className="text-primary text-2xl mr-2 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <span className="font-bold text-xl text-slate-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EventHub
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                data-testid="button-login"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-blue-600 to-purple-700 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className={`text-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-2" data-testid="text-hero-title">
                {typedText}
                <span className="animate-pulse">|</span>
              </h1>
              <div className="flex justify-center items-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 animate-spin" />
                <Star className="w-4 h-4 text-yellow-300 animate-bounce delay-100" />
                <Star className="w-6 h-6 text-yellow-400 animate-pulse delay-200" />
              </div>
            </div>
            
            <p className={`text-xl md:text-2xl mb-8 text-blue-100 transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} data-testid="text-hero-subtitle">
              Connect with your community through unforgettable experiences
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-white text-primary px-8 py-4 text-lg hover:bg-gray-50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                data-testid="button-browse-events"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Browse Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                onClick={() => window.location.href = '/api/login'}
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 text-lg hover:bg-white hover:text-primary transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                data-testid="button-create-event"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:text-yellow-500 transition-colors duration-300" />
                Create Event
              </Button>
            </div>
            
            {/* Floating Action Indicators */}
            <div className={`mt-16 flex justify-center space-x-8 transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-sm text-blue-100">Join Community</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-sm text-blue-100">Find Local Events</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-sm text-blue-100">Make Memories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-slate-50">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-slate-800 mb-6" data-testid="text-features-title">
            Why Choose EventHub?
          </h2>
          <p className="text-xl text-slate-600" data-testid="text-features-subtitle">
            Everything you need to discover, create, and manage events
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className={`text-center p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer border-0 shadow-lg ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            <CardContent className="pt-6">
              <div className="relative">
                <Users className="h-16 w-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:animate-bounce">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-primary transition-colors duration-300" data-testid="text-feature-1-title">
                Easy RSVP Management
              </h3>
              <p className="text-slate-600 leading-relaxed" data-testid="text-feature-1-description">
                Simple Yes/No/Maybe responses with real-time attendee tracking and instant notifications
              </p>
            </CardContent>
          </Card>

          <Card className={`text-center p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer border-0 shadow-lg ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ animationDelay: '400ms' }}>
            <CardContent className="pt-6">
              <div className="relative">
                <Calendar className="h-16 w-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:animate-spin">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-primary transition-colors duration-300" data-testid="text-feature-2-title">
                Event Creation
              </h3>
              <p className="text-slate-600 leading-relaxed" data-testid="text-feature-2-description">
                Create stunning events with rich descriptions, images, and perfect location details
              </p>
            </CardContent>
          </Card>

          <Card className={`text-center p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer border-0 shadow-lg ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ animationDelay: '600ms' }}>
            <CardContent className="pt-6">
              <div className="relative">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-primary transition-colors duration-300" data-testid="text-feature-3-title">
                Location-Based Discovery
              </h3>
              <p className="text-slate-600 leading-relaxed" data-testid="text-feature-3-description">
                Discover amazing local events and connect with vibrant communities near you
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-cta-title">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
              Join thousands of people discovering amazing events every day. Your next unforgettable experience is just a click away!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-gradient-to-r from-primary to-blue-600 text-white px-10 py-4 text-lg hover:from-blue-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 shadow-2xl group"
                data-testid="button-get-started"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <div className="flex items-center text-slate-300 text-sm">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>Join 10,000+ happy users</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Calendar className="text-primary text-2xl mr-2" />
              <span className="font-bold text-xl text-slate-800">EventHub</span>
            </div>
            <p className="text-slate-600 text-sm">
              © 2024 EventHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
