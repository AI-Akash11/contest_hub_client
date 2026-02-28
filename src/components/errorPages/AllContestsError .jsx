import { motion } from "framer-motion";
import { FiAlertCircle, FiRefreshCw, FiHome } from "react-icons/fi";
import { Link } from "react-router";

const AllContestsError = ({ onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      {/* Error Icon */}
      <div className="w-20 h-20 rounded-full bg-error/20 flex items-center justify-center mb-6">
        <FiAlertCircle className="w-10 h-10 text-error" />
      </div>

      {/* Error Message */}
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
        Oops! Something Went Wrong
      </h2>
      <p className="text-base-content/70 text-center max-w-md mb-8">
        We couldn't load the contests. This might be due to a network issue or
        server problem. Please try again.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onRetry} className="btn btn-primary gap-2">
          <FiRefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <Link to="/" className="btn btn-outline gap-2">
          <FiHome className="w-4 h-4" />
          Go Home
        </Link>
      </div>

      {/* Additional Help Text */}
      <p className="text-sm text-base-content/50 mt-8 text-center">
        If the problem persists, please contact support or try again later.
      </p>
    </motion.div>
  );
};

export default AllContestsError;
