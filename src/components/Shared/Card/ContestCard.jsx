import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiUsers, FiDollarSign, FiClock, FiArrowRight } from "react-icons/fi";

const ContestCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="group overflow-hidden rounded-t-2xl bg-base-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="https://i.ibb.co.com/1f0k26yn/bfbe84ae883bd1b72308a9d510d8a3f2.jpg"
          alt="contest image"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-base-100/80 via-transparent to-transparent" />

        {/* Contest Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold bg-primary text-base-100 rounded-full">
            Type
          </span>
        </div>

        {/* Winner Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-semibold bg-accent text-base-content rounded-full">
            Winner Declared
          </span>
        </div>

        {/* Prize Money */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-base-300/90 backdrop-blur-sm rounded-lg">
            <FiDollarSign className="w-4 h-4 text-primary" />
            <span className="font-bold text-primary">1000$</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          Contest Title
        </h3>

        <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In porro
          beatae itaque quis natus explicabo quo nemo dicta suscipit libero?
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-base-content/70 mb-4">
          <div className="flex items-center gap-1">
            <FiUsers className="w-4 h-4" />
            <span>100 participants</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            Ended
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/contest/1`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-base-100 font-semibold rounded-lg transition-all duration-300 group/btn"
        >
          View Details
          <FiArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ContestCard;
