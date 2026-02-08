import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiAward,
  FiTrendingUp,
  FiDollarSign,
  FiEdit2,
  FiLock,
  FiCalendar,
} from "react-icons/fi";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/user`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  // Calculate win percentage
  const winPercentage =
    userInfo.contestsParticipated > 0
      ? ((userInfo.contestsWon / userInfo.contestsParticipated) * 100).toFixed(
          1,
        )
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          My <span className="gradient-text">Profile</span>
        </h2>
        <p className="text-base-content/70">
          Manage your account and view your contest statistics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-base-200 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-primary via-accent to-secondary"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75"></div>
                <img
                  alt="profile"
                  src={userInfo?.image}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-base-200 shadow-xl"
                />
                {/* Role Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="badge badge-primary capitalize font-semibold px-4 py-3">
                    {role}
                  </span>
                </div>
              </div>

              {/* Name & ID */}
              <div className="flex-1 text-center sm:text-left mt-8 sm:mt-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  {userInfo?.name}
                </h1>
                <p className="text-sm text-base-content/60 font-mono">
                  ID: {user?.uid?.slice(0, 20)}...
                </p>
              </div>
            </div>

            {/* User Info Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-base-300 rounded-xl">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiMail className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-base-content/60 mb-1">Email</p>
                  <p className="font-semibold truncate">{userInfo?.email}</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-4 p-4 bg-base-300 rounded-xl">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiCalendar className="w-6 h-6 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-base-content/60 mb-1">
                    Member Since
                  </p>
                  <p className="font-semibold">
                    {new Date(userInfo?.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 btn btn-primary gap-2">
                <FiEdit2 className="w-4 h-4" />
                Update Profile
              </button>
              <button className="flex-1 btn btn-outline gap-2">
                <FiLock className="w-4 h-4" />
                Change Password
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Contest Stats Card */}
          <div className="bg-base-200 rounded-2xl p-6 shadow-xl">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FiAward className="w-5 h-5 text-primary" />
              Contest Statistics
            </h3>

            <div className="space-y-4">
              {/* Participated */}
              <div className="flex items-center justify-between p-3 bg-base-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-base-content/70">
                    Participated
                  </span>
                </div>
                <span className="text-2xl font-bold">
                  {userInfo.contestsParticipated || 0}
                </span>
              </div>

              {/* Won */}
              <div className="flex items-center justify-between p-3 bg-base-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                    <FiAward className="w-5 h-5 text-success" />
                  </div>
                  <span className="text-sm text-base-content/70">Won</span>
                </div>
                <span className="text-2xl font-bold text-success">
                  {userInfo.contestsWon || 0}
                </span>
              </div>

              {/* Win Rate */}
              <div className="flex items-center justify-between p-3 bg-base-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm text-base-content/70">Win Rate</span>
                </div>
                <span className="text-2xl font-bold text-accent">
                  {winPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Financial Stats Card */}
          <div className="bg-linear-to-br from-success/10 to-success/5 border border-success/30 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-success">
              <FiDollarSign className="w-5 h-5" />
              Financial Overview
            </h3>

            <div className="space-y-3">
              {/* Total Spent */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-base-content/70">
                  Total Spent
                </span>
                <span className="font-bold text-lg">
                  ${userInfo.totalSpent || 0}
                </span>
              </div>

              {/* Total Winnings */}
              <div className="flex justify-between items-center pt-3 border-t border-success/20">
                <span className="text-sm text-base-content/70">
                  Total Winnings
                </span>
                <span className="font-bold text-2xl text-success">
                  ${userInfo.totalWinnings || 0}
                </span>
              </div>

              {/* Net Profit/Loss */}
              <div className="flex justify-between items-center pt-3 border-t border-success/20">
                <span className="text-sm text-base-content/70">Net P/L</span>
                <span
                  className={`font-bold text-lg ${
                    (userInfo.totalWinnings || 0) -
                      (userInfo.totalSpent || 0) >=
                    0
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {(userInfo.totalWinnings || 0) - (userInfo.totalSpent || 0) >=
                  0
                    ? "+"
                    : ""}
                  $
                  {(
                    (userInfo.totalWinnings || 0) - (userInfo.totalSpent || 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Achievement Badge (Optional) */}
          {userInfo.contestsWon >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-linear-to-br from-yellow-500/20 to-yellow-600/10 border-2 border-yellow-500/30 rounded-2xl p-6 text-center"
            >
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="font-bold text-yellow-600 mb-1">
                Champion Status
              </h3>
              <p className="text-xs text-base-content/60">
                You've won {userInfo.contestsWon}+ contests!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
