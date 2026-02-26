import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const TermsOfService = () => {
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
              <span className="gradient-text">Terms of Service</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              The rules and regulations for using ContestHub.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Agreement to Terms</h2>
              <p className="text-base-content/70 leading-relaxed">
                By accessing and using ContestHub, you accept and agree to be
                bound by these Terms of Service. If you do not agree to these
                terms, please do not use our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">User Accounts</h2>
              <p className="text-base-content/70 leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You must be at least 18 years old to create an account
                and participate in contests.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">User Conduct</h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Submit only original work you own or have rights to</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Respect intellectual property rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Not engage in fraudulent activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Maintain respectful behavior toward other users</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Payments and Fees</h2>
              <p className="text-base-content/70 leading-relaxed">
                All payments are processed securely through our payment
                partners. Entry fees are generally non-refundable. Prize
                payments are made according to the terms specified in each
                contest.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Limitation of Liability</h2>
              <p className="text-base-content/70 leading-relaxed">
                ContestHub is not liable for any indirect, incidental, or
                consequential damages arising from your use of the platform. We
                provide the service "as is" without warranties of any kind.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Changes to Terms</h2>
              <p className="text-base-content/70 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued
                use of the platform after changes constitutes acceptance of the
                new terms.
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

export default TermsOfService;