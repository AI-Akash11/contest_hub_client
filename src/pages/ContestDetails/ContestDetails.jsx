import { motion } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiClock,
  FiAward,
  FiUser,
  FiMail,
} from "react-icons/fi";
import Container from "../../components/Shared/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDeadline, getContestStatus } from "../../utils";

const contest = {
  winnerName: "Alex Johnson",
  winnerPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
};

const ContestDetails = () => {
  const { id } = useParams();
  const { data: contestDetails = [] } = useQuery({
    queryKey: ["contestDetails", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/contest/${id}`);
      return res.data;
    },
  });

  const {
    name,
    image,
    contestType,
    description,
    taskInstruction,
    prizeMoney,
    entryFee,
    participantCount,
    creatorName,
    creatorEmail,
    deadline,
  } = contestDetails || {};

  const formatedDeadline = formatDeadline(deadline);
  const contestStatus = getContestStatus(deadline);

  return (
    <section className="bg-linear-to-br from-base-200 via-accent/5 to-primary/10 pb-20">
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <Container>
            <div className="pb-8">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold bg-primary/20 text-primary rounded-full">
                {contestType} Contest
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {name}
              </h1>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 bg-base-300 rounded-2xl"
            >
              <h2 className="text-xl font-bold mb-4">About This Contest</h2>
              <p className="text-base-content/70 leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Task */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 md:p-8 bg-base-300 rounded-2xl"
            >
              <h2 className="text-xl font-bold mb-4">Task Instructions</h2>
              <p className="text-base-content/70 leading-relaxed">
                {taskInstruction}
              </p>
            </motion.div>

            {/* Winner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 md:p-8 bg-base-300 rounded-2xl border border-primary/30"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={contest.winnerPhoto}
                    alt={contest.winnerName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <FiAward className="w-3 h-3 text-base-100" />
                  </div>
                </div>
                <div>
                  <span className="text-sm text-primary font-medium">
                    🏆 Winner
                  </span>
                  <h3 className="text-lg font-bold">{contest.winnerName}</h3>
                  <p className="text-base-content/70">Won ${prizeMoney}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-base-300 rounded-2xl space-y-4"
            >
              <Stat
                icon={<FiDollarSign />}
                label="Prize Money"
                value={`$${prizeMoney}`}
                color="primary"
              />
              <Stat
                icon={<FiDollarSign />}
                label="Entry Fee"
                value={`$${entryFee}`}
              />
              <Stat
                icon={<FiUsers />}
                label="Participants"
                value={participantCount}
              />
              <Stat icon={<FiUser />} label="Created By" value={creatorName} />
              <Stat
                icon={<FiMail />}
                label="Creator Email"
                value={creatorEmail}
              />
            </motion.div>

            {/* Countdown (Static) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-base-300 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiClock className="text-primary" />
                <h3 className="font-semibold">Participation Deadline ---</h3>
              </div>
              <p className="text-lg font-bold text-primary">
                {contestStatus.ended ? (
                  <div className="flex items-center gap-1 text-error">
                    Ended
                  </div>
                ) : (
                  formatedDeadline
                )}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button 
              disabled={contestStatus.ended}
              className="w-full py-4 rounded-xl bg-primary text-base-100 font-semibold hover:scale-105 transition disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:scale-100">
                Register & Pay ${entryFee}
              </button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const Stat = ({ icon, label, value, color = "base" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl bg-${color}/20 flex items-center justify-center`}
      >
        <span className={`text-${color}`}>{icon}</span>
      </div>
      <span className="text-base-content/70">{label}</span>
    </div>
    <span className="font-bold">{value}</span>
  </div>
);

export default ContestDetails;
