import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiEdit3,
  FiDollarSign,
  FiTrendingUp,
  FiAward,
  FiUsers,
} from "react-icons/fi";
import Container from "../../Shared/Container";
import SectionBadge from "../SectionBadge";
import SectionTitle from "../SectionTitle";
import SectionSubTitle from "../SectionSubTitle";

const FeaturesSection = () => {
  const features = [
    {
      icon: FiEdit3,
      title: "Create Contests",
      description:
        "Easily set up creative contests with customizable rules, deadlines, and prize pools.",
    },
    {
      icon: FiUsers,
      title: "Global Community",
      description:
        "Connect with talented creators from around the world and showcase your skills.",
    },
    {
      icon: FiDollarSign,
      title: "Win Big Prizes",
      description:
        "Compete for substantial cash prizes and recognition in your creative field.",
    },
    {
      icon: FiCheckCircle,
      title: "Fair Judging",
      description:
        "Transparent evaluation process with clear criteria and honest feedback.",
    },
    {
      icon: FiTrendingUp,
      title: "Track Progress",
      description:
        "Monitor your contest journey with detailed analytics and performance metrics.",
    },
    {
      icon: FiAward,
      title: "Earn Recognition",
      description:
        "Build your portfolio and get recognized by top brands and agencies.",
    },
  ];

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
          <SectionBadge color={"secondary"}>Why Choose Us</SectionBadge>
          <SectionTitle>
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </SectionTitle>
          <SectionSubTitle>
            ContestHub provides all the tools and features you need to
            participate in, create, and win exciting creative competitions.
          </SectionSubTitle>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-base-300 rounded-xl hover:scale-105 shadow-xl shadow-base-content/5 hover:shadow-primary/20 hover:shadow-xl transition duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-base-content/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
    </Container>
      </section>
  );
};

export default FeaturesSection;
