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
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial data
  const testimonials = [
    {
      quote:
        "Joining Valuable Women transformed my career. The mentorship and support network helped me break through barriers I never thought possible.",
      name: "Sarah Johnson",
      title: "Tech Executive",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The workshops and resources provided by this community gave me the confidence to start my own business. A truly life-changing experience!",
      name: "Michelle Rodriguez",
      title: "Entrepreneur",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "I found a true sisterhood here. The connections I've made have supported me through both professional challenges and personal growth.",
      name: "Priya Patel",
      title: "Community Leader",
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      title: "Empowering Women Through Financial Literacy",
      excerpt:
        "How understanding money management is transforming lives and careers.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Finance",
      date: "March 15, 2025",
      readTime: "5 min read",
    },
    {
      title: "Breaking the Glass Ceiling: Stories of Triumph",
      excerpt:
        "Inspiring stories from women who've shattered barriers in male-dominated industries.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Leadership",
      date: "March 10, 2025",
      readTime: "7 min read",
    },
    {
      title: "The Power of Mentorship in Career Development",
      excerpt:
        "How finding the right mentor can accelerate your professional growth.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Career",
      date: "March 5, 2025",
      readTime: "4 min read",
    },
  ];

  // Stats data
  const stats = [
    { number: "10K+", label: "Members", icon: Users },
    { number: "250+", label: "Events Hosted", icon: Calendar },
    { number: "45+", label: "Countries", icon: Award },
    { number: "500+", label: "Resources", icon: BookOpen },
  ];

  return (
    <>
      {/* Navigation Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1
              className={`text-2xl font-bold ${
                isScrolled
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              Valuable Women
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "About", "Events", "Resources", "Blog", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`font-medium hover:text-[#FFD93D] transition-colors ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  {item}
                </Link>
              )
            )}
            <Link
              to="/register"
              className="bg-gradient-to-r from-[#FACB2E] to-[#F5BD1F] text-white px-4 py-2 rounded-md font-bold hover:opacity-90 transition-opacity"
            >
              Join Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? "text-gray-800" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-gray-800" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 p-4 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              {["Home", "About", "Events", "Resources", "Blog", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="font-medium text-gray-800 hover:text-[#F5BD1F] transition-colors py-2 border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              )}
              <Link
                href="/register"
                className="bg-gradient-to-r from-[#FACB2E] to-[#F5BD1F] text-white px-4 py-2 rounded-md font-bold hover:opacity-90 transition-opacity text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Now
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="w-full">
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-blue-500 opacity-80"></div>
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-6 pt-20">
            <div className="animate-fadeInUp">
              <h1 className="text-5xl md:text-7xl sm:text-6xl font-bold bg-gradient-to-r from-[#fff] via-[#fff] to-[#fff] bg-clip-text text-transparent">
                Valuable Women
              </h1>
              <div className="text-3xl md:text-4xl sm:text-3xl font-bold bg-gradient-to-r from-[#FFE150] via-[#F5BD1F] to-[#FFD93D] bg-clip-text text-transparent mt-2">
                Breaking Boundaries
              </div>

              <p className="text-white text-lg md:text-xl mt-6 max-w-3xl mx-auto">
                Encouraging women to develop strengths, achieve goals, and
                create a positive impact in their communities and beyond.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <button className="bg-gradient-to-r from-[#FACB2E] to-[#F5BD1F] text-white px-8 py-3 text-lg rounded-md shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                    <span className="font-bold">Join Now</span>
                  </button>
                </Link>
                <Link to="/about">
                  <button className="bg-white text-blue-500 px-8 py-3 text-lg font-bold rounded-md shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Scroll indicator */}
          </div>
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 mt-30 animate-bounce">
            <ChevronRight className="text-white rotate-90 mt-30" size={32} />
          </div>
        </section>

        {/* Mission & Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeInLeft">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Mission
                  </span>
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  At Valuable Women, we believe in the power of community,
                  education, and support to help women reach their full
                  potential. Our mission is to create spaces where women can
                  learn, grow, and thrive together.
                </p>
                <p className="text-gray-700 text-lg mb-8">
                  Through mentorship programs, skill-building workshops,
                  networking events, and resources, we empower women to overcome
                  barriers and achieve their personal and professional goals.
                </p>
                <Link to="/about">
                  <button className="flex items-center text-blue-500 font-semibold group">
                    Learn more about our story
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6 animate-fadeInRight">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <stat.icon className="text-[#F5BD1F] mb-4" size={32} />
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-100 text-center">
          <div className="container mx-auto px-6 animate-fadeIn">
            <h2 className="text-4xl font-semibold mb-6">
              Become a Part of{" "}
              <span className="bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
                Our Movement
              </span>
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Join a community that supports, uplifts, and empowers women to
              achieve greatness. Together, we can break barriers and create
              lasting change.
            </p>
            <Link to="/register">
              <button className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 text-lg rounded-md shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 group">
                <span className="bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent font-bold">
                  Sign Up Today
                </span>
                <ArrowRight className="ml-2 inline text-[#FFE150] group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 text-center bg-gradient-to-l from-purple-500 to-blue-500">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
              What Women Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <Quote className="text-[#F5BD1F] mx-auto mt-8" size={32} />
                  <p className="text-lg text-gray-700 mt-4 italic">
                    {testimonial.quote}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-lg font-semibold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 animate-fadeIn">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Stay{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                      Connected
                    </span>
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Subscribe to our newsletter for the latest events,
                    resources, and opportunities.
                  </p>
                  <p className="text-gray-500 text-sm">
                    We respect your privacy. No spam, just valuable content.
                  </p>
                </div>
                <div className="md:w-1/3 w-full">
                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#FACB2E] to-[#F5BD1F] text-white font-bold py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center"
                    >
                      <Mail className="mr-2" size={18} />
                      Subscribe Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Blog Posts */}
        <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-500">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent text-center mb-12">
              Recent Blog Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#F5BD1F] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                      <span className="mx-2">•</span>
                      {post.readTime}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link
                      href="#"
                      className="text-blue-500 font-medium flex items-center hover:text-blue-700 transition-colors group"
                    >
                      Read More
                      <ArrowRight
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        size={18}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/blog">
                <button className="bg-white text-blue-500 px-6 py-3 rounded-md font-bold hover:bg-gray-50 transition-colors">
                  View All Articles
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="text-4xl font-bold mb-4 md:mb-0">
                Upcoming{" "}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
              <Link to="/events">
                <button className="flex items-center text-blue-500 font-semibold group">
                  View all events
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
              {[
                {
                  title: "Leadership Workshop",
                  date: "April 15, 2025",
                  time: "10:00 AM - 2:00 PM",
                  location: "Virtual",
                  image: "/placeholder.svg?height=300&width=500",
                },
                {
                  title: "Networking Mixer",
                  date: "April 22, 2025",
                  time: "6:00 PM - 8:00 PM",
                  location: "New York, NY",
                  image: "/placeholder.svg?height=300&width=500",
                },
                {
                  title: "Financial Freedom Summit",
                  date: "May 5-7, 2025",
                  time: "All Day",
                  location: "Chicago, IL",
                  image: "/placeholder.svg?height=300&width=500",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-[#F5BD1F]" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-[#F5BD1F]" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-[#F5BD1F]" />
                        {event.location}
                      </div>
                    </div>
                    <Link to="/events">
                      <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded font-medium hover:opacity-90 transition-opacity">
                        Register Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand Info */}
            <div className="col-span-1 md:col-span-1">
              <h2 className="text-2xl font-bold mb-4">Valuable Women</h2>
              <p className="text-gray-400 mb-6">
                Breaking boundaries and empowering women to achieve greatness
                through support and education.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Linkedin, href: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-[#F5BD1F] transition-colors"
                    aria-label={`Follow us on ${social.Icon.name}`}
                  >
                    <social.Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F5BD1F]">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {["Home", "About", "Events", "Blog", "Contact", "Donate"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase()}`}
                        className="text-gray-300 hover:text-white transition-colors flex items-center"
                      >
                        <ChevronRight size={16} className="mr-1" />
                        {link}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F5BD1F]">
                Resources
              </h3>
              <ul className="space-y-2">
                {[
                  "Mentorship",
                  "Career Resources",
                  "Financial Guides",
                  "Leadership Training",
                  "Community Forum",
                  "FAQ",
                ].map((resource) => (
                  <li key={resource}>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors flex items-center"
                    >
                      <ChevronRight size={16} className="mr-1" />
                      {resource}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F5BD1F]">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail
                    className="mr-2 text-gray-400 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span className="text-gray-300">info@valuablewomen.org</span>
                </li>
                <li className="flex items-start">
                  <MapPin
                    className="mr-2 text-gray-400 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span className="text-gray-300">
                    123 Empowerment Street
                    <br />
                    New York, NY 10001
                  </span>
                </li>
                <li className="flex items-start">
                  <Phone
                    className="mr-2 text-gray-400 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span className="text-gray-300">(123) 456-7890</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Valuable Women. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
