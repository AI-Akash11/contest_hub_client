import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ = () => {
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
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and secure payment methods through Stripe. All transactions are encrypted and secure.",
    },
    {
      question: "How are winners selected?",
      answer:
        "Winners are chosen by contest creators based on the criteria specified in each contest. All decisions are final and winners are notified via email.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Refunds are handled on a case-by-case basis. Please refer to our Refund Policy or contact support for specific refund requests.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team via email at support@contesthub.com, call 1-800-CONTEST, or use the live chat feature on our website.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              <span className="gradient-text">Frequently Asked Questions</span>
            </h1>
            <p className="md:text-lg text-base-content/70">
              Find answers to common questions about ContestHub.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-base-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-base-300 transition"
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <FiChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
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
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center bg-base-200 rounded-xl p-8">
            <h2 className="text-xl font-bold mb-3">Still Have Questions?</h2>
            <p className="text-base-content/70 mb-4">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <p className="text-base-content/70">
              Contact us at{" "}
              <span className="text-primary">support@contesthub.com</span>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default FAQ;