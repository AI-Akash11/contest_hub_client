import React from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiUsers,
  FiGlobe,
  FiHeart,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import Container from "../../components/Shared/Container";
import CountUp from 'react-countup';

const About = () => {
  const stats = [
    { label: "Active Users", value: 50000, icon: <FiUsers /> },
    { label: "Contests Hosted", value: 1200, icon: <FiAward /> },
    {
      label: "Prize Distributed",
      value: 2500000,
      prefix: "$",
      icon: <FiTrendingUp />,
    },
    { label: "Countries", value: 85, icon: <FiGlobe /> },
  ];

  const values = [
    {
      icon: <FiTarget className="text-3xl text-primary" />,
      title: "Innovation",
      description:
        "We constantly push boundaries to bring you the most exciting and creative contests.",
    },
    {
      icon: <FiUsers className="text-3xl text-secondary" />,
      title: "Community",
      description:
        "Building a global community of creators, designers, and innovators who inspire each other.",
    },
    {
      icon: <FiHeart className="text-3xl text-pink-500" />,
      title: "Fairness",
      description:
        "Transparent judging and equal opportunities for all participants, regardless of background.",
    },
  ];

  return (
    <Container>
      <section className="relative py-12 overflow-hidden ">
        <div className="absolute inset-0 bg-base-200 " />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="gradient-text">ContestHub</span>
            </h1>
            <p className="text-xl text-base-content/70">
              We're on a mission to democratize creative competitions and give
              talented individuals worldwide the platform they deserve.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-base-300 rounded-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl text-primary mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-base-content mb-1">
                  {stat.prefix}
                  <CountUp
                    end={stat.value}
                    duration={3}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <p className="text-base-content/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Our Values
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-300 border border-border rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-200 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default About;
