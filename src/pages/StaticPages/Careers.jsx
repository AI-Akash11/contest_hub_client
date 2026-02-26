import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const Careers = () => {
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
              <span className="gradient-text">Careers</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              Join our team and help shape the future of creative competitions.
            </p>
          </div>

          {/* Content */}
          <div className="bg-base-200 rounded-2xl p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Why ContestHub?</h2>
              <p className="text-base-content/70 leading-relaxed">
                At ContestHub, we're building a platform that empowers creators
                worldwide. We value innovation, creativity, and collaboration.
                Join a team that's passionate about making a difference in the
                creative community.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">What We Offer</h2>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Competitive salary and equity packages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Remote-first work environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Health, dental, and vision insurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Professional development opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Flexible vacation policy</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Open Positions</h2>
              <p className="text-base-content/70 leading-relaxed">
                We're always looking for talented individuals to join our team.
                Current openings include roles in engineering, design, product
                management, and customer success. Check back soon for specific
                opportunities.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Get in Touch</h2>
              <p className="text-base-content/70 leading-relaxed">
                Interested in joining ContestHub? Send your resume and a brief
                introduction to{" "}
                <span className="text-primary">careers@contesthub.com</span>.
                We'd love to hear from you!
              </p>
            </div>

            <div className="pt-6 border-t border-base-content/10">
              <p className="text-sm text-base-content/60 text-center">
                ContestHub is an equal opportunity employer
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Careers;
