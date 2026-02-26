import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const CookiePolicy = () => {
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
              <span className="gradient-text">Cookie Policy</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              How ContestHub uses cookies to improve your experience.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">What Are Cookies?</h2>
              <p className="text-base-content/70 leading-relaxed">
                Cookies are small text files stored on your device when you
                visit our website. They help us provide you with a better
                experience by remembering your preferences and understanding how
                you use our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Types of Cookies We Use</h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <span className="font-semibold">Essential Cookies:</span>{" "}
                    Required for the website to function properly
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <span className="font-semibold">Performance Cookies:</span>{" "}
                    Help us understand how visitors interact with our site
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <span className="font-semibold">Functional Cookies:</span>{" "}
                    Remember your preferences and settings
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <span className="font-semibold">Analytics Cookies:</span>{" "}
                    Track website usage and performance
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Managing Cookies</h2>
              <p className="text-base-content/70 leading-relaxed">
                You can control and manage cookies through your browser
                settings. Note that disabling certain cookies may affect the
                functionality of our website. Most browsers allow you to refuse
                cookies or delete cookies already stored.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Third-Party Cookies</h2>
              <p className="text-base-content/70 leading-relaxed">
                We may use third-party services like Google Analytics and
                payment processors that set their own cookies. These help us
                improve our services and understand user behavior. Please refer
                to their respective privacy policies for more information.
              </p>
            </div>

            <div className="pt-6 border-t border-base-content/10">
              <p className="text-sm text-base-content/60 text-center">
                Last updated: February 2025
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default CookiePolicy;