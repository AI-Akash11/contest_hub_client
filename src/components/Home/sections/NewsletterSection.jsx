import { motion } from "framer-motion";
import SectionBadge from "../SectionBadge";
import SectionTitle from "../SectionTitle";
import SectionSubTitle from "../SectionSubTitle";
import toast from "react-hot-toast";
import Container from "../../Shared/Container";

const NewsletterSection = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success("Subscribed successfully!");
    e.target.reset();
  };

  return (
    <section className="mb-15 lg:mb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <SectionBadge color="primary">Newsletter</SectionBadge>

            <SectionTitle>
              Stay in the Loop with <span className="gradient-text">ContestHub</span>
            </SectionTitle>

            <SectionSubTitle>
              Get weekly contest updates, creator tips, and exclusive
              opportunities delivered straight to your inbox.
            </SectionSubTitle>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="flex-1 bg-base-300 border border-base-content/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="btn btn-primary py-6 px-8"
            >
              Subscribe
            </button>
          </form>

          {/* Trust Line */}
          <p className="text-center text-sm text-base-content/60 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default NewsletterSection;