
import { FaLink, FaShareAlt, FaShieldAlt, FaChartLine, FaUsers, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useStoreContext } from "../contextApi/ContextApi";

const AboutPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const whyChooseRef = useRef(null);
  const features = [
    {
      icon: FaLink,
      title: "Simple URL Shortening",
      description: "Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle.",
      color: "blue"
    },
    {
      icon: FaChartLine,
      title: "Powerful Analytics",
      description: "Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies.",
      color: "green"
    },
    {
      icon: FaShieldAlt,
      title: "Enhanced Security",
      description: "Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure.",
      color: "purple"
    },
    {
      icon: FaShareAlt,
      title: "Fast and Reliable",
      description: "Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users.",
      color: "red"
    }
  ];

  const stats = [
    { label: "Links Created", value: "10M+", icon: FaLink },
    { label: "Active Users", value: "500K+", icon: FaUsers },
    { label: "Countries Served", value: "150+", icon: FaGlobe },
    { label: "Uptime", value: "99.9%", icon: FaShieldAlt }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "text-bitly-lightBlue bg-blue-50",
      green: "text-green-600 bg-green-50",
      purple: "text-purple-600 bg-purple-50",
      red: "text-red-600 bg-red-50"
    };
    return colors[color] || colors.blue;
  };

  // Handler for Get Started/Start Shortening buttons
  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // Handler for Learn More button
  const handleLearnMore = () => {
    if (whyChooseRef.current) {
      whyChooseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-bitly-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-bitly-lightBlue">Shortex</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Shortex simplifies URL shortening for efficient sharing. We&apos;re dedicated to providing 
              the most reliable, secure, and user-friendly link management platform for individuals 
              and businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-bitly-lightBlue hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={handleGetStarted}
              >
                Get Started Free
              </button>
              <button
                className="border-2 border-bitly-lightBlue text-bitly-lightBlue hover:bg-bitly-lightBlue hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                onClick={handleLearnMore}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-bitly-lightBlue/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-bitly-lightBlue" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
  <div className="py-20" ref={whyChooseRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Shortex?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve built the most comprehensive URL shortening platform with features 
              that grow with your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-bitly hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(feature.color)}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Shortex, we believe that sharing should be simple, secure, and insightful. 
                Our mission is to empower individuals and businesses to connect more effectively 
                through intelligent link management.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether you&apos;re a social media manager, marketer, or just someone who wants to 
                share links more efficiently, Shortex provides the tools you need to succeed.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-bitly-lightBlue rounded-full"></div>
                  <span className="text-gray-700">Free to use with no hidden costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-bitly-lightBlue rounded-full"></div>
                  <span className="text-gray-700">Enterprise-grade security and reliability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-bitly-lightBlue rounded-full"></div>
                  <span className="text-gray-700">Comprehensive analytics and insights</span>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-bitly-lightBlue to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="text-blue-100 mb-6">
                  Be part of millions of users who trust Shortex for their link management needs.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Links shortened today</span>
                    <span className="font-bold">1,247,892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active campaigns</span>
                    <span className="font-bold">45,672</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Countries reached</span>
                    <span className="font-bold">195</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-bitly-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using Shortex to manage their links more effectively.
          </p>
          <button
            className="bg-bitly-lightBlue hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleGetStarted}
          >
            Start Shortening Links
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;