import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const leaderboardData = [
  {
    id: 1,
    name: "Sarah Johnson",
    wins: 18,
    earnings: 24500,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "Alex Carter",
    wins: 15,
    earnings: 19800,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Emily Davis",
    wins: 13,
    earnings: 16200,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 4,
    name: "Michael Lee",
    wins: 12,
    earnings: 14100,
    avatar: "https://i.pravatar.cc/150?img=22",
  },
  {
    id: 5,
    name: "Sophia Brown",
    wins: 11,
    earnings: 13200,
    avatar: "https://i.pravatar.cc/150?img=25",
  },
  {
    id: 6,
    name: "Daniel Wilson",
    wins: 10,
    earnings: 12100,
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 7,
    name: "Olivia Martin",
    wins: 9,
    earnings: 10900,
    avatar: "https://i.pravatar.cc/150?img=40",
  },
  {
    id: 8,
    name: "James Anderson",
    wins: 8,
    earnings: 9800,
    avatar: "https://i.pravatar.cc/150?img=36",
  },
  {
    id: 9,
    name: "Isabella Moore",
    wins: 7,
    earnings: 8700,
    avatar: "https://i.pravatar.cc/150?img=29",
  },
  {
    id: 10,
    name: "William Taylor",
    wins: 6,
    earnings: 7600,
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

const LeaderBoard = () => {
  return (
    <div className="min-h-screen">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-base-content/70">
            Top creators ranked by contest wins
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* 🏆 Podium */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* 🥇 1st Place — always first on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 text-center order-1 sm:order-2 scale-105 border-2 border-primary"
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
              className="glass-card p-5 text-center order-2 sm:order-1"
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
