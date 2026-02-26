import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const ContactUs = () => {
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
              <span className="gradient-text">Contact Us</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              Have questions? We're here to help and would love to hear from you.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Get in Touch</h2>
              <p className="text-base-content/70 leading-relaxed">
                Whether you have a question about contests, payments, account
                issues, or anything else, our team is ready to answer all your
                questions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Contact Information</h2>
              <ul className="space-y-3 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">📧</span>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    <span className="text-primary">support@contesthub.com</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">📞</span>
                  <div>
                    <span className="font-semibold">Phone:</span> 1-800-CONTEST
                    (24/7 Support)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">💬</span>
                  <div>
                    <span className="font-semibold">Live Chat:</span> Available
                    Monday-Friday, 9 AM - 6 PM EST
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">📍</span>
                  <div>
                    <span className="font-semibold">Address:</span> 123 Contest
                    Street, San Francisco, CA 94102
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Response Time</h2>
              <p className="text-base-content/70 leading-relaxed">
                We typically respond to all inquiries within 24 hours during
                business days. For urgent matters, please call our support line
                or use the live chat feature.
              </p>
            </div>

            <div className="pt-6 border-t border-base-content/10">
              <p className="text-sm text-base-content/60 text-center">
                Follow us on social media for updates and announcements
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ContactUs;