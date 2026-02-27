import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";

const LeaderBoard = () => {
  const {
    data: leaderboardData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/leaderboard`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }
  console.log(leaderboardData);
  return (
    <div className="min-h-screen py-10 md:py-15">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-base-content/70 text-sm  md:text-base ">
            Top creators ranked by Prize Money
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* 🏆 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* 🥇 1st Place — always first on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 text-center order-1 md:order-2 scale-105 border-2 border-primary"
            >
              <img
                src={leaderboardData[0].avatar}
                alt={leaderboardData[0].name}
                className="w-18 h-18 rounded-full mx-auto mb-2 border-4 border-primary"
              />
              <div className="text-2xl">🥇</div>
              <h3 className="font-bold">{leaderboardData[0].name}</h3>
              <p className="text-primary font-semibold">
                {leaderboardData[0].wins} wins
              </p>
            </motion.div>

            {/* 🥈 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 text-center order-2 md:order-1"
            >
              <img
                src={leaderboardData[1].avatar}
                alt={leaderboardData[1].name}
                className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-primary"
              />
              <div className="text-2xl">🥈</div>
              <h3 className="font-bold">{leaderboardData[1].name}</h3>
              <p className="text-primary font-semibold">
                {leaderboardData[1].wins} wins
              </p>
            </motion.div>

            {/* 🥉 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 text-center order-3"
            >
              <img
                src={leaderboardData[2].avatar}
                alt={leaderboardData[2].name}
                className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-primary"
              />
              <div className="text-2xl">🥉</div>
              <h3 className="font-bold">{leaderboardData[2].name}</h3>
              <p className="text-primary font-semibold">
                {leaderboardData[2].wins} wins
              </p>
            </motion.div>
          </div>

          {/* 📱 Mobile Leaderboard List */}
          <div className="space-y-3 md:hidden">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base-content/70">
                    #{index + 1}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold leading-tight">{user.name}</p>
                    <p className="text-xs text-base-content/60">
                      {user.wins} wins
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-accent">
                    ${user.earnings.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 🖥️ Tablet & Desktop Table */}
          <div className="hidden md:block glass-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-base-300">
                <tr>
                  <th className="px-6 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">Creator</th>
                  <th className="px-6 py-4 text-center">Wins</th>
                  <th className="px-6 py-4 text-right">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-t border-base-content/30 hover:bg-base-200 transition"
                  >
                    <td className="px-6 py-4 font-bold">#{index + 1}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">
                        {user.wins}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-accent">
                      ${user.earnings.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LeaderBoard;
