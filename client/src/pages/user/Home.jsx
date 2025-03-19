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
            backgroundImage: "url('https://placehold.co/1920x1080.')",
          }}
        >
          <div className="bg-gradient-to-b from bg-purple-500 to-blue-500 bg-opacity-50 w-full h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className=" text-5xl md:text-7xl sm:text-6xl font-bold bg-gradient-to-r from-[#fff] via-[#fff] to-[#fff] bg-clip-text text-transparent whitespace-nowrap">
              Valuable Women
              {/* Breaking Boundaries */}
            </h1>
            <div className="text-3xl md:text-3xl sm:text-3xl font-bold bg-gradient-to-r from-[#FFE150] via-[#F5BD1F] to-[#FFD93D] bg-clip-text text-transparent">
              Breaking Boundaries{" "}
            </div>

            <p className="text-white text-lg md:text-xl mt-4 max-w-3xl">
              Encouraging women to develop strengths, achieve goals, and create
              a positive impact.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="/register">
                <button className="bg-gradient-to-r from-[#FACB2E] to-[#F5BD1F] text-white px-6 py-3 text-lg cursor-pointer">
                  <span className=" font-bold ">Join Now</span>
                </button>
              </a>
              <a href="about">
                <button className="bg-white text-blue-500 px-6 py-3 text-lg font-bold cursor-pointer">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100 text-center ">
          <section>
            <h2 className="text-4xl font-semibold">
              Become a Part of{" "}
              <span className="bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent whitespace-nowrap">
                Our Movement
              </span>
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Join a community that supports, uplifts, and empowers women to
              achieve greatness.
            </p>
            <a href="/register">
              <button className="mt-6 bg-gradient-to-r from bg-purple-500 to-blue-500 text-white px-6 py-3 text-lg cursor-pointer">
                <span className="bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent font-bold">
                  Sign Up Today
                </span>
                <ArrowRight className="ml-2 inline text-[#FFE150]" />
              </button>
            </a>
          </section>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 text-center  bg-gradient-to-l from bg-purple-500 to-blue-500">
          <section>
            <h2 className="text-4xl  space-x-2 pr-2 pl-2 bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent font-bold">
              What Women Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8 pr-2 pl-2  sm:grid-cols-2">
              {[
                "Amazing support!",
                "Life-changing experience!",
                "A true sisterhood!",
                // "Amazing support!",
                // "Life-changing experience!",
                // "A true sisterhood!",
              ].map((quote, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow mr-2 ml-2"
                >
                  <Quote className="text-blue-500 mx-auto" size={24} />
                  <p className="text-lg italic mt-4">{quote}</p>
                  <p className="text-sm font-semibold mt-2">— Jane Doe</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* Recent Blog Posts */}
        <section className="py-16 bg-gradient-to-r from bg-purple-500 to-blue-500">
          <section>
            <h2 className="text-4xl  space-x-2 pr-2 pl-2 bg-gradient-to-r from-[#F5BD1F] via-[#FFE150] to-[#FFD93D] bg-clip-text text-transparent font-bold text-center ">
              Recent Blog Posts
            </h2>
            {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
               Gradient Text Styling
            </h1> */}
            <div className="grid md:grid-cols-3 gap-8 mt-8 pr-2 pl-2 ">
              {[1, 2, 3 /*4, 5, 6*/].map((post) => (
                <div key={post} className="bg-white p-6 rounded-lg shadow">
                  <img
                    src="https://placehold.co/600x400"
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
