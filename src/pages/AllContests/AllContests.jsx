import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ContestCard from "../../components/Shared/Card/ContestCard";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorPage from "../ErrorPage";
import NotFound from "../../components/Shared/NotFound/NotFound";
import { useSearchParams } from "react-router";

const AllContests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const hasReadUrlParams = useRef(false);
  const scrollRef = useRef(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!hasReadUrlParams.current) {
      const urlSearch = searchParams.get("search");
      if (urlSearch) {
        setSearchQuery(urlSearch);
        setDebouncedSearch(urlSearch);
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        setSearchParams(newParams, { replace: true });
      }
      hasReadUrlParams.current = true;
    }
  }, [searchParams, setSearchParams]);

  // all-contest data query
  const {
    data: contestData = { contests: [], total: 0 },
    isLoading: isContestsLoading,
    isError,
  } = useQuery({
    queryKey: ["allContests", currentPage, debouncedSearch, selectedCategory],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-contests?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}&category=${selectedCategory === "All" ? "" : selectedCategory}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  // query for categories
  const { data: categoryData = { categories: ["All"], counts: {} } } = useQuery(
    {
      queryKey: ["contestCategories", debouncedSearch],
      queryFn: async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/contest-categories?search=${debouncedSearch}`,
        );
        return res.data;
      },
    },
  );

  const uniqueCategories = categoryData.categories;

  // Pagination calculations
  const totalPages = Math.ceil(contestData.total / itemsPerPage);

  const currentContests = contestData.contests;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
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

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <div className="min-h-screen bg-background">
        {/* Header - Static, never reloads */}
        <section className="pt-10 md:pt-15">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore All <span className="gradient-text">Contests</span>
            </h1>
            <p className="text-sm md:text-base text-base-content/70 max-w-2xl mx-auto">
              Discover a wide range of creative competitions across various
              categories. Find the perfect contest that matches your skills and
              interests.
            </p>
          </motion.div>

          {/* Search Bar - Static, never loses focus */}
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

          {/* Category Slider - Static */}
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
                        ({categoryData.counts[category] || 0})
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

        {/* Contests Grid - Only this section reloads */}
        <AnimatePresence mode="wait">
          {isContestsLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </motion.div>
          ) : currentContests.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
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
            </motion.div>
          ) : (
            <motion.section
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pb-16"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-base-content/70">
                  Showing{" "}
                  <span className="text-base-content font-semibold">
                    {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(currentPage * itemsPerPage, contestData.total)}
                  </span>{" "}
                  of <span className="font-semibold">{contestData.total}</span>{" "}
                  contests
                  {searchQuery && (
                    <span className="ml-2 text-sm">
                      for "<span className="font-semibold">{searchQuery}</span>"
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-4">
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
              </div>

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
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default AllContests;