// components/Navbar.tsx

import React from "react";
import EmailIcon from "@mui/icons-material/Email";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white w-full shadow-md fixed top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        {/* Email Icon and Title aligned to the left */}
        <EmailIcon style={{ fontSize: 24, marginRight: "8px", color: "black" }} />
        <h1 className="text-2xl font-semibold text-black">MEClient</h1>
      </div>
    </nav>
  );
};

export default Navbar;
