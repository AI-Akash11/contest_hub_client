import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import Container from "../Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-content/10">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-amber-400 flex items-center justify-center">
                  <span className="text-xl font-black text-base-100">C</span>
                </div>
                <span className="text-xl font-bold gradient-text">
                  ContestHub
                </span>
              </Link>

              <p className="text-sm text-base-content/70 mb-4">
                Empowering creativity through competitions. Join thousands of
                creators competing for amazing prizes.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-base-300 hover:bg-primary hover:text-base-100 transition flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-base-300 hover:bg-primary hover:text-base-100 transition flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-base-300 hover:bg-primary hover:text-base-100 transition flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-base-300 hover:bg-primary hover:text-base-100 transition flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-base-300 hover:bg-primary hover:text-base-100 transition flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-base-content/70 hover:text-primary transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/all-contests" className="text-base-content/70 hover:text-primary transition">
                    All Contests
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-base-content/70 hover:text-primary transition">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-base-content/70 hover:text-primary transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/contact-us" className="text-base-content/70 hover:text-primary transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-base-content/70 hover:text-primary transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/help-center" className="text-base-content/70 hover:text-primary transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contest-guidelines" className="text-base-content/70 hover:text-primary transition">
                    Contest Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/privacy-policy" className="text-base-content/70 hover:text-primary transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-base-content/70 hover:text-primary transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="text-base-content/70 hover:text-primary transition">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="text-base-content/70 hover:text-primary transition">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-base-content/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-base-content/60">
                © {currentYear} ContestHub Inc. All rights reserved.
              </p>

              <div className="flex gap-6 text-sm">
                <Link to="/sitemap" className="text-base-content/60 hover:text-primary transition">
                  Sitemap
                </Link>
                <Link to="/accessibility" className="text-base-content/60 hover:text-primary transition">
                  Accessibility
                </Link>
                <Link to="/careers" className="text-base-content/60 hover:text-primary transition">
                  Careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
