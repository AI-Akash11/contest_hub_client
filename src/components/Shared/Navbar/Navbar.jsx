import Container from "../Container";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useTheme from "../../../hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";
import useRole from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    pointerEvents: "none",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: "auto",
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.12,
      ease: "easeIn",
    },
  },
};

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo, isLoading: isUserInfoLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure("/user");
      return res.data;
    },
  });

  const handleClickOutside = () => {
    if (isOpen) setIsOpen(false);
    if (isHamburgerOpen) setIsHamburgerOpen(false);
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-contests"}>All Contests</NavLink>
      </li>
      <li>
        <NavLink to={"/leaderboard"}>Leaderboard</NavLink>
      </li>
      <li>
        <NavLink to={"/blog"}>Blog</NavLink>
      </li>
      <li>
        <NavLink to={"/contact-us"}>Contact</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About</NavLink>
      </li>
    </>
  );

  const getDisplayImage = () => {
    if (userInfo?.image) return userInfo.image;
    if (user?.photoURL) return user.photoURL;
    return avatarImg;
  };

  const getDisplayName = () => {
    if (userInfo?.name) return userInfo.name;
    if (user?.displayName) return user.displayName;
    return "User";
  };

  const getDisplayRole = () => {
    if (role) return role.charAt(0).toUpperCase() + role.slice(1);
    return "User";
  };

  return (
    <div className="fixed h-15 w-full bg-base-300 z-10 shadow-sm border-b border-white/10">
      <Container>
        <div className="navbar py-0">
          <div className="navbar-start">
            {/* Links Dropdown */}
            <div>
              <button
                onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
                role="button"
                className="btn btn-outline rounded-2xl border-base-content/30 mr-2 lg:hidden flex flex-col justify-center items-center gap-1.5 px-3.5 py-2"
              >
                <motion.span
                  className="block w-5 h-0.5 bg-base-content"
                  animate={
                    isHamburgerOpen
                      ? { rotate: 45, y: 10 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.span
                  className="block w-5 h-0.5 bg-base-content"
                  animate={isHamburgerOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="block w-5 h-0.5 bg-base-content"
                  animate={
                    isHamburgerOpen
                      ? { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
              </button>

              <AnimatePresence>
                {isHamburgerOpen && (
                  <>
                    <motion.div
                      className="fixed inset-0 z-10"
                      onClick={handleClickOutside}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    ></motion.div>

                    <motion.ul
                      className="menu menu-sm dropdown-content bg-base-100 text-base-content font-bold rounded-box z-20 mt-3 w-48 p-2 shadow absolute"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {links}
                    </motion.ul>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Logo */}
            <Link to="/" className="md:flex items-center gap-2 hidden">
              <div className="w-8 lg:w-10 h-8 lg:h-10 rounded-xl bg-linear-to-br from-primary to-amber-400 flex items-center justify-center">
                <span className="md:text-xl font-black text-base-100">C</span>
              </div>
              <span className="text-lg lg:text-xl font-bold gradient-text">
                ContestHub
              </span>
            </Link>
          </div>

          <div className="navbar-center text-base-content hidden lg:flex">
            <ul className="font-bold px-1 menu menu-horizontal">{links}</ul>
          </div>

          <div className="navbar-end">
            {/* Theme Toggle */}
            <label className="flex items-center gap-2 mr-3">
              <FiSun
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-yellow-400" : "text-base-content/50"
                }`}
              />

              <input
                type="checkbox"
                className="toggle toggle-sm bg-base-200 border-base-content cursor-pointer"
                checked={theme === "dark"}
                onChange={toggleTheme}
                aria-label="Toggle theme"
              />

              <FiMoon
                className={`text-xl transition-colors duration-300 ${
                  theme === "dark" ? "text-indigo-400" : "text-base-content/50"
                }`}
              />
            </label>

            {/* User Dropdown */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-lg shadow-md transition"
                >
                  <div className="relative">
                    {/* image */}
                    <img
                      className="rounded-full w-10 h-10 object-cover ring-2 ring-base-content/20"
                      referrerPolicy="no-referrer"
                      src={user ? getDisplayImage() : avatarImg}
                      alt="profile"
                    />
                    {/* green dot */}
                    {user && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-300"></span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isOpen && (
                  <>
                    <motion.div
                      className="fixed inset-0 z-10"
                      onClick={handleClickOutside}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    ></motion.div>

                    <motion.div
                      className="absolute rounded-xl shadow-md w-64 bg-base-100 overflow-hidden right-0 top-12 text-sm z-20 border border-base-content/10"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="flex flex-col cursor-pointer">
                        {user && !loading ? (
                          <>
                            <div className="px-4 py-3 bg-base-100 border-b border-base-content/10">
                              <div className="flex items-center gap-3">
                                <img
                                  src={getDisplayImage()}
                                  alt="User"
                                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                                />
                                <div className="flex-1 min-w-0">
                                  {isUserInfoLoading || isRoleLoading ? (
                                    <>
                                      <div className="h-4 bg-base-300 rounded w-24 mb-2 animate-pulse"></div>
                                      <div className="h-3 bg-base-300 rounded w-16 animate-pulse"></div>
                                    </>
                                  ) : (
                                    <>
                                      <p className="font-semibold truncate">
                                        {getDisplayName()}
                                      </p>
                                      <span className="badge badge-primary badge-xs">
                                        {getDisplayRole()}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="px-4 py-2 border-b border-base-content/10">
                              <p className="text-xs text-base-content/60 truncate">
                                {user?.email}
                              </p>
                            </div>

                            <Link
                              to="/dashboard"
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-3 hover:bg-base-200 transition font-semibold flex items-center gap-2"
                            >
                              Dashboard
                            </Link>

                            <div
                              onClick={() => {
                                logOut();
                                setIsOpen(false);
                              }}
                              className="px-4 py-3 hover:bg-base-200 transition font-semibold text-error"
                            >
                              Logout
                            </div>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-3 hover:bg-base-200 transition font-semibold"
                            >
                              Login
                            </Link>
                            <Link
                              to="/signup"
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-3 hover:bg-base-200 transition font-semibold"
                            >
                              Sign Up
                            </Link>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
