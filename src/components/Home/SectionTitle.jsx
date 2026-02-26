import React from "react";

const SectionTitle = ({children}) => {
  return (
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      {children}
    </h2>
  );
};

export default SectionTitle;
