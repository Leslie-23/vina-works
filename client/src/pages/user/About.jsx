import React, { useState } from "react";
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
  Phone,
  Quote,
  Zap,
  Target,
  Heart,
  Star,
  Globe,
  GraduationCap,
  Briefcase,
  Shield,
  Users as UsersIcon,
  Book,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

// Custom swipeable views component
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

  // Team Members Data
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Marketing Head",
      img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Michael Lee",
      role: "Community Outreach",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Sophia Brown",
      role: "Finance Lead",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Daniel Kim",
      role: "Operations Manager",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
  ];

  // Leadership data
  const leadership = [
    {
      name: "Jane Doe",
      title: "Founder & CEO",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      bio: "With over 15 years of experience in women's advocacy, Jane founded Valuable Women to create lasting change in communities worldwide.",
      achievements: [
        "15+ Years Experience",
        "Global Advocate",
        "Community Leader",
      ],
    },
    {
      name: "Sarah Smith",
      title: "Co-Founder & Director",
      img: "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=400&h=400&fit=crop&crop=face",
      bio: "Sarah brings her expertise in education and community development to help shape the organization's impactful programs.",
      achievements: ["Education Specialist", "Program Developer", "Mentor"],
    },
  ];

  const impactStats = [
    {
      number: "10K+",
      label: "Women Empowered",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      number: "250+",
      label: "Programs Launched",
      icon: Award,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "45+",
      label: "Countries Reached",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "5K+",
      label: "Success Stories",
      icon: Star,
      color: "from-orange-500 to-red-500",
    },
  ];

  const programs = [
    {
      title: "Mentorship Programs",
      description:
        "One-on-one guidance from industry professionals to help women navigate their career paths and personal growth.",
      icon: UsersIcon,
      features: [
        "Career Guidance",
        "Personal Development",
        "Networking",
        "Leadership Training",
      ],
    },
    {
      title: "Skill Development",
      description:
        "Comprehensive workshops and training sessions to build technical and soft skills for professional advancement.",
      icon: Book,
      features: [
        "Technical Skills",
        "Soft Skills",
        "Certification",
        "Hands-on Projects",
      ],
    },
    {
      title: "Educational Support",
      description:
        "Scholarships and financial assistance programs to support women in pursuing their educational goals.",
      icon: GraduationCap,
      features: [
        "Scholarships",
        "Study Materials",
        "Online Courses",
        "Career Counseling",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8 border border-white/20">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Empowering Women Worldwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Valuable Women
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Breaking boundaries, building futures. We're dedicated to empowering
            women through education, mentorship, and community support to create
            lasting change across the globe.
          </p>
          <Link to="#mission" className="inline-block">
            <ChevronDown className="text-white/70 w-8 h-8 mt-8 animate-bounce cursor-pointer hover:text-white transition-colors" />
          </Link>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-lg">
              Our Purpose
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Our Mission &{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Vision
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Driving meaningful change through targeted programs and
              community-driven initiatives
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Target className="text-white w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                To empower and uplift women by providing comprehensive
                mentorship, education, and opportunities to achieve their full
                potential and break societal barriers. We create safe, inclusive
                spaces where women can learn, grow, and thrive together.
              </p>
              <div className="space-y-3">
                {[
                  "Mentorship Programs",
                  "Educational Support",
                  "Career Development",
                  "Community Building",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Globe className="text-white w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                To create a world where every woman has the support, resources,
                and confidence to thrive, lead, and inspire future generations.
                We envision communities where gender equality is the norm and
                women's voices are valued and amplified globally.
              </p>
              <div className="space-y-3">
                {[
                  "Global Impact",
                  "Gender Equality",
                  "Women Leadership",
                  "Sustainable Change",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              Transforming lives and communities through dedicated programs and
              initiatives
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {impactStats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="text-white w-8 h-8" />
                </div>
                <div
                  className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-purple-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-lg">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Programs
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive initiatives designed to address every aspect of
              personal and professional growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <program.icon className="text-white w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {program.description}
                  </p>
                  <div className="space-y-2">
                    {program.features.map((feature, featureIdx) => (
                      <div
                        key={featureIdx}
                        className="flex items-center space-x-3 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-blue-50 border-t border-gray-200">
                  <Link
                    to="/programs"
                    className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center space-x-2 group"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-lg">
              Our Leadership
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Founders
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {leadership.map((person, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200"
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                        <img
                          src={person.img}
                          alt={person.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Founder
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {person.name}
                      </h3>
                      <p className="text-purple-600 font-semibold mb-4">
                        {person.title}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {person.bio}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {person.achievements.map(
                          (achievement, achievementIdx) => (
                            <span
                              key={achievementIdx}
                              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {achievement}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              Dedicated professionals working together to drive meaningful
              change
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <button
              onClick={() => setIndex(Math.max(0, index - 1))}
              disabled={index === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous team member"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="overflow-hidden px-16">
              <SwipeableViews index={index} onChangeIndex={setIndex}>
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 p-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto mb-6 border-4 border-white/30">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-purple-200 mb-4">{member.role}</p>
                      <div className="flex justify-center space-x-4">
                        <button className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                          <Twitter className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </SwipeableViews>
            </div>

            <button
              onClick={() =>
                setIndex(Math.min(teamMembers.length - 1, index + 1))
              }
              disabled={index === teamMembers.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next team member"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination dots */}
            <div className="flex justify-center gap-3 mt-8">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === index ? "bg-white scale-125" : "bg-white/30"
                  }`}
                  aria-label={`Go to team member ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-lg">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Transforming{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Lives
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "The mentorship program at Valuable Women changed my life. I gained the confidence to pursue my dream career in tech and now lead a team of developers.",
                name: "Rebecca T.",
                role: "Senior Software Engineer",
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
              },
              {
                quote:
                  "Thanks to the scholarship I received, I was able to complete my education and become the first college graduate in my family. This organization truly changes lives.",
                name: "Maria G.",
                role: "Medical Student",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
              },
              {
                quote:
                  "The community I found here supported me through starting my own business. I'm now employing other women in my community and creating opportunities for growth.",
                name: "Priya K.",
                role: "Entrepreneur",
                image:
                  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group"
              >
                <Quote className="w-8 h-8 text-purple-300 mb-6" />
                <p className="text-gray-600 leading-relaxed mb-8 italic group-hover:text-gray-700 transition-colors">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">
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
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of supporters in our mission to empower women and
              create lasting change in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Join Our Community</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/donations"
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>Support Our Mission</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
