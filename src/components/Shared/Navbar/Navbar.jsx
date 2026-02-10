import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useTheme from "../../../hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";
import useRole from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure("/user");
      return res.data;
    },
  });

  const handleClickOutside = () => {
    if (isOpen) setIsOpen(false);
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
    <div className="fixed w-full bg-base-300 z-10 shadow-sm border-b border-white/10 rounded-b-2xl">
      <div className="py-1">
        <Container>
          <div className="navbar">
            <div className="navbar-start">
              {/* Links Dropdown */}
              <div className="dropdown text-accent">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-outline rounded-full border-base-content/30 mr-2 text-base-content md:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 text-base-content font-bold rounded-box z-2 mt-3 w-48 p-2 shadow"
                >
                  {links}
                </ul>
              </div>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-amber-400 flex items-center justify-center">
                  <span className="text-xl font-black text-base-100">C</span>
                </div>
                <span className="text-xl font-bold gradient-text hidden md:block">
                  ContestHub
                </span>
              </Link>
            </div>

            <div className="navbar-center text-base-content hidden md:flex">
              <ul className="font-bold px-1 menu menu-horizontal">{links}</ul>
            </div>

            <div className="navbar-end">
              {/* Theme Toggle */}
              <label className="flex items-center gap-2 cursor-pointer mr-3">
                <FiSun
                  className={`text-xl transition-colors duration-300 ${
                    theme === "light"
                      ? "text-yellow-400"
                      : "text-base-content/50"
                  }`}
                />

                <input
                  type="checkbox"
                  className="toggle toggle-sm bg-base-200 border-base-content"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  aria-label="Toggle theme"
                />

                <FiMoon
                  className={`text-xl transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-indigo-400"
                      : "text-base-content/50"
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
                {isOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={handleClickOutside}
                    ></div>

                    {/* Dropdown */}
                    <div className="absolute rounded-xl shadow-md w-64 bg-base-100 overflow-hidden right-0 top-12 text-sm z-20 border border-base-content/10">
                      <div className="flex flex-col cursor-pointer">
                        {user && !loading ? (
                          <>
                            {/* User Info */}
                            <div className="px-4 py-3 bg-base-200 border-b border-base-content/10">
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

                            {/* Email */}
                            <div className="px-4 py-2 border-b border-base-content/10">
                              <p className="text-xs text-base-content/60 truncate">
                                {user?.email}
                              </p>
                            </div>

                            {/* Dashboard Link */}
                            <Link
                              to="/dashboard"
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-3 hover:bg-base-200 transition font-semibold flex items-center gap-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                              </svg>
                              Dashboard
                            </Link>

                            {/* Logout Button */}
                            <div
                              onClick={() => {
                                logOut();
                                setIsOpen(false);
                              }}
                              className="px-4 py-3 hover:bg-base-200 transition font-semibold text-error flex items-center gap-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                              Logout
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Login/Signup */}
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
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;