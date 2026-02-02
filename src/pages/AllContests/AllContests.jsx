import { motion } from "framer-motion";
import { FiSearch, FiFilter } from "react-icons/fi";
import ContestCard from "../../components/Shared/Card/ContestCard";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import NotFound from "../../components/Shared/NotFound/NotFound";

const AllContests = () => {
  const {
    data: allContests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/all-contests");
      return res.data;
    },
  });

  console.log(allContests);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <Container>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore All <span className="gradient-text">Contests</span>
            </h1>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Discover a wide range of creative competitions across various
              categories. Find the perfect contest that matches your skills and
              interests.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/80" />
              <input
                type="text"
                placeholder="Search contests..."
                className="input-style pl-12 bg-base-300 w-full h-full py-4 rounded-lg border border-base-content/20"
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-primary text-base-content/90"
              }
            >
              All
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
            <button
              className={
                "px-4 py-2 rounded-full font-medium text-sm transition-all bg-base-300 text-base-content/90"
              }
            >
              Category
            </button>
          </motion.div>
        </section>

        {/* Contests Grid */}

        {allContests.length === 0 ? (
          <NotFound></NotFound>
        ) : (
          <section className="pb-16">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base-content/70">
                Showing{" "}
                <span className="text-base-content font-semibold">
                  {allContests.length}
                </span>{" "}
                contests
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allContests.map((contest) => (
                <ContestCard key={contest._id} contest={contest} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Container>
  );
};

export default AllContests;
