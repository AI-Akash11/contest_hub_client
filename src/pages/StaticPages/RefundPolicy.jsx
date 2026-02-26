import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const RefundPolicy = () => {
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
              <span className="gradient-text">Refund Policy</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              Understanding our refund process and eligibility criteria.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">General Policy</h2>
              <p className="text-base-content/70 leading-relaxed">
                Contest entry fees are generally non-refundable once paid.
                However, we understand that circumstances may arise, and we
                evaluate refund requests on a case-by-case basis.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Eligible for Refund</h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Contest is cancelled by the creator or admin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Technical errors preventing contest participation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Duplicate payment charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Fraudulent transactions</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Not Eligible for Refund</h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Change of mind after payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Failure to submit entry before deadline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Disqualification due to rule violations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Not winning the contest</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Refund Process</h2>
              <p className="text-base-content/70 leading-relaxed">
                To request a refund, contact our support team at{" "}
                <span className="text-primary">refunds@contesthub.com</span>{" "}
                within 7 days of payment. Include your transaction ID and reason
                for the request. Approved refunds are processed within 5-10
                business days to your original payment method.
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

export default RefundPolicy;