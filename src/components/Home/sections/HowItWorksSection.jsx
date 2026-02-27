import { motion } from "framer-motion";
import SectionBadge from "../SectionBadge";
import SectionTitle from "../SectionTitle";
import SectionSubTitle from "../SectionSubTitle";
import { FiSearch, FiUpload, FiAward } from "react-icons/fi";
import Container from "../../Shared/Container";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FiSearch,
      title: "Choose a Contest",
      description:
        "Browse contests by category, prize pool, or deadline and find the perfect challenge for your skills.",
    },
    {
      icon: FiUpload,
      title: "Submit Your Work",
      description:
        "Follow the contest guidelines and upload your entry before the submission deadline.",
    },
    {
      icon: FiAward,
      title: "Win & Get Rewarded",
      description:
        "Winners are selected by contest creators and prizes are paid securely to your account.",
    },
  ];

  return (
    <section className="mb-15 lg:mb-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionBadge color="accent">How It Works</SectionBadge>
          <SectionTitle>
            Get Started in{" "}
            <span className="gradient-text">3 Simple Steps</span>
          </SectionTitle>
          <SectionSubTitle>
            Participating in contests on ContestHub is fast, transparent,
            and rewarding.
          </SectionSubTitle>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-base-300 rounded-xl py-8 px-6 text-center shadow-xl shadow-base-content/5 hover:shadow-primary/20 transition"
            >
              {/* Step Number */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-content w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-base-content/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;