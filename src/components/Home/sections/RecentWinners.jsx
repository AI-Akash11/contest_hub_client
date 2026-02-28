import { motion } from "framer-motion";
import { FiAward, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import CountUp from "react-countup";
import Container from "../../Shared/Container";
import SectionBadge from "../SectionBadge";
import SectionTitle from "../SectionTitle";
import SectionSubTitle from "../SectionSubTitle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RecentWinners = () => {
  const {
    data: winnersData = { winners: [], recentTotalPrizes: 0, totalWinners: 0 },
    isLoading: isWinnersLoading,
  } = useQuery({
    queryKey: ["recentWinners"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/recent-winners`,
      );
      return res.data;
    },
  });

  return (
    <section className="mb-15 lg:mb-20">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionBadge color={"accent"}>Hall of Fame</SectionBadge>

          <SectionTitle>
            Recent <span className="gradient-text">Winners</span>
          </SectionTitle>
          <SectionSubTitle>
            Celebrate our talented winners who showcased exceptional creativity
            and skills. You could be next!
          </SectionSubTitle>
        </motion.div>

        {isWinnersLoading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {/* Stats Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-base-300 p-6 md:p-8 rounded-2xl mb-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Winners */}
                <div className="text-center border-b md:border-b-0 md:border-r border-base-content/10 pb-5 md:pb-0">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                    <FiAward className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    <CountUp
                      end={winnersData.totalWinners}
                      duration={2}
                      separator=","
                    />
                    +
                  </div>
                  <div className="text-base-content/70">Recent Winners</div>
                </div>

                {/* Prizes Distributed */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                    <FiDollarSign className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    $
                    <CountUp
                      end={Math.round(winnersData.recentTotalPrizes / 1000)}
                      duration={2}
                      separator=","
                    />{" "}
                    K+
                  </div>
                  <div className="text-base-content/70">Prizes Distributed</div>
                </div>

                {/* Satisfaction – keep static or remove if not needed */}
                <div className="text-center border-t md:border-t-0 md:border-l border-base-content/10 pt-5 md:pt-0">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                    <FiTrendingUp className="w-8 h-8 text-secondary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    <CountUp end={95} duration={2} />%
                  </div>
                  <div className="text-base-content/70">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Winners Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-4">
              {winnersData.winners.map((winner, index) => (
                <motion.div
                  key={index} // use index or add unique id if available
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-base-300 rounded-2xl p-6 text-center hover:shadow-primary/20 hover:shadow-2xl transition duration-200"
                >
                  <div className="relative inline-block mb-4">
                    <img
                      src={
                        winner.winnerImage || "https://i.pravatar.cc/150?img=32"
                      } // fallback
                      alt={winner.winnerName}
                      className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <FiAward className="w-4 h-4 text-base-100" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-1">
                    {winner.winnerName}
                  </h3>

                  <p className="text-sm text-base-content/70 mb-3 line-clamp-1">
                    {winner.contestName}
                  </p>

                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full">
                    <FiDollarSign className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary">
                      {winner.prizeMoney.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-6 md:p-12 rounded-2xl bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Join the Winners Circle?
          </h3>
          <p className="text-base-content/70 text-sm md:text-base mb-6 max-w-2xl mx-auto">
            Every champion started as a participant. Your talent deserves
            recognition. Enter a contest today and show the world what you're
            capable of!
          </p>
          <motion.a
            href="/all-contests"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-btn"
          >
            Start Competing Now
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default RecentWinners;
