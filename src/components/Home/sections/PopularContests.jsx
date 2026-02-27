import { motion } from "framer-motion";
import Container from "../../Shared/Container";
import ContestCard from "../../Shared/Card/ContestCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router";
import SectionBadge from "../SectionBadge";
import SectionTitle from "../SectionTitle";
import SectionSubTitle from "../SectionSubTitle";

const PopularContests = () => {
  const {
    data: popularContests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/popular-contests`,
      );
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
    <section className="mb-15 lg:mb-20">
    <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <SectionBadge color={"primary"}>Trending Now</SectionBadge>
          <SectionTitle>
            Popular <span className="gradient-text">Contests</span>
          </SectionTitle>
          <SectionSubTitle>
            Join the most exciting competitions with the highest participation.
            <span className="hidden md:inline">These contests are heating up - don't miss your chance to compete!</span>
          </SectionSubTitle>
        </motion.div>

        {/* Contests Grid */}
        <section >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-4">
            {popularContests.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/all-contests"
                className="primary-btn"
              >
                Show All Contests
              </Link>
            </motion.div>
          </div>
        </section>
    </Container>
    </section>
  );
};

export default PopularContests;
