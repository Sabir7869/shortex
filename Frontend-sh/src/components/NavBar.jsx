import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";


const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <nav className="bg-bitly-navy border-b border-bitly-blue/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Shortex
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  path === "/"
                    ? "text-white bg-bitly-blue/20"
                    : "text-gray-300 hover:text-white hover:bg-bitly-blue/10"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  path === "/about"
                    ? "text-white bg-bitly-blue/20"
                    : "text-gray-300 hover:text-white hover:bg-bitly-blue/10"
                }`}
              >
                About
              </Link>
              {token && (
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    path === "/dashboard"
                      ? "text-white bg-bitly-blue/20"
                      : "text-gray-300 hover:text-white hover:bg-bitly-blue/10"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-bitly-lightBlue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Sign up Free
                </Link>
              </>
            ) : (
              <button
                onClick={onLogOutHandler}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Log Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-200"
            >
              {navbarOpen ? (
                <RxCross2 className="h-6 w-6" />
              ) : (
                <IoIosMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${navbarOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-bitly-navy border-t border-bitly-blue/20">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              path === "/"
                ? "text-white bg-bitly-blue/20"
                : "text-gray-300 hover:text-white hover:bg-bitly-blue/10"
            }`}
            onClick={() => setNavbarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              path === "/about"
                ? "text-white bg-bitly-blue/20"
                : "text-gray-300 hover:text-white hover:bg-bitly-blue/10"
            }`}
            onClick={() => setNavbarOpen(false)}
          >
            About
          </Link>
          {token && (
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                path === "/dashboard"
                  ? "text-white bg-bitly-blue/20"
                  : "text-gray-300 hover:text-white hover:bg-bitly-blue/10"
              }`}
              onClick={() => setNavbarOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <div className="border-t border-bitly-blue/20 pt-4 mt-4">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-bitly-blue/10 transition-colors duration-200"
                  onClick={() => setNavbarOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block mt-2 bg-bitly-lightBlue hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                  onClick={() => setNavbarOpen(false)}
                >
                  Sign up Free
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  onLogOutHandler();
                  setNavbarOpen(false);
                }}
                className="block w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;