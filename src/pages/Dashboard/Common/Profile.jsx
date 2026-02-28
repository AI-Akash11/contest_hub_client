import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiMail, FiCalendar, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, resetPassword } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const handleResetPassword = async () => {
    if (!user?.email) {
      Swal.fire("Error", "No email found", "error");
      return;
    }

    try {
      await resetPassword(user.email);
      Swal.fire({
        title: "Reset Email Sent!",
        text: `Check your inbox (${user.email})`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="container mx-auto md:px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-bold mb-2">
          My <span className="gradient-text">Profile</span>
        </h2>
        <p className="text-base-content/70">
          Manage your account and view your contest statistics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3 bg-base-200 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary via-accent to-secondary"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar & Name */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75"></div>
                <img
                  src={userInfo.image}
                  alt="profile"
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-base-200 shadow-xl"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="badge badge-primary capitalize font-semibold px-4 py-3">
                    {role}
                  </span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  {userInfo.name}
                </h1>
                <p className="text-sm text-base-content/60 font-mono">
                  ID: {user?.uid?.slice(0, 20)}...
                </p>
              </div>
            </div>

            {/* Info Row: Email + Member Since */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-300 p-4 rounded-xl">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <FiMail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-base-content/60 mb-1">Email</p>
                    <p className="font-semibold truncate">{userInfo.email}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <FiCalendar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 mb-1">
                      Member Since
                    </p>
                    <p className="font-semibold">
                      {new Date(userInfo.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 bg-base-300 p-4 rounded-xl">
              <p className="text-xs text-base-content/60 mb-1">Bio</p>
              <p className="text-base-content/80">
                {userInfo.bio || "No bio added yet..."}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4 flex-col md:flex-row">
              <Link
                to="/dashboard/update-profile"
                className="w-full md:w-auto btn btn-primary gap-2"
              >
                <FiEdit2 className="w-4 h-4" />
                Update Profile
              </Link>
              <button
                onClick={handleResetPassword}
                className="btn btn-outline btn-warning"
              >
                Reset Password
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
