import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const HelpCenter = () => {
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
              <span className="gradient-text">Help Center</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              Get help and support for using ContestHub.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Getting Started</h2>
              <p className="text-base-content/70 leading-relaxed">
                New to ContestHub? Start by creating an account, browsing
                available contests, and reading our contest guidelines. Once
                you're ready, you can participate in contests or apply to become
                a creator.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Popular Topics</h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>How to submit contest entries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Payment and refund information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Becoming a contest creator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Account settings and security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Understanding contest rules</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Account Issues</h2>
              <p className="text-base-content/70 leading-relaxed">
                Having trouble with your account? Try resetting your password,
                checking your email for verification links, or clearing your
                browser cache. For persistent issues, contact our support team.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Contact Support</h2>
              <p className="text-base-content/70 leading-relaxed">
                Can't find what you're looking for? Our support team is
                available 24/7 to help.
              </p>
              <ul className="space-y-2 text-base-content/70 mt-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">📧</span>
                  <span>
                    Email:{" "}
                    <span className="text-primary">support@contesthub.com</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">📞</span>
                  <span>Phone: 1-800-CONTEST</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">💬</span>
                  <span>Live Chat: Available on our website</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-base-content/10">
              <p className="text-sm text-base-content/60 text-center">
                Response time: Within 24 hours
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default HelpCenter;
