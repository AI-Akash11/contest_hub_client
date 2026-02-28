import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import Swal from "sweetalert2";
import { FiCheckCircle, FiXCircle, FiTrash2, FiEye, FiAward } from "react-icons/fi";
import { Link } from "react-router";
import { formatDeadline } from "../../../utils";
import { FaCalendar, FaUser, FaUsers } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch paginated contests
  const {
    data: contestsData = { contests: [], total: 0, currentPage: 1, totalPages: 1 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-contests", currentPage],
    queryFn: async () => {
      const res = await axiosSecure(`/admin/contests?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const contests = contestsData.contests || [];
  const totalPages = contestsData.totalPages || 1;

  // Helper: Compute real display status
  const getContestDisplayStatus = (contest) => {
    const now = new Date();
    const deadline = new Date(contest.deadline);

    if (contest.status !== "approved") {
      return contest.status; // pending / rejected
    }

    if (deadline < now || contest.winner?.status === "declared") {
      return contest.winner?.status === "declared" ? "winner_declared" : "ended";
    }

    return "live";
  };

  // Badge styles
  const getStatusBadge = (displayStatus) => {
    const badges = {
      pending: "badge-primary",
      rejected: "badge-error",
      live: "badge-success animate-pulse",
      ended: "badge-warning",
      winner_declared: "badge-secondary",
    };
    return badges[displayStatus] || "badge-ghost";
  };

  // Mutations
  const { mutate: approveContest } = useMutation({
    mutationFn: async (contestId) => axiosSecure.patch(`/admin/contests/approve/${contestId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-contests"]);
      Swal.fire("Approved!", "Contest approved successfully", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", error.response?.data?.message || "Failed to approve", "error");
    },
  });

  const { mutate: rejectContest } = useMutation({
    mutationFn: async (contestId) => axiosSecure.patch(`/admin/contests/reject/${contestId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-contests"]);
      Swal.fire("Rejected!", "Contest rejected", "info");
    },
    onError: (error) => {
      Swal.fire("Error!", error.response?.data?.message || "Failed to reject", "error");
    },
  });

  const { mutate: deleteContest } = useMutation({
    mutationFn: async (contestId) => axiosSecure.delete(`/admin/contests/${contestId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-contests"]);
      Swal.fire("Deleted!", "Contest deleted permanently", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", error.response?.data?.message || "Failed to delete", "error");
    },
  });

  // Handlers
  const handleApprove = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Approve Contest?",
      html: `<div class="text-left">
        <p class="mb-2"><strong>Contest:</strong> ${contestName}</p>
        <p class="text-sm text-gray-600">This contest will become visible to all users.</p>
      </div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) approveContest(contestId);
  };

  const handleReject = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Reject Contest?",
      html: `<div class="text-left">
        <p class="mb-2"><strong>Contest:</strong> ${contestName}</p>
        <p class="text-sm text-gray-600">The creator will be notified.</p>
      </div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject it",
    });

    if (result.isConfirmed) rejectContest(contestId);
  };

  const handleDelete = async (contestId, contestName) => {
    const result = await Swal.fire({
      title: "Delete Contest?",
      html: `<div class="text-left">
        <p class="mb-2"><strong>Contest:</strong> ${contestName}</p>
        <p class="text-sm text-red-600 font-semibold mb-2">⚠️ This cannot be undone!</p>
        <p class="text-sm text-gray-600">All data will be permanently deleted.</p>
      </div>`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete permanently!",
    });

    if (result.isConfirmed) deleteContest(contestId);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

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

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-base-200 rounded-xl p-4">
            <p className="text-xs md:text-sm text-base-content/60 mb-1">Total Contests</p>
            <p className="text-xl md:text-2xl font-bold">{contestsData.total}</p>
          </div>
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <p className="text-xs md:text-sm text-primary/80 mb-1">Pending Review</p>
            <p className="text-xl md:text-2xl font-bold text-primary">
              {contests.filter((c) => c.status === "pending").length}
            </p>
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
            <p className="text-xs md:text-sm text-accent/80 mb-1">Approved</p>
            <p className="text-xl md:text-2xl font-bold text-accent">
              {contests.filter((c) => c.status === "approved").length}
            </p>
          </div>
          <div className="bg-error/10 border border-error/30 rounded-xl p-4">
            <p className="text-xs md:text-sm text-error/80 mb-1">Rejected</p>
            <p className="text-xl md:text-2xl font-bold text-error">
              {contests.filter((c) => c.status === "rejected").length}
            </p>
          </div>
        </div>

        {/* Global Empty State */}
        {contests.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-xl">
            <p className="text-xl font-semibold text-base-content/70 mb-2">
              No contests found
            </p>
            <p className="text-base-content/60">
              There are currently no contests in the system.
            </p>
          </div>
        ) : (
          <>
            {/* Showing Info */}
            <div className="mb-4 text-sm text-base-content/70">
              Showing{" "}
              <span className="font-semibold text-base-content">
                {(currentPage - 1) * limit + 1}–{Math.min(currentPage * limit, contestsData.total)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-base-content">{contestsData.total}</span>{" "}
              contests
            </div>

            {/* Contests - Unified Card View (mobile, tablet, md) */}
            <div className="lg:hidden grid grid-cols-1 gap-6">
              {contests.map((contest) => {
                const displayStatus = getContestDisplayStatus(contest);
                return (
                  <motion.div
                    key={contest._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-base-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Image & Title */}
                    <div className="flex gap-4 mb-4">
                      <img
                        className="w-24 h-24 rounded-lg object-cover ring-2 ring-base-300 flex-shrink-0"
                        src={contest.image}
                        alt={contest.name}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base-content mb-1 line-clamp-2">
                          {contest.name}
                        </h3>
                        <span
                          className={`badge ${getStatusBadge(displayStatus)} capitalize badge-sm mb-2 inline-block`}
                        >
                          {displayStatus === "live"
                            ? "Live"
                            : displayStatus === "ended"
                            ? "Ended"
                            : displayStatus === "winner_declared"
                            ? "Winner Declared"
                            : contest.status}
                        </span>
                        <p className="text-sm text-base-content/70 line-clamp-2">
                          {contest.description?.substring(0, 100) || "No description..."}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-base-content/60">Type:</span>
                        <p className="font-medium">{contest.contestType}</p>
                      </div>
                      <div>
                        <span className="text-base-content/60">Prize:</span>
                        <p className="font-medium text-success">${contest.prizeMoney}</p>
                      </div>
                      <div>
                        <span className="text-base-content/60">Entry:</span>
                        <p className="font-medium">${contest.entryFee}</p>
                      </div>
                      <div>
                        <span className="text-base-content/60">Participants:</span>
                        <p className="font-medium">{contest.participantCount}</p>
                      </div>
                    </div>

                    {/* Creator & Deadline */}
                    <div className="text-xs text-base-content/70 mb-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <FaUser className="w-3 h-3" />
                        By: <strong>{contest.creator?.name}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendar className="w-3 h-3" />
                        Deadline: {formatDeadline(contest.deadline)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/contest/${contest._id}`}
                        className="btn btn-sm btn-outline gap-2 flex-1"
                      >
                        <FiEye className="w-4 h-4" />
                        View Details
                      </Link>

                      {contest.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(contest._id, contest.name)}
                            className="btn btn-sm bg-accent text-base-content/80 hover:bg-accent/80 gap-2 flex-1"
                          >
                            <FiCheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(contest._id, contest.name)}
                            className="btn btn-sm bg-primary text-base-content/80 hover:bg-primary/80 gap-2 flex-1"
                          >
                            <FiXCircle className="w-4 h-4" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleDelete(contest._id, contest.name)}
                            className="btn btn-sm bg-error text-base-content/80 hover:bg-error/80 gap-2 w-full mt-2"
                          >
                            <FiTrash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </>
                      )}

                      {displayStatus === "live" && (
                        <div className="badge badge-success gap-2 w-full justify-center py-3">
                          <FiCheckCircle className="w-4 h-4" />
                          Contest is live
                        </div>
                      )}

                      {displayStatus === "ended" && (
                        <div className="badge badge-warning gap-2 w-full justify-center py-3">
                          <FiXCircle className="w-4 h-4" />
                          Contest has ended
                        </div>
                      )}

                      {displayStatus === "winner_declared" && (
                        <div className="badge badge-secondary gap-2 w-full justify-center py-3">
                          <FiAward className="w-4 h-4" />
                          Winner declared
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Table (lg and up only) */}
            <div className="hidden lg:block rounded-xl shadow-lg overflow-hidden mb-8">
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
                  {contests.map((contest) => {
                    const displayStatus = getContestDisplayStatus(contest);
                    return (
                      <tr
                        key={contest._id}
                        className="hover:bg-base-200/50 transition border-b border-base-300"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-start gap-4">
                            <div className="shrink-0">
                              <img
                                className="w-24 h-24 rounded-lg object-cover ring-2 ring-base-300"
                                src={contest.image}
                                alt={contest.name}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <h3 className="font-bold text-base-content line-clamp-1">
                                  {contest.name}
                                </h3>
                                <span
                                  className={`badge ${getStatusBadge(displayStatus)} capitalize shrink-0`}
                                >
                                  {displayStatus === "live"
                                    ? "Live"
                                    : displayStatus === "ended"
                                    ? "Ended"
                                    : displayStatus === "winner_declared"
                                    ? "Winner Declared"
                                    : contest.status}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="badge badge-primary badge-sm">{contest.contestType}</span>
                                <span className="text-sm font-semibold text-success">
                                  ${contest.prizeMoney} Prize
                                </span>
                                <span className="text-xs text-base-content/60">
                                  ${contest.entryFee} Entry
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-base-content/70 mb-2">
                                <span className="flex gap-1 items-center">
                                  <FaUser />
                                  By: <strong>{contest.creator?.name}</strong>
                                </span>
                                <span className="flex gap-1 items-center">
                                  <FaUsers />
                                  <strong>{contest.participantCount}</strong> participants
                                </span>
                              </div>
                              <div className="text-xs text-base-content/60 flex gap-1 items-center">
                                <FaCalendar />
                                Deadline: {formatDeadline(contest.deadline)}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex flex-col gap-2">
                            <Link to={`/contest/${contest._id}`} className="btn btn-sm btn-outline gap-2">
                              <FiEye className="w-4 h-4" />
                              View Details
                            </Link>

                            {contest.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(contest._id, contest.name)}
                                  className="btn btn-sm bg-accent text-base-content/80 hover:bg-accent/80 gap-2"
                                >
                                  <FiCheckCircle className="w-4 h-4" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(contest._id, contest.name)}
                                  className="btn btn-sm bg-primary text-base-content/80 hover:bg-primary/80 gap-2"
                                >
                                  <FiXCircle className="w-4 h-4" />
                                  Reject
                                </button>
                                <button
                                  onClick={() => handleDelete(contest._id, contest.name)}
                                  className="btn btn-sm bg-error text-base-content/80 hover:bg-error/80 gap-2"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </>
                            )}

                            {displayStatus === "live" && (
                              <div className="text-xs text-success flex items-center gap-1">
                                <FiCheckCircle className="w-3 h-3" />
                                Contest is live
                              </div>
                            )}

                            {displayStatus === "ended" && (
                              <div className="text-xs text-warning flex items-center gap-1">
                                <FiXCircle className="w-3 h-3" />
                                Contest has ended
                              </div>
                            )}

                            {displayStatus === "winner_declared" && (
                              <div className="text-xs text-secondary flex items-center gap-1">
                                <FiAward className="w-3 h-3" />
                                Winner declared
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-outline gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`btn btn-sm ${
                            currentPage === page ? "btn-primary" : "btn-outline"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="flex items-center px-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-outline gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Next</span>
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageContests;