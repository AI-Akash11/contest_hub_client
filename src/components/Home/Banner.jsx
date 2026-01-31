import { motion } from "framer-motion";
import { FiSearch, FiTrendingUp, FiAward, FiUsers } from "react-icons/fi";
import CountUp from "react-countup";
import Container from "../Shared/Container";

const stats = [
  {
    icon: FiUsers,
    value: 50000,
    label: "Active Creators",
    suffix: "+",
  },
  {
    icon: FiAward,
    value: 1200,
    label: "Contests Completed",
    suffix: "+",
  },
  {
    icon: FiTrendingUp,
    value: 2.5,
    label: "Million in Prizes",
    prefix: "$",
    suffix: "M+",
  },
];

const Banner = () => {
  return (
    <section className="overflow-hidden bg-linear-to-br from-base-200 via-accent/5 to-primary/10" >

      <Container>
        <div className="min-h-[65vh] flex items-center py-5 md:py-10 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-8"
            >
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
                #1 Contest Platform for Creators
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Unleash Your{" "}
              <span className="gradient-text">Creative</span>
              <br />
              Potential & Win Big
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto"
            >
              Join thousands of talented creators in exciting competitions.
              Showcase your skills, compete globally, and win amazing cash prizes.
            </motion.p>

            {/* Search Bar (UI only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto mb-12"
            >
              <div className="relative">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/60" />
                <button className="absolute right-2 top-2 px-4 py-2 bg-primary text-base-100 font-semibold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition duration-200">Search</button>
                <input
                  type="text"
                  placeholder="Search contests by type..."
                  className="w-full pl-14 pr-4 py-4 bg-base-300 rounded-2xl border border-base-content/10 focus:outline-primary"
                />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-base-300 rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold">
                      {stat.prefix}
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-base-content/70">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
