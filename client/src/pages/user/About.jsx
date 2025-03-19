import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import SwipeableViews from "react-swipeable-views";

const About = () => {
  const [index, setIndex] = useState(0);
  // Team Members Data
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Marketing Head",
      img: "https://placehold.co/200",
    },
    {
      name: "Michael Lee",
      role: "Community Outreach",
      img: "https://placehold.co/200",
    },
    {
      name: "Sophia Brown",
      role: "Finance Lead",
      img: "https://placehold.co/200",
    },
    {
      name: "Daniel Kim",
      role: "Operations Manager",
      img: "https://placehold.co/200",
    },
  ];

  return (
    <>
      <main className="w-full">
        {/* Hero Section */}
        <section
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://placehold.co/1920x1080')" }}
        >
          <div className="bg-gradient-to-b from-purple-500 to-blue-500 bg-opacity-50 w-full h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-5xl md:text-7xl sm:text-6xl font-bold bg-gradient-to-r from-[#fff] via-[#fff] to-[#fff] bg-clip-text text-transparent">
              About Valuable Women
            </h1>
            <p className="text-gray-800 text-lg md:text-xl italic  p-2 mt-4 max-w-3xl bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D]">
              Breaking boundaries, empowering women, and transforming lives.
            </p>
            <ChevronDown className="mt-[3rem] animate-bounce" />
          </div>
        </section>
        {/* <hr /> */}
        <section className="py-16 px-6 text-center bg-gradient-to-t from-purple-500 to-blue-500 bg-opacity-50">
          <h2 className="text-4xl font-semibold bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
            Our Mission & Vision
          </h2>
          <div className="mt-8 max-w-4xl mx-auto grid lg:grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              <p className="text-lg text-gray-200 mt-2">
                To empower and uplift young girls and women by providing
                mentorship, education, and opportunities to achieve their full
                potential and break societal barriers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              <p className="text-lg text-gray-200 mt-2">
                To create a world where every woman has the support, resources,
                and confidence to thrive, lead, and inspire the next generation.
              </p>
            </div>
          </div>
        </section>
        {/* About Section */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
            Who We Are & What We Do
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-4xl mx-auto">
            Valuable Women is a non-profit organization dedicated to supporting
            young girls and women in achieving their dreams. We provide
            mentorship, skill development, and educational opportunities,
            ensuring that every woman can reach her full potential.
          </p>
        </section>

        {/* Founder & Owner Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-opacity-50 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
            Meet Our Leadership
          </h2>
          <div className="flex flex-wrap justify-center mt-8 gap-8">
            {[
              {
                name: "Jane Doe",
                title: "Founder & CEO",
                img: "https://placehold.co/200",
              },
              {
                name: "Sarah Smith",
                title: "Co-Founder & Director",
                img: "https://placehold.co/200",
              },
            ].map((person, index) => (
              <div key={index} className="text-center">
                <img
                  src={person.img}
                  alt={person.name}
                  className="rounded-full w-40 h-40 mx-auto"
                />
                <h3 className="text-xl text-gray-200 font-bold mt-4">
                  {person.name}
                </h3>
                <p className=" bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
                  {person.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100 text-center">
          <h2 className="text-4xl font-semibold">Join Our Movement</h2>
          <p className="text-lg text-gray-600 mt-4">
            Become part of a community dedicated to empowering women and
            creating change.
          </p>
          <a href="/register">
            <button className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 text-lg font-bold flex items-center mx-auto">
              Get Involved <ArrowRight className="ml-2 text-[#FFE150]" />
            </button>
          </a>
        </section>

        {/* Swipeable Team Section */}
        <section className="py-16 px-6 text-center bg-gradient-to-l from-purple-500 to-blue-500 text-white">
          <h2 className="text-4xl font-semibold bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="relative mt-8 flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={() => setIndex(index - 1)}
              disabled={index === 0}
              className="absolute left-0  text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft />
            </button>

            {/* Swipeable Views */}
            <div className="w-full max-w-lg mx-auto">
              <SwipeableViews
                index={index}
                onChangeIndex={setIndex}
                enableMouseEvents
              >
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="p-4 text-center">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="rounded-full w-32 h-32 mx-auto"
                    />
                    <h3 className="text-xl font-bold mt-4">{member.name}</h3>
                    <p className="text-gray-300">{member.role}</p>
                  </div>
                ))}
              </SwipeableViews>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setIndex(index + 1)}
              disabled={index === teamMembers.length - 1}
              className="absolute right-0  text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 md:flex md:justify-between">
          {/* Left Section: Brand Info */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Valuable Women</h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              Breaking boundaries and empowering women through mentorship,
              skill-building, and education.
            </p>
          </div>

          {/* Center Section: Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Home", "Blog", "Events", "Donations", "Contact"].map(
              (link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  {link}
                </a>
              )
            )}
          </div>

          {/* Right Section: Social Icons */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-300 hover:text-white transition"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Valuable Women. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default About;
