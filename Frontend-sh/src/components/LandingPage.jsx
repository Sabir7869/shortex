import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";
import api from "../api/api";
import { copyToClipboard } from "../utils/clipboardUtils";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const watchUrl = watch("originalUrl");

  const dashBoardNavigateHandler = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const createShortUrlHandler = async (data) => {
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;
      setShortUrl(shortenUrl);
      
      // Copy to clipboard with better browser compatibility
      const copySuccess = await copyToClipboard(shortenUrl);
      
      if (copySuccess) {
        toast.success("Short URL created and copied to clipboard!", {
          position: "bottom-center",
          className: "mb-5",
          duration: 4000,
        });
      } else {
        toast.success("Short URL created! (Manual copy needed)", {
          position: "bottom-center",
          className: "mb-5",
          duration: 4000,
        });
      }

      // Reset the form after a delay to show the result
      setTimeout(() => {
        reset();
        setShortUrl("");
      }, 5000);

    } catch {
      toast.error("Failed to create short URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (watchUrl && watchUrl.trim()) {
      handleSubmit(createShortUrlHandler)();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bitly-navy via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Build stronger 
                <span className="text-bitly-lightBlue"> digital connections</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Use our URL shortener to engage your audience and connect them to the right 
                information. Build, edit, and track everything inside the Shortex Platform.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  onClick={dashBoardNavigateHandler}
                  className="bg-bitly-lightBlue hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {token ? "Go to Dashboard" : "Get your link for free"} →
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* URL Shortener Demo Card */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-auto lg:max-w-none">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Shorten a long link</h3>
                <p className="text-gray-600 text-sm mb-6">
                  {token ? "Paste your URL and get a short link instantly!" : "No credit card required."}
                </p>
                
                <form onSubmit={handleInputSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paste your long link here
                    </label>
                    <input
                      {...register("originalUrl", {
                        required: "URL is required",
                        pattern: {
                          value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                          message: "Please enter a valid URL",
                        },
                      })}
                      type="text"
                      placeholder="https://example.com/my-long-url"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-bitly-lightBlue focus:border-transparent outline-none transition-all ${
                        errors.originalUrl ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={loading}
                    />
                    {errors.originalUrl && (
                      <p className="text-red-500 text-sm mt-1">{errors.originalUrl.message}</p>
                    )}
                  </div>

                  {/* Show shortened URL result */}
                  {shortUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-4"
                    >
                      <p className="text-sm text-green-800 font-medium mb-2">✅ Short URL created and copied!</p>
                      <div className="bg-white border rounded p-2 break-all text-sm text-bitly-lightBlue font-medium">
                        {shortUrl}
                      </div>
                    </motion.div>
                  )}

                  <button 
                    type="submit"
                    disabled={loading || !watchUrl?.trim()}
                    className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center ${
                      loading || !watchUrl?.trim()
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-bitly-lightBlue hover:bg-blue-600 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : token ? (
                      "Shorten URL"
                    ) : (
                      "Sign up to shorten"
                    )}
                  </button>
                </form>

                {/* Login prompt for non-authenticated users */}
                {!token && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        onClick={() => navigate("/login")}
                        className="text-bitly-lightBlue hover:text-blue-600 font-medium"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by individuals and teams at the world&apos;s best companies
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
            <Card
              title="Simple URL Shortening"
              desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
            />
            <Card
              title="Powerful Analytics"
              desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
            />
            <Card
              title="Enhanced Security"
              desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
            />
            <Card
              title="Fast and Reliable"
              desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;