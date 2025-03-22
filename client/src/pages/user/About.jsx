"use client";

import React, { useState } from "react";

// import  from "react"
// import img from "next/img"
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Mail, 
    Users,
    Award,
    BookOpen,
    Calendar,
    Clock,
    MapPin,
    Phone,Quote
} from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { div, div } from "@/components/ui/card";

// Custom swipeable views component to avoid dependency issues
const SwipeableViews = ({ children, index, onChangeIndex }) => {
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    document.documentElement.style.setProperty(
      "--touch-down",
      touchDown.toString()
    );
  };

  const handleTouchMove = (e) => {
    const touchDown = Number.parseFloat(
      document.documentElement.style.getPropertyValue("--touch-down")
    );
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5 && index < React.Children.count(children) - 1) {
      onChangeIndex(index + 1);
      document.documentElement.style.setProperty("--touch-down", "0");
    }

    if (diff < -5 && index > 0) {
      onChangeIndex(index - 1);
      document.documentElement.style.setProperty("--touch-down", "0");
    }
  };

  return (
    <div
      className="overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {children}
      </div>
    </div>
  );
};

const About = () => {
  const [index, setIndex] = useState(0);

  // Team Members Data with Unsplash imgs
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Marketing Head",
      img: "/team-member-1.jpg",
    },
    {
      name: "Michael Lee",
      role: "Community Outreach",
      img: "/team-member-2.jpg",
    },
    {
      name: "Sophia Brown",
      role: "Finance Lead",
      img: "/team-member-3.jpg",
    },
    {
      name: "Daniel Kim",
      role: "Operations Manager",
      img: "/team-member-4.jpg",
    },
  ];

  // Leadership data
  const leadership = [
    {
      name: "Jane Doe",
      title: "Founder & CEO",
      img: "/founder-1.jpg",
      bio: "With over 15 years of experience in women's advocacy, Jane founded Valuable Women to create lasting change in communities worldwide.",
    },
    {
      name: "Sarah Smith",
      title: "Co-Founder & Director",
      img: "/founder-2.jpg",
      bio: "Sarah brings her expertise in education and community development to help shape the organization's impactful programs.",
    },
  ];

  return (
    <>
      <main className="w-full">
        {/* Hero Section */}
        <section
          className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
          aria-label="About Valuable Women hero section"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/90 to-blue-500/90" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
                Valuable Women
              </span>
            </h1>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Breaking boundaries, empowering women, and transforming lives
              through education, mentorship, and community.
            </p>
            <Link to="#mission" aria-label="Scroll to mission section">
              <ChevronDown className="text-white w-8 h-8 mt-8 animate-bounce cursor-pointer" />
            </Link>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section id="mission" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Our Mission & Vision
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To empower and uplift young girls and women by providing
                    mentorship, education, and opportunities to achieve their
                    full potential and break societal barriers. We believe in
                    creating safe spaces where women can learn, grow, and thrive
                    together.
                  </p>
                </div>
              </div>

              <div className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To create a world where every woman has the support,
                    resources, and confidence to thrive, lead, and inspire the
                    next generation. We envision communities where gender
                    equality is the norm and women's voices are valued and
                    amplified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section with Stats */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Who We Are & What We Do
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-16">
              Valuable Women is a non-profit organization dedicated to
              supporting young girls and women in achieving their dreams. We
              provide mentorship, skill development, and educational
              opportunities, ensuring that every woman can reach her full
              potential.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <span className="block text-4xl font-bold text-purple-600 mb-2">
                  5K+
                </span>
                <span className="text-gray-500">Women Mentored</span>
              </div>
              <div className="p-6">
                <span className="block text-4xl font-bold text-blue-600 mb-2">
                  120+
                </span>
                <span className="text-gray-500">Communities Served</span>
              </div>
              <div className="p-6">
                <span className="block text-4xl font-bold text-purple-600 mb-2">
                  50+
                </span>
                <span className="text-gray-500">Educational Programs</span>
              </div>
              <div className="p-6">
                <span className="block text-4xl font-bold text-blue-600 mb-2">
                  10+
                </span>
                <span className="text-gray-500">Years of Impact</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Programs Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Our Programs
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Mentorship",
                  description:
                    "One-on-one guidance from industry professionals to help women navigate their career paths.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  title: "Skill Development",
                  description:
                    "Workshops and training sessions to build technical and soft skills for professional growth.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  ),
                },
                {
                  title: "Scholarships",
                  description:
                    "Financial support for education and career advancement opportunities for deserving women.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                      <path d="M12 18v2" />
                      <path d="M12 6V4" />
                    </svg>
                  ),
                },
              ].map((program, idx) => (
                <div
                  key={idx}
                  className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                      <span className="text-white">{program.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {program.title}
                    </h3>
                    <p className="text-gray-600">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder & Leadership Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Meet Our Leadership
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {leadership.map((person, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center md:items-start gap-8"
                >
                  <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
                    <img
                      src={person.img || "/placeholder.svg"}
                      alt={person.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center md:text-left">
                      {person.name}
                    </h3>
                    <p className="text-purple-600 font-medium mb-4 text-center md:text-left">
                      {person.title}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {person.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
                Team
              </span>
            </h2>

            <div className="relative max-w-lg mx-auto">
              <button
                onClick={() => setIndex(Math.max(0, index - 1))}
                disabled={index === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous team member"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="overflow-hidden px-10">
                <SwipeableViews index={index} onChangeIndex={setIndex}>
                  {teamMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="w-full flex-shrink-0 p-4 text-center"
                    >
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white/30">
                        <img
                          src={member.img || "/placeholder.svg"}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                      <p className="text-white/80">{member.role}</p>
                    </div>
                  ))}
                </SwipeableViews>
              </div>

              <button
                onClick={() =>
                  setIndex(Math.min(teamMembers.length - 1, index + 1))
                }
                disabled={index === teamMembers.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next team member"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Pagination dots */}
              <div className="flex justify-center gap-2 mt-8">
                {teamMembers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIndex(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === index ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={`Go to team member ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Success Stories
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "The mentorship program at Valuable Women changed my life. I gained the confidence to pursue my dream career in tech.",
                  name: "Rebecca T.",
                  role: "Software Engineer",
                },
                {
                  quote:
                    "Thanks to the scholarship I received, I was able to complete my education and become the first college graduate in my family.",
                  name: "Maria G.",
                  role: "Medical Student",
                },
                {
                  quote:
                    "The community I found here supported me through starting my own business. I'm now employing other women in my community.",
                  name: "Priya K.",
                  role: "Entrepreneur",
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="border-none shadow-lg">
                  <div className="p-8">
                    <svg
                      className="w-10 h-10 text-purple-300 mb-4"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-600 mb-6 italic">
                      {testimonial.quote}
                    </p>
                    <div>
                      <p className="font-bold text-gray-800">
                        {testimonial.name}
                      </p>
                      <p className="text-purple-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Movement
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Become part of a community dedicated to empowering women and
              creating lasting change. Together, we can build a more equitable
              future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 font-bold text-lg p-8"
              >
                Get Involved
                {/* <ArrowRight className="ml-2 w-5 h-5" /> */}
              </button>
              <button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold text-lg px-8"
              >
                Donate Now
              </button>
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

export default About;
