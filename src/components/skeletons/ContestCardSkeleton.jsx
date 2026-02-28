import { motion } from "framer-motion";

const ContestCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-base-200 rounded-2xl overflow-hidden shadow-lg animate-pulse"
    >
      {/* Image Placeholder */}
      <div className="h-48 bg-base-300" />

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-6 bg-base-300 rounded w-4/5" />

        {/* Type & Prize */}
        <div className="flex gap-3">
          <div className="h-5 bg-base-300 rounded w-20" />
          <div className="h-5 bg-base-300 rounded w-24" />
        </div>

        {/* Meta */}
        <div className="flex gap-4">
          <div className="h-4 bg-base-300 rounded w-32" />
          <div className="h-4 bg-base-300 rounded w-20" />
        </div>

        {/* Deadline */}
        <div className="h-4 bg-base-300 rounded w-40" />

        {/* Button Placeholder */}
        <div className="h-10 bg-base-300 rounded-full mt-4" />
      </div>
    </motion.div>
  );
};

export default ContestCardSkeleton;