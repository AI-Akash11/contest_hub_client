import { motion } from "framer-motion";
import {
  FiPenTool,
  FiCamera,
  FiCode,
  FiEdit,
  FiTrendingUp,
  FiMusic,
} from "react-icons/fi";
import Container from "../../Shared/Container";
import SectionBadge from "../SectionBadge";
import SectionTitle from "../SectionTitle";
import SectionSubTitle from "../SectionSubTitle";

const CategoriesSection = () => {
  const categories = [
    {
      icon: FiPenTool,
      title: "Design & UI/UX",
      description:
        "Participate in logo, branding, graphic, and UI/UX design contests.",
    },
    {
      icon: FiEdit,
      title: "Writing & Content",
      description:
        "Showcase your creativity through writing, copywriting, and blogging contests.",
    },
    {
      icon: FiCamera,
      title: "Photography & Video",
      description:
        "Compete in photography, videography, animation, and short film challenges.",
    },
    {
      icon: FiCode,
      title: "Tech & Development",
      description:
        "Join coding, web, app development, and innovation-based contests.",
    },
    {
      icon: FiTrendingUp,
      title: "Marketing & Branding",
      description:
        "Prove your skills in digital marketing, SEO, branding, and growth contests.",
    },
    {
      icon: FiMusic,
      title: "Media & Performance",
      description:
        "Explore contests in music, voice acting, podcasts, and performance arts.",
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
          <SectionBadge color="primary">Categories</SectionBadge>

          <SectionTitle>
            Explore Contest <span className="gradient-text">Categories</span>
          </SectionTitle>

          <SectionSubTitle>
            Discover a wide range of contest categories tailored for creatives,
            developers, marketers, and innovators worldwide.
          </SectionSubTitle>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-base-300 rounded-xl hover:scale-105 shadow-xl shadow-base-content/5 hover:shadow-primary/20 hover:shadow-xl transition duration-500 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <category.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="font-bold text-lg mb-2">
                {category.title}
              </h3>

              <p className="text-base-content/70">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;