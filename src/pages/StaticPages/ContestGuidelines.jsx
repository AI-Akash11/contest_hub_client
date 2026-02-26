import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const ContestGuidelines = () => {
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
              <span className="gradient-text">Contest Guidelines</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              Essential rules and guidelines for participating in contests on
              ContestHub.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Eligibility</h2>
              <p className="text-base-content/70 leading-relaxed">
                Contests are open to individuals 18 years or older. Participants
                must have a valid ContestHub account and agree to our terms of
                service. Some contests may have additional eligibility
                requirements specified by the contest creator.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Participation Rules</h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Submit original work that you own or have rights to use
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Follow all submission requirements and deadlines
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    One submission per participant unless otherwise stated
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Respect intellectual property rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Maintain professional and respectful conduct</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">
                Judging and Winners
              </h2>
              <p className="text-base-content/70 leading-relaxed">
                Winners are selected by contest creators based on criteria
                specified in each contest. Decisions are final. Winners will be
                notified via email and announced on the contest page. Prize
                distribution occurs within 30 days of winner announcement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Prohibited Content</h2>
              <p className="text-base-content/70 leading-relaxed">
                Submissions containing hate speech, violence, explicit content,
                plagiarism, or illegal material will be disqualified. We reserve
                the right to remove any content that violates our community
                standards.
              </p>
            </div>

            <div className="pt-6 border-t border-base-content/10">
              <p className="text-sm text-base-content/60 text-center">
                Questions? Contact us at{" "}
                <span className="text-primary">support@contesthub.com</span>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ContestGuidelines;