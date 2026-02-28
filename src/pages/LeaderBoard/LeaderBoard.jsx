import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ErrorPage from "../ErrorPage";
import LeaderboardSkeleton from "../../components/skeletons/LeaderboardSkeleton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const LeaderBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    data: leaderboardData = { winners: [], total: 0, currentPage: 1, totalPages: 1 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["leaderboard", currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/leaderboard?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isError) {
    return <ErrorPage />;
  }

  const { winners = [], total = 0, totalPages = 1 } = leaderboardData;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
          <p className="text-base-content/70 text-sm md:text-base">
            Top creators ranked by Prize Money
          </p>
        </motion.div>

        {isLoading ? (
          <LeaderboardSkeleton />
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Podium - only show if on page 1 (top 3) */}
            {currentPage === 1 && winners.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {/* 1st Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 text-center order-1 md:order-2 scale-105 border-2 border-primary"
                >
                  <img
                    src={winners[0].avatar}
                    alt={winners[0].name}
                    className="w-18 h-18 rounded-full mx-auto mb-2 border-4 border-primary"
                  />
                  <div className="text-2xl">🥇</div>
                  <h3 className="font-bold">{winners[0].name}</h3>
                  <p className="text-primary font-semibold">
                    {winners[0].wins} wins
                  </p>
                </motion.div>

                {/* 2nd Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-5 text-center order-2 md:order-1"
                >
                  <img
                    src={winners[1].avatar}
                    alt={winners[1].name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-primary"
                  />
                  <div className="text-2xl">🥈</div>
                  <h3 className="font-bold">{winners[1].name}</h3>
                  <p className="text-primary font-semibold">
                    {winners[1].wins} wins
                  </p>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-5 text-center order-3"
                >
                  <img
                    src={winners[2].avatar}
                    alt={winners[2].name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-primary"
                  />
                  <div className="text-2xl">🥉</div>
                  <h3 className="font-bold">{winners[2].name}</h3>
                  <p className="text-primary font-semibold">
                    {winners[2].wins} wins
                  </p>
                </motion.div>
              </div>
            )}

            {/* Mobile List */}
            <div className="space-y-3 md:hidden">
              {winners.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base-content/70">
                      #{user.rank}
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

            {/* Desktop Table */}
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
                  {winners.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-base-content/30 hover:bg-base-200 transition"
                    >
                      <td className="px-6 py-4 font-bold">#{user.rank}</td>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-outline gap-2 disabled:opacity-50"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`btn btn-sm ${
                            currentPage === page ? "btn-primary" : "btn-outline"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page}>...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-outline gap-2 disabled:opacity-50"
                >
                  Next
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default LeaderBoard;