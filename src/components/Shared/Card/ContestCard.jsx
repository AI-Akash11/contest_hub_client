import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiClock,
  FiArrowRight,
  FiAward,
  FiActivity,
} from "react-icons/fi";
import { getContestStatus } from "../../../utils";

const ContestCard = ({ contest }) => {
  const {
    name,
    image,
    contestType,
    _id,
    participantCount,
    description,
    prizeMoney,
    deadline,
    winner,
  } = contest || {};

  const contestStatus = getContestStatus(deadline);

  const isWinnerDeclared = winner?.status === "declared";
  const isContestEndedByTime = contestStatus.ended;
  const isContestClosed = isContestEndedByTime || isWinnerDeclared;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="group overflow-hidden rounded-2xl bg-base-300 shadow"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-base-100/80 via-transparent to-transparent" />

        {/* Contest Type */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold bg-primary text-base-100 rounded-full">
            {contestType}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {isWinnerDeclared ? (
            <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-success text-base-100 rounded-full">
              <FiAward className="w-3 h-3" />
              Winner Declared
            </span>
          ) : isContestEndedByTime ? (
            <span className="px-3 py-1 text-xs font-semibold bg-warning text-base-100 rounded-full">
              Winner Pending
            </span>
          ) : (
            <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-accent text-base-100 rounded-full animate-pulse">
              <FiActivity className="w-3 h-3" />
              Live
            </span>
          )}
        </div>

        {/* Prize */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-base-300/90 backdrop-blur-sm rounded-lg">
            <FiDollarSign className="w-4 h-4 text-primary" />
            <span className="font-bold text-primary">
              ${prizeMoney}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-base-content/70 mb-4">
          <div className="flex items-center gap-1">
            <FiUsers className="w-4 h-4" />
            <span>{participantCount} participants</span>
          </div>

          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            {isContestClosed ? "Ended" : contestStatus.display}
          </div>
        </div>

        {/* Action */}
        <Link
          to={`/contest/${_id}`}
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
