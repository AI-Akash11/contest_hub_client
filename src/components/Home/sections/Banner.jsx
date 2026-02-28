import { motion } from "framer-motion";
import { FiSearch, FiTrendingUp, FiAward, FiUsers } from "react-icons/fi";
import CountUp from "react-countup";
import Container from "../../Shared/Container";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BannerStatsSkeleton from "../../skeletons/BannerStatsSkeleton";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const {
    data: statsData = {
      users: 0,
      creators: 0,
      contestsCreated: 0,
      prizesDistributed: 0,
    },
    isLoading: isStatsLoading,
  } = useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
      return res.data;
    },
  });

  const stats = [
    {
      icon: FiUsers,
      value: statsData.creators,
      label: "Active Creators",
      suffix: "+",
    },
    {
      icon: FiAward,
      value: statsData.contestsCreated,
      label: "Contests Created",
      suffix: "+",
    },
    {
      icon: FiTrendingUp,
      value: statsData.prizesDistributed,
      label: "in Prizes",
      prefix: "$",
      suffix: "+",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(
        `/all-contests?search=${encodeURIComponent(searchQuery.trim())}`,
      );
    } else {
      navigate("/all-contests");
    }
  };
  return (
    <section className="overflow-hidden bg-linear-to-br from-base-200 via-accent/10 to-primary/20 mb-15 lg:mb-20">
      <Container>
        <div className="min-h-[50vh] flex items-center py-10 lg:py-20">
          <div className="mx-auto text-center">
            {/* Badge */}
            {/* <SectionBadge color="primary">
              #1 Contest Platform for Creators
            </SectionBadge> */}

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-6 leading-tight"
            >
              Unleash Your <span className="gradient-text">Creative</span>
              <br />
              Potential & Win Big
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="md:text-lg text-base-content/60 mb-10 max-w-2xl mx-auto"
            >
              Join thousands of talented creators in exciting competitions.
              Showcase your skills, compete globally, and win amazing cash
              prizes.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto mb-12"
            >
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/60" />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 px-4 py-2 bg-primary text-base-100 font-semibold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition duration-200 cursor-pointer"
                  >
                    Search
                  </button>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search contests by type..."
                    className="w-full pl-14 pr-24 py-4 bg-base-300 rounded-2xl border border-base-content/10 focus:outline-primary"
                  />
                </div>
              </form>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {isStatsLoading ? (
                <BannerStatsSkeleton />
              ) : (
                <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-3xl mx-auto">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-center gap-1 md:gap-4 p-4 bg-base-300 rounded-2xl"
                    >
                      <div className="w-15 md:w-12 h-15 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-xl md:text-2xl font-bold">
                          {stat.prefix}
                          <CountUp
                            end={stat.value}
                            duration={2.5}
                            decimals={stat.value % 1 !== 0 ? 1 : 0}
                          />
                          {stat.suffix}
                        </div>
                        <div className="text-[10px] md:text-sm text-base-content/70">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
