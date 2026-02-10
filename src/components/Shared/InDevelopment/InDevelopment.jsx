import { Link } from "react-router";
import { FiTool, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import Container from "../Container";

const InDevelopment = ({
  title = "Page Under Development",
  message = "We’re working hard to bring this feature to life. Please check back soon!",
}) => {
  return (
    <section className="min-h-[80vh] bg-linear-to-br from-base-200 via-base-100 to-primary/5 flex items-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16"
        >
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start w-16 h-16 mb-6 rounded-xl bg-warning/20">
              <FiTool className="w-8 h-8 text-warning" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

            <p className="text-base-content/70 max-w-xl mx-auto lg:mx-0 mb-8">
              {message}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-base-100 font-semibold hover:scale-105 transition"
              >
                <FiArrowLeft />
                Back to Home
              </Link>

              <Link
                to="/all-contests"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-base-200 hover:bg-base-100 font-medium transition"
              >
                Browse Contests
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative w-64 h-64 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
              <FiTool className="relative w-20 h-20 text-primary opacity-80" />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default InDevelopment;
