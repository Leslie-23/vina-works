import React from "react";
import { Link } from "react-router-dom";
import {
  Construction,
  Mail,
  ArrowRight,
  Clock,
  Zap,
  Heart,
  Users,
  Shield,
} from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-6"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-medium">Back to Login</span>
          </Link>

          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Construction className="text-white w-8 h-8" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Feature Coming Soon!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're working hard to bring you a secure password recovery system.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          {/* Construction Illustration */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl flex items-center justify-center animate-pulse">
                <Construction className="text-white w-10 h-10" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Clock className="text-white w-4 h-4" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Password Recovery Under Construction
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our team is actively building a secure and user-friendly password
              recovery system to ensure your account remains protected.
            </p>
          </div>

          {/* Temporary Solutions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Contact Support</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Reach out to our support team for immediate assistance with
                account access.
              </p>
              <a
                href="mailto:support@valuablewomen.org"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                <span>support@valuablewomen.org</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Community Help</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Join our community forum where members help each other with
                account issues.
              </p>
              <Link
                to="/community"
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                <span>Visit Community</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Progress Status */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Development Progress
              </h3>
              <span className="text-sm font-medium text-purple-600">
                65% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Estimated completion: <strong>2-3 weeks</strong>
            </p>
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="text-center space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-yellow-600" />
              <h3 className="font-semibold text-gray-900">
                Quick Alternatives
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all border border-gray-200"
              >
                <span>Create New Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <span>Try Login Again</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Support Message */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Heart className="w-6 h-6" />
              <h3 className="font-bold text-lg">
                Thank You for Your Patience!
              </h3>
            </div>
            <p className="text-white/90 text-center">
              We're committed to providing you with the best experience. Your
              understanding means the world to us as we work to enhance our
              platform.
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Need immediate help? Contact our support team at{" "}
              <a
                href="mailto:help@valuablewomen.org"
                className="text-purple-600 font-semibold hover:text-purple-700"
              >
                help@valuablewomen.org
              </a>
            </p>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: Shield,
              title: "Secure Recovery",
              description: "End-to-end encrypted password reset process",
            },
            {
              icon: Mail,
              title: "Email Verification",
              description: "Multi-factor authentication for security",
            },
            {
              icon: Clock,
              title: "Quick Access",
              description: "Get back to your account in minutes",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="text-white w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
