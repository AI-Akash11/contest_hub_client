import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import { Link } from "react-router";

const Sitemap = () => {
  const sections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "All Contests", path: "/all-contests" },
        { name: "Leaderboard", path: "/leaderboard" },
        { name: "About Us", path: "/about" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", path: "/contact-us" },
        { name: "FAQ", path: "/faq" },
        { name: "Help Center", path: "/help-center" },
        { name: "Contest Guidelines", path: "/contest-guidelines" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms-of-service" },
        { name: "Cookie Policy", path: "/cookie-policy" },
        { name: "Refund Policy", path: "/refund-policy" },
      ],
    },
    {
      title: "Other",
      links: [
        { name: "Accessibility", path: "/accessibility" },
        { name: "Careers", path: "/careers" },
        { name: "Sitemap", path: "/sitemap" },
      ],
    },
  ];

  return (
    <div className="bg-base-100 py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Sitemap</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              Navigate through all pages on ContestHub.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          to={link.path}
                          className="text-base-content/70 hover:text-primary transition flex items-center gap-2"
                        >
                          <span className="text-primary">→</span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-base-content/10 text-center">
              <p className="text-sm text-base-content/60">
                Can't find what you're looking for?{" "}
                <Link to="/contact-us" className="text-primary hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Sitemap;