import { motion } from "framer-motion";
import Container from "../Shared/Container";
import ContestCard from "../Shared/Card/ContestCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const PopularContests = () => {
  const {
    data: popularContests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/popular-contests`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading Popular Contests"></LoadingSpinner>;
  }

  if (isError) {
    return null;
  }

  return (
    <Container>
      <div className="my-5 md:my-10 lg:my-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
            Trending Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular <span className="gradient-text">Contests</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Join the most exciting competitions with the highest participation.
            These contests are heating up - don't miss your chance to compete!
          </p>
        </motion.div>

        {/* Contests Grid */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularContests.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default PopularContests;
