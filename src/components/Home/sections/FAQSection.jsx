import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import SectionBadge from "../SectionBadge";
import SectionTitle from "../SectionTitle";
import SectionSubTitle from "../SectionSubTitle";
import Container from "../../Shared/Container";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I participate in a contest?",
      answer:
        "Browse available contests, click on one that interests you, pay the entry fee, and submit your work according to the contest guidelines before the deadline.",
    },
    {
      question: "How do I create a contest?",
      answer:
        "You need a creator account. Request creator access from your dashboard, wait for admin approval, then you can create and manage your own contests.",
    },
    {
      question: "When will I receive my prize money?",
      answer:
        "Prize money is typically distributed within 30 days after the winner is announced. You'll receive payment via your preferred method set in your account.",
    },
    {
      question: "Can I submit multiple entries?",
      answer:
        "This depends on the specific contest rules. Most contests allow one submission per participant unless otherwise stated by the contest creator.",
    },
    {
      question: "How are winners selected?",
      answer:
        "Winners are chosen by contest creators based on the criteria specified in each contest. All decisions are final and winners are notified via email.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-15 lg:mb-20">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionBadge color="secondary">FAQs</SectionBadge>

          <SectionTitle>
            Frequently Asked <span className="gradient-text">Questions</span>
          </SectionTitle>

          <SectionSubTitle>
            Quick answers to common questions about participating in and
            creating contests on ContestHub.
          </SectionSubTitle>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-base-300 rounded-xl overflow-hidden shadow-md shadow-base-content/5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-base-200 transition"
              >
                <span className="font-semibold pr-4">
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`w-5 h-5 text-primary transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-base-content/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;