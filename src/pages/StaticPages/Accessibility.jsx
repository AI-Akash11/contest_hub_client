import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const Accessibility = () => {
  return (
    <div className=" bg-base-100 py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Accessibility</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              ContestHub is committed to making our platform accessible to
              everyone.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Our Commitment</h2>
              <p className="text-base-content/70 leading-relaxed">
                We strive to ensure that ContestHub is accessible to all users,
                including those with disabilities. Our platform follows WCAG 2.1
                Level AA guidelines and works with modern assistive
                technologies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Key Features</h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Keyboard navigation support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Screen reader compatibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>High contrast and adjustable text sizes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Alternative text for images</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Need Help?</h2>
              <p className="text-base-content/70 leading-relaxed">
                If you experience any accessibility barriers, please contact us
                at{" "}
                <p
                  
                  className="text-primary"
                >
                  accessibility@contesthub.com
                </p>
                . We're committed to continuous improvement.
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

export default Accessibility;
