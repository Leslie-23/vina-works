"use client";

import { useState, useEffect } from "react";
import {
  Quote,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
  ChevronRight,
  Mail,
  Users,
  Award,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  Zap,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial data
  const testimonials = [
    {
      quote:
        "Joining Valuable Women transformed my career. The mentorship and support network helped me break through barriers I never thought possible.",
      name: "Sarah Johnson",
      title: "Tech Executive",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote:
        "The workshops and resources provided by this community gave me the confidence to start my own business. A truly life-changing experience!",
      name: "Michelle Rodriguez",
      title: "Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote:
        "I found a true sisterhood here. The connections I've made have supported me through both professional challenges and personal growth.",
      name: "Priya Patel",
      title: "Community Leader",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      title: "Empowering Women Through Financial Literacy",
      excerpt:
        "How understanding money management is transforming lives and careers.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      category: "Finance",
      date: "March 15, 2025",
      readTime: "5 min read",
    },
    {
      title: "Breaking the Glass Ceiling: Stories of Triumph",
      excerpt:
        "Inspiring stories from women who've shattered barriers in male-dominated industries.",
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
      category: "Leadership",
      date: "March 10, 2025",
      readTime: "7 min read",
    },
    {
      title: "The Power of Mentorship in Career Development",
      excerpt:
        "How finding the right mentor can accelerate your professional growth.",
      image:
        "https://images.unsplash.com/photo-1551830416-5ed98c6dc750?w=600&h=400&fit=crop",
      category: "Career",
      date: "March 5, 2025",
      readTime: "4 min read",
    },
  ];

  // Stats data
  const stats = [
    {
      number: "10K+",
      label: "Active Members",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "250+",
      label: "Events Hosted",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "45+",
      label: "Countries",
      icon: Award,
      color: "from-orange-500 to-red-500",
    },
    {
      number: "500+",
      label: "Resources",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const events = [
    {
      title: "Leadership Workshop",
      date: "April 15, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Virtual Event",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      spots: 12,
    },
    {
      title: "Career Development Training",
      date: "April 22, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1515168833906-d2a3b82daa4e?w=600&h=400&fit=crop",
      spots: 8,
    },
    {
      title: "Financial Freedom Summit",
      date: "May 5-7, 2025",
      time: "All Day Event",
      location: "Chicago, IL",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      spots: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              aria-label="Valuable Women - Home"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span
                className={`text-2xl font-bold transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Valuable<span className="text-purple-600">Women</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Events", path: "/events" },
                { name: "Resources", path: "/resources" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-semibold transition-all hover:scale-105 ${
                    isScrolled
                      ? "text-gray-700 hover:text-purple-600"
                      : "text-white hover:text-yellow-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Join Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X
                  className={`w-6 h-6 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200 animate-fadeIn">
              <nav className="container mx-auto px-4 py-6 space-y-4">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Events", path: "/events" },
                  { name: "Resources", path: "/resources" },
                  { name: "Blog", path: "/blog" },
                  { name: "Contact", path: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block font-semibold text-gray-700 hover:text-purple-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/register"
                  className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Now
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="w-full overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8 border border-white/20">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  Empowering Women Worldwide
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Valuable</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {" "}
                  Women
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Breaking boundaries, building futures. Empowering women to
                develop strengths, achieve goals, and create lasting impact in
                their communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/register">
                  <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/about">
                  <button className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                    Learn Our Story
                  </button>
                </Link>
              </div>

              {/* Stats preview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {stats.slice(0, 4).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-white/70 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronRight className="text-white/60 rotate-90 w-8 h-8" />
          </div>
        </section>

        {/* Mission & Stats Section */}
        <section className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <span className="text-purple-600 font-semibold text-lg">
                    Our Mission
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                    Building a World Where Every Woman{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Thrives
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    At Valuable Women, we create transformative spaces where
                    women can learn, grow, and thrive together. Through
                    comprehensive mentorship programs, skill-building workshops,
                    and powerful networking opportunities, we're breaking down
                    barriers and building up leaders.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our community-driven approach ensures every woman has access
                    to the resources, support, and inspiration needed to achieve
                    her personal and professional aspirations.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/about">
                    <button className="group bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center space-x-2">
                      <span>Our Story</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link to="/resources">
                    <button className="group border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition-all">
                      Explore Resources
                    </button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <stat.icon className="text-white w-6 h-6" />
                    </div>
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-purple-600 font-semibold text-lg">
                What We Offer
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Transformative{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Programs
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive support systems designed to address every aspect
                of personal and professional growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Mentorship",
                  description:
                    "1-on-1 guidance from industry leaders and successful professionals.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Award,
                  title: "Skill Development",
                  description:
                    "Workshops and courses to build in-demand professional skills.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Heart,
                  title: "Community Support",
                  description:
                    "A supportive network of like-minded women cheering you on.",
                  color: "from-orange-500 to-red-500",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="text-white w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-purple-600 font-semibold text-lg">
                Success Stories
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Voices of{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Empowerment
                </span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Desktop testimonials */}
              <div className="hidden lg:grid grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <Quote className="text-purple-600 w-8 h-8 mb-4 opacity-50" />
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-purple-600 text-sm">
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile testimonial carousel */}
              <div className="lg:hidden relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                  <Quote className="text-purple-600 w-8 h-8 mb-4 opacity-50" />
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-purple-600 text-sm">
                        {testimonials[activeTestimonial].title}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carousel indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeTestimonial
                          ? "bg-purple-600"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
              <div className="max-w-2xl">
                <span className="text-purple-600 font-semibold text-lg">
                  Get Involved
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                  Upcoming{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Events
                  </span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Join our transformative events designed to inspire, educate,
                  and connect.
                </p>
              </div>
              <Link to="/events" className="mt-6 lg:mt-0">
                <button className="group bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center space-x-2">
                  <span>View All Events</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
                      {event.spots} spots left
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-3 text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <Link to="/events">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                        Register Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Journey?
              </h2>
              <p className="text-white/90 text-xl mb-8 leading-relaxed">
                Join thousands of women who are already breaking barriers and
                achieving their dreams. Your supportive community awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <button className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <span>Join Free Today</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/about">
                  <button className="group bg-transparent text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-purple-600 font-semibold text-lg">
                Latest Insights
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                From Our{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Blog
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover articles, guides, and stories to inspire your personal
                and professional growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                      <span className="mx-2">•</span>
                      {post.readTime}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link
                      to="/blog"
                      className="text-purple-600 font-semibold flex items-center space-x-2 group-hover:space-x-3 transition-all"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blog">
                <button className="group bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center space-x-2 mx-auto">
                  <span>View All Articles</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-purple-100">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Stay{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Connected
                    </span>
                  </h2>
                  <p className="text-gray-600 mb-4 text-lg">
                    Get the latest updates on events, resources, and
                    opportunities delivered to your inbox.
                  </p>
                  <p className="text-gray-500 text-sm">
                    No spam, just valuable content. Unsubscribe anytime.
                  </p>
                </div>
                <div className="space-y-4">
                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        required
                        aria-label="Email address for newsletter"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Subscribe to Newsletter</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
            {/* Brand Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Zap className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Valuable<span className="text-purple-400">Women</span>
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Breaking boundaries and empowering women to achieve greatness
                through community support, education, and opportunity.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: "#", label: "Facebook" },
                  { Icon: Twitter, href: "#", label: "Twitter" },
                  { Icon: Instagram, href: "#", label: "Instagram" },
                  { Icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-gray-800 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-purple-600 transition-all duration-200 hover:scale-110"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  "Home",
                  "About",
                  "Events",
                  "Resources",
                  "Blog",
                  "Contact",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  "Mentorship Program",
                  "Career Resources",
                  "Financial Guides",
                  "Leadership Training",
                  "Community Forum",
                  "Help Center",
                ].map((resource) => (
                  <li key={resource}>
                    <Link
                      to="#"
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>{resource}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">
                    contact@valuablewomen.org
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">
                    123 Empowerment Street
                    <br />
                    New York, NY 10001
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">(123) 456-7890</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Valuable Women. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Accessibility"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
