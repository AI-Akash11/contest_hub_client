import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import Swal from "sweetalert2";
import { FiCheckCircle, FiXCircle, FiTrash2, FiEye } from "react-icons/fi";
import { Link } from "react-router";
import { formatDeadline } from "../../../utils";
import { FaCalendar, FaUser, FaUsers } from "react-icons/fa";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: contests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const res = await axiosSecure("/admin/contests");
      return res.data;
    },
  });

  // Approve contest
  const { mutate: approveContest } = useMutation({
    mutationFn: async (contestId) => {
      return await axiosSecure.patch(`/admin/contests/approve/${contestId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-contests"]);
      Swal.fire({
        title: "Approved!",
        text: "Contest has been approved successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to approve contest",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // Reject contest
  const { mutate: rejectContest } = useMutation({
    mutationFn: async (contestId) => {
      return await axiosSecure.patch(`/admin/contests/reject/${contestId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-contests"]);
      Swal.fire({
        title: "Rejected!",
        text: "Contest has been rejected",
        icon: "info",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to reject contest",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // Delete contest
  const { mutate: deleteContest } = useMutation({
    mutationFn: async (contestId) => {
      return await axiosSecure.delete(`/admin/contests/${contestId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-contests"]);
      Swal.fire({
        title: "Deleted!",
        text: "Contest has been permanently deleted",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete contest",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // Handle approve
  const handleApprove = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Approve Contest?",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Contest:</strong> ${contestName}</p>
          <p class="text-sm text-gray-600">This contest will become visible to all users and participants can register.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      approveContest(contestId);
    }
  };

  // Handle reject
  const handleReject = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Reject Contest?",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Contest:</strong> ${contestName}</p>
          <p class="text-sm text-gray-600">The creator will be notified that their contest was rejected.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      rejectContest(contestId);
    }
  };

  // Handle delete
  const handleDelete = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Delete Contest?",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Contest:</strong> ${contestName}</p>
          <p class="text-sm text-red-600 font-semibold mb-2">⚠️ Warning: This action cannot be undone!</p>
          <p class="text-sm text-gray-600">All associated data including participants and submissions will be permanently deleted.</p>
        </div>
      `,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete permanently!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      deleteContest(contestId);
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const badges = {
      pending: "badge-primary",
      approved: "badge-accent",
      rejected: "badge-error",
    };
    return badges[status] || "badge-ghost";
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const pendingContests = contests.filter((c) => c.status === "pending");
  const approvedContests = contests.filter((c) => c.status === "approved");
  const rejectedContests = contests.filter((c) => c.status === "rejected");

  return (
    <div className="container mx-auto px-4">
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Manage <span className="gradient-text">Contests</span>
          </h2>
          <p className="text-base-content/70">
            Review, approve, reject or delete contests across the platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-base-200 rounded-xl p-4">
            <p className="text-sm text-base-content/60 mb-1">Total Contests</p>
            <p className="text-2xl font-bold">{contests.length}</p>
          </div>
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <p className="text-sm text-primary/80 mb-1">Pending Review</p>
            <p className="text-2xl font-bold text-primary">
              {pendingContests.length}
            </p>
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
            <p className="text-sm text-accent/80 mb-1">Approved</p>
            <p className="text-2xl font-bold text-accent">
              {approvedContests.length}
            </p>
          </div>
          <div className="bg-error/10 border border-error/30 rounded-xl p-4">
            <p className="text-sm text-error/80 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-error">
              {rejectedContests.length}
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full leading-normal bg-base-100">
            <thead>
              <tr className="bg-base-200">
                <th className="px-5 py-4 border-b border-base-300 text-base-content text-left text-sm uppercase font-semibold">
                  Contest Details
                </th>
                <th className="px-5 py-4 border-b border-base-300 text-base-content text-left text-sm uppercase font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-5 py-10 text-center text-base-content/70"
                  >
                    No contests found
                  </td>
                </tr>
              ) : (
                contests.map((contest) => (
                  <tr
                    key={contest._id}
                    className="hover:bg-base-200/50 transition border-b border-base-300"
                  >
                    {/* contest Details */}
                    <td className="px-5 py-5">
                      <div className="flex items-start gap-4">
                        {/* image */}
                        <div className="shrink-0">
                          <img
                            className="w-24 h-24 rounded-lg object-cover ring-2 ring-base-300"
                            src={contest.image}
                            alt={contest.name}
                          />
                        </div>

                        {/* info */}
                        <div className="flex-1 min-w-0">
                          {/* Title and status */}
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-bold text-base-content line-clamp-1">
                              {contest.name}
                            </h3>
                            <span
                              className={`badge ${getStatusBadge(contest.status)} capitalize shrink-0`}
                            >
                              {contest.status}
                            </span>
                          </div>

                          {/* Type and prize */}
                          <div className="flex items-center gap-3 mb-2">
                            <span className="badge badge-primary badge-sm">
                              {contest.contestType}
                            </span>
                            <span className="text-sm font-semibold text-success">
                              ${contest.prizeMoney} Prize
                            </span>
                            <span className="text-xs text-base-content/60">
                              ${contest.entryFee} Entry
                            </span>
                          </div>

                          {/* Creator and participants */}
                          <div className="flex items-center gap-4 text-xs text-base-content/70 mb-2">
                            <span className="flex gap-1">
                              <FaUser></FaUser> By:{" "}
                              <strong>{contest.creator?.name}</strong>
                            </span>
                            <span className="flex gap-1">
                              <FaUsers></FaUsers>{" "}
                              <strong>{contest.participantCount}</strong>{" "}
                              participants
                            </span>
                          </div>

                          {/* Deadline */}
                          <div className="text-xs text-base-content/60 flex gap-1">
                            <FaCalendar></FaCalendar> Deadline:{" "}
                            {formatDeadline(contest.deadline)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-5">
                      <div className="flex flex-col gap-2">
                        {/* View Details */}
                        <Link
                          to={`/contest/${contest._id}`}
                          className="btn btn-sm btn-outline gap-2"
                        >
                          <FiEye className="w-4 h-4" />
                          View Details
                        </Link>

                        {contest.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleApprove(contest._id, contest.name)
                              }
                              className="btn btn-sm bg-accent text-base-content/80 hover:bg-accent/80 gap-2"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleReject(contest._id, contest.name)
                              }
                              className="btn btn-sm bg-primary text-base-content/80 hover:bg-primary/80 gap-2"
                            >
                              <FiXCircle className="w-4 h-4" />
                              Reject
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(contest._id, contest.name)
                              }
                              className="btn btn-sm bg-error text-base-content/80 hover:bg-error/80 gap-2"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </>
                        )}

                        {contest.status === "approved" && (
                          <div className="text-xs text-accent flex items-center gap-1">
                            <FiCheckCircle className="w-3 h-3" />
                            Contest is live
                          </div>
                        )}

                        {contest.status === "rejected" && (
                          <>
                            <button
                              onClick={() =>
                                handleDelete(contest._id, contest.name)
                              }
                              className="btn btn-sm bg-error text-error-content hover:bg-error/80 gap-2"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              Delete
                            </button>

                            <div className="text-xs text-error flex items-center gap-1">
                              <FiXCircle className="w-3 h-3" />
                              Contest is rejected
                            </div>
                          </>
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

export default ManageContests;
