import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useTheme from "../../../hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  return (
    <div className="fixed w-full bg-base-300 z-10 shadow-sm border-b border-white/10 rounded-b-2xl">
      <div className="py-1 ">
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
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />{" "}
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

              {/* Dropdown Menu */}
              <div className="relative">
                <div className="flex flex-row items-center gap-3">
                  {/* Dropdown btn */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                  >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                      {/* Avatar */}
                      <img
                        className="rounded-full"
                        referrerPolicy="no-referrer"
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt="profile"
                        height="30"
                        width="30"
                      />
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-base-100 overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                      <Link
                        to="/"
                        className="block md:hidden px-4 py-3 hover:bg-base-100 transition font-semibold"
                      >
                        Home
                      </Link>

                      {user ? (
                        <>
                          <Link
                            to="/dashboard"
                            className="px-4 py-3 hover:bg-base-300 transition font-semibold"
                          >
                            Dashboard
                          </Link>
                          <div
                            onClick={logOut}
                            className="px-4 py-3 hover:bg-base-300 transition font-semibold cursor-pointer"
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
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
