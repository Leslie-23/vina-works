import React from "react";
import {
  Newspaper,
  Quote,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Home = () => {
  return (
    <>
      <main className="w-full">
        {/* Hero Section */}
        <section
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1920x1080')",
          }}
        >
          <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-white text-5xl md:text-7xl font-bold">
              Valuable Women Breaking Boundaries
            </h1>
            <p className="text-white text-lg md:text-xl mt-4 max-w-3xl">
              Encouraging women to develop strengths, achieve goals, and create
              a positive impact.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="/register">
                <button className="bg-blue-500 text-white px-6 py-3 text-lg">
                  Join Now
                </button>
              </a>
              <a href="about">
                <button className="bg-white text-blue-500 px-6 py-3 text-lg">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100 text-center">
          <section>
            <h2 className="text-4xl font-semibold">
              Become a Part of Our Movement
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Join a community that supports, uplifts, and empowers women to
              achieve greatness.
            </p>
            <button className="mt-6 bg-blue-500 text-white px-6 py-3 text-lg">
              Sign Up Today <ArrowRight className="ml-2 inline" />
            </button>
          </section>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 text-center bg-white">
          <section>
            <h2 className="text-4xl font-semibold space-x-2 pr-2 pl-2">
              What Women Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8 pr-2 pl-2">
              {[
                "Amazing support!",
                "Life-changing experience!",
                "A true sisterhood!",
              ].map((quote, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow mr-2 ml-2"
                >
                  <Quote className="text-blue-500 mx-auto" size={32} />
                  <p className="text-lg italic mt-4">{quote}</p>
                  <p className="text-sm font-semibold mt-2">— Jane Doe</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* Recent Blog Posts */}
        <section className="py-16 bg-gray-100">
          <section>
            <h2 className="text-4xl font-semibold text-center pr-2 pl-2">
              Recent Blog Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8 pr-2 pl-2">
              {[1, 2, 3].map((post) => (
                <div key={post} className="bg-white p-6 rounded-lg shadow">
                  <img
                    src="https://via.placeholder.com/600x400"
                    alt="Blog"
                    className="rounded-lg"
                  />
                  <h3 className="text-2xl font-semibold mt-4">
                    Empowering Women Through Education
                  </h3>
                  <p className="text-gray-600 mt-2">
                    How knowledge is transforming lives.
                  </p>
                  <a href="#" className="text-blue-500 mt-4 block">
                    Read More <Newspaper className="inline ml-1" size={18} />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 md:flex md:justify-between">
          {/* Left Section: Brand Info */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Valuable Women</h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              Breaking boundaries and empowering women to achieve greatness
              through support and education.
            </p>
          </div>

          {/* Center Section: Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Home", "Blog", "Events", "Donations", "Profile", "Contact"].map(
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

        {/* Bottom Section: Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Valuable Women. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;
