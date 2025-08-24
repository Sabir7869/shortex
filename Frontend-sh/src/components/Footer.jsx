import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-bitly-navy border-t border-bitly-blue/20 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Shortex</h2>
            <p className="text-gray-300 mb-4 max-w-md">
              Simplifying URL shortening for efficient sharing. Connect your audience 
              to the right information with powerful link management tools.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Sabir7869" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bitly-lightBlue transition-colors duration-200">
                <FaGithub size={20} />
              </a>
              <a href="https://x.com/sabir_7634" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bitly-lightBlue transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/sabir_032/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bitly-lightBlue transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com/in/sabir-ansari-68124a253/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bitly-lightBlue transition-colors duration-200">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bitly-blue/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-mono tracking-wide flex items-center gap-1" style={{ fontFamily: 'Fira Code, Fira Mono, monospace', fontSize: '1.1rem' }}>
            made by <span className="font-bold text-white ml-1">Sabir</span>
            <span className="text-red-500 text-lg" style={{fontFamily: 'inherit'}}>&hearts;</span>
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;