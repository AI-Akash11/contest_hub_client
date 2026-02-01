import { motion } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiClock,
  FiAward,
  FiUser,
} from "react-icons/fi";
import Container from "../../components/Shared/Container";

const contest = {
  name: "Ultimate UI Design Challenge",
  type: "Design",
  image:
    "https://i.ibb.co.com/1f0k26yn/bfbe84ae883bd1b72308a9d510d8a3f2.jpg",
  description:
    "Participate in an exciting UI design challenge where creativity meets usability. Showcase your design skills and compete with talented creators worldwide.",
  taskInstructions:
    "Design a modern landing page for a creative contest platform. Submit your Figma or live demo link.",
  prizeMoney: 2500,
  entryFee: 25,
  participantsCount: 342,
  creatorName: "CreativeHub",
  deadline: "March 30, 2026",
  winnerName: "Alex Johnson",
  winnerPhoto:
    "https://randomuser.me/api/portraits/men/32.jpg",
};

const ContestDetails = () => {
  return (
    <section className="bg-linear-to-br from-base-200 via-accent/5 to-primary/10 pb-20">
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <Container>
            <div className="pb-8">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold bg-primary/20 text-primary rounded-full">
                {contest.type} Contest
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {contest.name}
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
              <h2 className="text-xl font-bold mb-4">
                About This Contest
              </h2>
              <p className="text-base-content/70 leading-relaxed">
                {contest.description}
              </p>
            </motion.div>

            {/* Task */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 md:p-8 bg-base-300 rounded-2xl"
            >
              <h2 className="text-xl font-bold mb-4">
                Task Instructions
              </h2>
              <p className="text-base-content/70 leading-relaxed">
                {contest.taskInstructions}
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
                  <h3 className="text-lg font-bold">
                    {contest.winnerName}
                  </h3>
                  <p className="text-base-content/70">
                    Won ${contest.prizeMoney}
                  </p>
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
                value={`$${contest.prizeMoney}`}
                color="primary"
              />
              <Stat
                icon={<FiDollarSign />}
                label="Entry Fee"
                value={`$${contest.entryFee}`}
              />
              <Stat
                icon={<FiUsers />}
                label="Participants"
                value={contest.participantsCount}
              />
              <Stat
                icon={<FiUser />}
                label="Created By"
                value={contest.creatorName}
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
                <h3 className="font-semibold">Deadline</h3>
              </div>
              <p className="text-lg font-bold text-primary">
                {contest.deadline}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button className="w-full py-4 rounded-xl bg-primary text-base-100 font-semibold hover:scale-105 transition">
                Register & Pay ${contest.entryFee}
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
