import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Get all users
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure("/all-users");
      return res.data;
    },
  });

  // Update user role mutation
  const { mutate: updateRole } = useMutation({
    mutationFn: async ({ email, newRole }) => {
      return await axiosSecure.patch(`/user/role/${email}`, { role: newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      Swal.fire({
        title: "Success!",
        text: "User role updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpenDropdown(null);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update role",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // Handle role change
  const handleRoleChange = async (email, currentRole, newRole) => {
    if (currentRole === newRole) {
      setOpenDropdown(null);
      return;
    }

    const result = await Swal.fire({
      title: "Change User Role?",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Email:</strong> ${email}</p>
          <p class="mb-2"><strong>Current Role:</strong> <span class="badge badge-primary">${currentRole}</span></p>
          <p class="mb-2"><strong>New Role:</strong> <span class="badge badge-accent">${newRole}</span></p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      updateRole({ email, newRole });
    } else {
      setOpenDropdown(null);
    }
  };

  // Filter current user
  const filteredUsers = users.filter((u) => u.email !== user?.email);

  //  role badge color
  const getRoleBadge = (role) => {
    const badges = {
      admin: "badge-error",
      creator: "badge-accent",
      user: "badge-primary",
    };
    return badges[role];
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Manage <span className="gradient-text">Users</span>
          </h2>
          <p className="text-base-content/70">
            View and manage user roles across the platform
          </p>
        </div>

        {/* Table Container */}
        <div className="rounded-xl shadow-lg shadow-base">
          <table className="min-w-full leading-normal bg-base-100">
            <thead>
              <tr className="bg-base-200">
                <th className="px-5 py-4 border-b border-base-300 text-base-content text-left text-sm uppercase font-semibold">
                  User
                </th>
                <th className="px-5 py-4 border-b border-base-300 text-base-content text-center text-sm uppercase font-semibold">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-5 py-10 text-center text-base-content/70"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((userData) => (
                  <tr
                    key={userData._id}
                    className="hover:bg-base-200/50 transition border-b border-base-300"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-4">
                        <div className="shrink-0">
                          <img
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-base-300"
                            src={userData.image}
                            alt={userData.name}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-base-content">
                            {userData.name}
                          </p>
                          <p className="text-xs text-base-content/60 mt-1">
                            Joined{" "}
                            {new Date(userData.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <p className="text-[10px] md:text-sm text-base-content/70">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* role */}
                    <td className="px-5 py-5 flex justify-end lg:justify-center">
                      <div className="relative inline-block">
                        {/* current role */}
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === userData._id
                                ? null
                                : userData._id,
                            )
                          }
                          className={`badge ${getRoleBadge(userData.role)} capitalize font-semibold px-4 py-3 cursor-pointer hover:opacity-80 transition flex items-center gap-2`}
                        >
                          {userData.role}
                          <FiChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openDropdown === userData._id ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* dropdown */}
                        {openDropdown === userData._id && (
                          <div className="absolute z-50 mt-2 w-40 bg-base-100 border border-base-300 rounded-lg shadow-xl">
                            <div className="py-1">
                              {["user", "creator", "admin"].map((role) => (
                                <button
                                  key={role}
                                  onClick={() =>
                                    handleRoleChange(
                                      userData.email,
                                      userData.role,
                                      role,
                                    )
                                  }
                                  className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-base-200 transition ${
                                    userData.role === role
                                      ? "bg-base-200 font-semibold"
                                      : ""
                                  }`}
                                >
                                  {role}
                                  {userData.role === role && (
                                    <span className="ml-2 text-primary">✓</span>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
