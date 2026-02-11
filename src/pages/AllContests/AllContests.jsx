import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import ContestCard from "../../components/Shared/Card/ContestCard";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import NotFound from "../../components/Shared/NotFound/NotFound";

const AllContests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDragging, setIsDragging] = useState(false);

  const {
    data: allContests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-contests`
      );
      return res.data;
    },
  });

  const uniqueCategories = useMemo(() => {
    if (!allContests || allContests.length === 0) return ["All"];

    const categories = allContests.map((contest) => contest.contestType);
    const uniqueSet = new Set(categories);
    return ["All", ...Array.from(uniqueSet)].sort();
  }, [allContests]);

  // filter contests
  const filteredContests = useMemo(() => {
    let filtered = allContests;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (contest) => contest.contestType === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (contest) =>
          contest.name.toLowerCase().includes(query) ||
          contest.contestType.toLowerCase().includes(query) ||
          contest.creator?.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allContests, selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
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
                placeholder="Search contests by name, category, creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-style pl-12 pr-12 bg-base-300 w-full h-full py-4 rounded-lg border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Draggable Category Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 relative"
          >

            {/* Scrollable Container */}
            <div className="overflow-hidden px-4">
              <motion.div
                drag="x"
                dragConstraints={{ left: -1000, right: 0 }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
                className="flex gap-3 py-4 cursor-grab active:cursor-grabbing"
              >
                {uniqueCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={(e) => {
                      if (!isDragging) {
                        setSelectedCategory(category);
                      }
                    }}
                    whileHover={{ scale: isDragging ? 1 : 1.05 }}
                    whileTap={{ scale: isDragging ? 1 : 0.95 }}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap flex-shrink-0 select-none ${
                      selectedCategory === category
                        ? "bg-primary text-base-100 shadow-lg"
                        : "bg-base-300 text-base-content/90 hover:bg-base-content/10"
                    }`}
                  >
                    {category}
                    {category !== "All" && (
                      <span className="ml-2 text-xs opacity-70">
                        (
                        {
                          allContests.filter(
                            (c) => c.contestType === category
                          ).length
                        }
                        )
                      </span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* clear filters */}
          {(searchQuery || selectedCategory !== "All") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline inline-flex items-center gap-2"
              >
                <FiX className="w-4 h-4" />
                Clear all filters
              </button>
            </motion.div>
          )}
        </section>

        {/* Contests Grid */}
        {filteredContests.length === 0 ? (
          <div className="text-center py-16">
            <NotFound />
            <p className="mt-4 text-base-content/70">
              {searchQuery || selectedCategory !== "All"
                ? "No contests match your search criteria. Try adjusting your filters."
                : "No contests available at the moment."}
            </p>
            {(searchQuery || selectedCategory !== "All") && (
              <button onClick={clearFilters} className="btn btn-primary mt-6">
                View All Contests
              </button>
            )}
          </div>
        ) : (
          <section className="pb-16">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base-content/70">
                Showing{" "}
                <span className="text-base-content font-semibold">
                  {filteredContests.length}
                </span>{" "}
                {selectedCategory !== "All" && (
                  <span>
                    of{" "}
                    <span className="font-semibold">{allContests.length}</span>
                  </span>
                )}{" "}
                contests
                {searchQuery && (
                  <span className="ml-2 text-sm">
                    for "
                    <span className="font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredContests.map((contest, index) => (
                <motion.div
                  key={contest._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ContestCard contest={contest} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </Container>
  );
};

export default AllContests;