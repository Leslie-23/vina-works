import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  Newspaper,
  Megaphone,
  CalendarDays,
  HandHeart,
  User,
  Settings,
  Bell,
  LogOut,
  Heart,
  Zap,
  Users,
  Award,
  Target,
  Shield,
  Lock,
  Gift,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Donations = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  const handleDonate = async () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;

    if (!amount || amount < 1) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(
        `Thank you for your $${amount} donation! Your support makes a difference.`
      );
      setCustomAmount("");
      setSelectedAmount(25);
    }, 2000);
  };

  const impactStats = [
    { amount: 25, impact: "Provides educational materials for one woman" },
    { amount: 50, impact: "Sponsors a workshop attendance" },
    { amount: 100, impact: "Funds a month of mentorship programs" },
    { amount: 250, impact: "Supports a community outreach event" },
  ];

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Home", icon: Home, path: "/" },
    { name: "Blog", icon: Newspaper, path: "/blog" },
    { name: "News", icon: Megaphone, path: "/news" },
    { name: "Events", icon: CalendarDays, path: "/events" },
    { name: "Donations", icon: HandHeart, path: "/donations", active: true },
    // { name: "Community", icon: Users, path: "/community" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Valuable Women
              </h2>
              <p className="text-xs text-gray-500">Support Our Mission</p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    item.active
                      ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-r-2 border-purple-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.active ? "text-purple-600" : "text-gray-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="text-white w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Supporter
              </p>
              <p className="text-xs text-gray-500 truncate">
                Making a Difference
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              to="/profile"
              className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Support Our Mission
                </h1>
                <p className="text-sm text-gray-500">
                  Empower women through your generosity
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="text-white w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white mb-8">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-2/3 mb-8 lg:mb-0">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-6 h-6" />
                    <span className="font-semibold">Make an Impact</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-4">
                    Transform Lives Through Your Support
                  </h2>
                  <p className="text-purple-100 text-lg mb-6">
                    Every donation helps us empower more women, provide
                    education resources, and create opportunities for growth and
                    leadership in communities worldwide.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>10,000+ Women Impacted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>45+ Countries Reached</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3 text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <Heart className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-2xl font-bold">Join 5,000+ Supporters</p>
                    <p className="text-purple-100">
                      Making a difference together
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Donation Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Donation Type */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Donation Type
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setDonationType("one-time")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        donationType === "one-time"
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <Gift className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">One-time</div>
                      <div className="text-sm text-gray-600">
                        Single donation
                      </div>
                    </button>
                    <button
                      onClick={() => setDonationType("monthly")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        donationType === "monthly"
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <Star className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">Monthly</div>
                      <div className="text-sm text-gray-600">
                        Ongoing support
                      </div>
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Select Amount
                  </h3>

                  {/* Preset Amounts */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedAmount === amount && !customAmount
                            ? "border-purple-500 bg-purple-50 text-purple-700 font-bold"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Or enter custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(0);
                        }}
                        placeholder="Enter amount"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Impact Preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Your Impact
                  </h3>
                  <div className="space-y-3">
                    {impactStats.map((stat, index) => {
                      const amount = customAmount
                        ? parseFloat(customAmount)
                        : selectedAmount;
                      const showImpact = amount >= stat.amount;

                      return (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                            showImpact
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50"
                          }`}
                        >
                          <CheckCircle
                            className={`w-5 h-5 ${
                              showImpact ? "text-green-500" : "text-gray-300"
                            }`}
                          />
                          <span
                            className={
                              showImpact
                                ? "text-green-700 font-medium"
                                : "text-gray-500"
                            }
                          >
                            {stat.impact}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Donate Button */}
                <button
                  onClick={handleDonate}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Donation...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-6 h-6" />
                      <span>
                        {donationType === "monthly"
                          ? "Donate Monthly"
                          : "Make One-time Donation"}
                      </span>
                      <span>•</span>
                      <span>${customAmount || selectedAmount}</span>
                    </>
                  )}
                </button>

                {/* Security Notice */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Secure & Encrypted Payment</span>
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Impact Stories & Info */}
              <div className="space-y-6">
                {/* Impact Stats */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Our Impact
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Users,
                        label: "Women Empowered",
                        value: "10,000+",
                      },
                      {
                        icon: Target,
                        label: "Programs Launched",
                        value: "250+",
                      },
                      { icon: Award, label: "Countries Reached", value: "45+" },
                      {
                        icon: Heart,
                        label: "Lives Transformed",
                        value: "25,000+",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <stat.icon className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-medium text-gray-700">
                            {stat.label}
                          </span>
                        </div>
                        <span className="font-bold text-purple-600">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Donor Stories</h3>
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                      <p className="italic mb-2">
                        "Seeing the direct impact of my donation on women's
                        lives has been incredibly rewarding."
                      </p>
                      <p className="font-semibold">
                        - Sarah, Monthly Supporter
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                      <p className="italic mb-2">
                        "Knowing that my contribution helps break cycles of
                        poverty motivates me to give regularly."
                      </p>
                      <p className="font-semibold">- Michael, Legacy Donor</p>
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Other Ways to Help
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                      <div className="font-semibold text-gray-900">
                        Become a Volunteer
                      </div>
                      <div className="text-sm text-gray-600">
                        Share your time and skills
                      </div>
                    </button>
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                      <div className="font-semibold text-gray-900">
                        Corporate Partnership
                      </div>
                      <div className="text-sm text-gray-600">
                        Partner with us
                      </div>
                    </button>
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                      <div className="font-semibold text-gray-900">
                        Fundraise
                      </div>
                      <div className="text-sm text-gray-600">
                        Start a campaign
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: "Secure Payments", icon: Shield },
                  { label: "Tax Deductible", icon: Award },
                  { label: "Transparent", icon: Target },
                  { label: "Verified Nonprofit", icon: CheckCircle },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <item.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Donations;
