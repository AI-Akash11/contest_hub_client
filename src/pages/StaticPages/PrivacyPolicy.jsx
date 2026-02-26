import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const PrivacyPolicy = () => {
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
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              How we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Information We Collect</h2>
              <p className="text-base-content/70 leading-relaxed">
                We collect information you provide directly, such as your name,
                email, payment details, and contest submissions. We also collect
                usage data, including IP address, browser type, and how you
                interact with our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">
                How We Use Your Information
              </h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Process contest entries and payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Communicate important updates and notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Improve our platform and user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Prevent fraud and ensure platform security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Data Security</h2>
              <p className="text-base-content/70 leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information. All payment data is encrypted and
                processed through secure payment providers. However, no method
                of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Your Rights</h2>
              <p className="text-base-content/70 leading-relaxed">
                You have the right to access, update, or delete your personal
                information. You can manage your data through your account
                settings or contact us at{" "}
                <span className="text-primary">privacy@contesthub.com</span> for
                assistance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Third-Party Services</h2>
              <p className="text-base-content/70 leading-relaxed">
                We use third-party services like payment processors and
                analytics tools. These services have their own privacy policies
                and we encourage you to review them.
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

export default PrivacyPolicy;
