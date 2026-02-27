import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ContestCard from "../../components/Shared/Card/ContestCard";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import NotFound from "../../components/Shared/NotFound/NotFound";
import { useSearchParams } from "react-router";

const AllContests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const hasReadUrlParams = useRef(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!hasReadUrlParams.current) {
      const urlSearch = searchParams.get("search");
      if (urlSearch) {
        setSearchQuery(urlSearch);
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        setSearchParams(newParams, { replace: true });
      }
      hasReadUrlParams.current = true;
    }
  }, [searchParams, setSearchParams]);

  const {
    data: allContests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-contests`,
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
        (contest) => contest.contestType === selectedCategory,
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (contest) =>
          contest.name.toLowerCase().includes(query) ||
          contest.contestType.toLowerCase().includes(query) ||
          contest.creator?.name.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [allContests, selectedCategory, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContests = filteredContests.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Slider scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
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
        <section className="pt-10 md:pt-15">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore All <span className="gradient-text">Contests</span>
            </h1>
            <p className="text-sm  md:text-base text-base-content/70 max-w-2xl mx-auto">
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
            className="max-w-xl mx-auto mb-6"
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

          {/* Category Slider with Arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 relative"
          >
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-base-100 hover:bg-primary flex items-center justify-center transition"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-base-100 hover:bg-primary flex items-center justify-center transition"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide px-8"
            >
              <div className="flex gap-3 py-4 min-w-max">
                {uniqueCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap flex-shrink-0 ${
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
                          allContests.filter((c) => c.contestType === category)
                            .length
                        }
                        )
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
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
                  {startIndex + 1}-{Math.min(endIndex, filteredContests.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold">{filteredContests.length}</span>{" "}
                contests
                {searchQuery && (
                  <span className="ml-2 text-sm">
                    for "<span className="font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-4"
            >
              {currentContests.map((contest, index) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-outline gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      // Show first page, last page, current page, and pages around current
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
                              currentPage === page
                                ? "btn-primary"
                                : "btn-outline"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="flex items-center px-2">
                            ...
                          </span>
                        );
                      }
                      return null;
                    },
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-outline gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </Container>
  );
};

export default AllContests;
