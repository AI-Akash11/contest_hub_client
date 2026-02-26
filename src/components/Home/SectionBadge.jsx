import React from "react";
import { motion } from "framer-motion";


const SectionBadge = ({children, color}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center px-4 py-2 bg-${color}/20 rounded-full mb-6`}
    >
      <span className={`text-xs ms:text-sm font-medium text-${color}`}>
        {children}
      </span>
    </motion.div>
  );
};

export default SectionBadge;
