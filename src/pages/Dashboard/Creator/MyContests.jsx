import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import { Link } from "react-router";
import { FiEdit2, FiTrash2, FiEye, FiClock, FiFileText } from "react-icons/fi";
import { formatDeadline, getContestStatus } from "../../../utils";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyContests = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const {
    data: myContests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-contests", user.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-contests`);
      return res.data;
    },
  });

  // Delete Mutation
  const { mutate: deleteContest } = useMutation({
    mutationFn: async (contestId) => {
      const { data } = await axiosSecure.delete(`/my-contests/${contestId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Contest deleted successfully!");
      queryClient.invalidateQueries(["my-contests", user.email]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete contest");
    },
  });

  const handleDelete = (contestId, contestName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete "${contestName}"? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContest(contestId);
      }
    });
  };

  // Get Status Badge Color
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

  return (
    <div className="container mx-auto md:px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">
          My Created <span className="gradient-text">Contests</span>
        </h2>
        <p className="text-base-content/70">
          Manage your contests - view, edit, or delete before approval
        </p>
      </div>

      {/* Contest Count */}
      {myContests.length > 0 && (
        <div className="flex justify-between items-center my-6">
          <p className="text-sm text-base-content/70">
            Showing <span className="font-bold text-primary">{myContests.length}</span>{" "}
            contests
          </p>
        </div>
      )}

      {myContests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-base-200 rounded-lg">
          <FiFileText className="w-16 h-16 opacity-50 mb-4" />
          <p className="text-lg font-medium mb-4">No contests created yet</p>
          <Link to="/dashboard/add-contest" className="btn btn-primary">
            Create Your First Contest
          </Link>
        </div>
      ) : (
        <>
          {/* lg screen */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-base-200 border-b border-base-300 text-base-content text-left text-sm uppercase font-semibold">
                      Contest Info
                    </th>
                    <th className="px-5 py-3 bg-base-200 border-b border-base-300 text-base-content text-left text-sm uppercase font-semibold">
                      Status & Actions
                    </th>
                    <th className="px-5 py-3 bg-base-200 border-b border-base-300 text-base-content text-left text-sm uppercase font-semibold">
                      Deadline & Submissions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myContests.map((contest) => {
                    const contestStatus = getContestStatus(contest.deadline);
                    const canEdit = contest.status === "pending";

                    return (
                      <tr
                        key={contest._id}
                        className="hover:bg-base-300/50 border-b bg-base-300 border-base-100"
                      >
                        {/* Contest Info Column */}
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-4">
                            <div className="shrink-0">
                              <img
                                className="w-16 h-16 rounded-lg object-cover"
                                src={contest.image}
                                alt={contest.name}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-base-content font-semibold text-sm mb-1 line-clamp-1">
                                {contest.name}
                              </p>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="bg-primary/20 text-primary px-2 py-1 text-xs rounded-xl">
                                  {contest.contestType}
                                </span>
                              </div>
                              <p className="text-xs text-base-content/60">
                                {contest.participantCount} participants
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            {/* Status Badge */}
                            <div>
                              <span
                                className={`badge ${getStatusBadge(contest.status)} capitalize text-base-100`}
                              >
                                {contest.status}
                              </span>
                            </div>
                            <Link
                              to={`/contest/${contest._id}`}
                              className="flex gap-1 items-center text-xs py-1 px-3 bg-accent/10 hover:bg-accent text-accent hover:text-base-100 font-semibold rounded-lg transition-all duration-300"
                            >
                              <FiEye className="w-4 h-4" />
                              Details
                            </Link>
                          </div>
                        </td>

                        {/* Status & Actions Column */}
                        <td className="px-5 py-5">
                          <div className="space-y-3">
                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 items-start">
                              {canEdit ? (
                                <>
                                  <Link
                                    to={`/dashboard/edit-contest/${contest._id}`}
                                    className="flex items-center gap-2 text-sm font-semibold hover:text-secondary hover:bg-secondary/30 px-4 py-1.5 rounded-lg min-w-20 w-1/2 bg-secondary text-base-100 transition duration-300 cursor-pointer"
                                  >
                                    <FiEdit2 className="w-3 h-3" />
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() =>
                                      handleDelete(contest._id, contest.name)
                                    }
                                    className="flex items-center gap-2 text-sm font-semibold hover:text-error hover:bg-error/30 px-4 py-1.5 rounded-lg w-1/2 bg-error text-base-100 transition duration-300 cursor-pointer min-w-20"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <p
                                  className={`text-xs ${
                                    contest.status === "approved"
                                      ? "text-accent"
                                      : "text-error"
                                  }`}
                                >
                                  {contest.status === "approved"
                                    ? "Contest was approved"
                                    : "Cannot edit rejected contest"}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Deadline & Submissions Column */}
                        <td className="px-5 py-5">
                          <div className="space-y-3">
                            {/* Deadline */}
                            <div className="flex items-center gap-2">
                              <FiClock
                                className={`w-4 h-4 ${
                                  contest.winner?.status === "declared" ||
                                  contestStatus.ended
                                    ? "text-error"
                                    : "text-success"
                                }`}
                              />
                              <div>
                                <p className="text-xs text-base-content/70">
                                  {formatDeadline(contest.deadline)}
                                </p>
                                <p
                                  className={`text-xs font-semibold ${
                                    contest.winner?.status === "declared" ||
                                    contestStatus.ended
                                      ? "text-error"
                                      : "text-accent"
                                  }`}
                                >
                                  {contest.winner?.status === "declared"
                                    ? "Contest Closed"
                                    : contestStatus.display}
                                </p>
                              </div>
                            </div>

                            {/* View Submissions Button */}
                            {contest.status === "approved" && (
                              <Link
                                to={`/dashboard/submitted-tasks/${contest._id}`}
                                className="btn btn-outline gap-2 w-full hover:bg-secondary"
                              >
                                <FiFileText className="w-4 h-4" />
                                View Submissions
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* mobile and tab */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {myContests.map((contest) => {
              const contestStatus = getContestStatus(contest.deadline);
              const canEdit = contest.status === "pending";

              return (
                <div
                  key={contest._id}
                  className="bg-base-200 rounded-lg p-4 shadow-lg"
                >
                  {/* Contest Image & Info */}
                  <div className="flex gap-3 mb-4">
                    <img
                      src={contest.image}
                      alt={contest.name}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {contest.name}
                      </h3>
                      <span className="bg-primary/20 text-primary px-2 py-1 text-xs rounded-lg inline-block">
                        {contest.contestType}
                      </span>
                    </div>
                  </div>

                  {/* Status & Participants */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`badge ${getStatusBadge(contest.status)} capitalize text-base-100`}
                    >
                      {contest.status}
                    </span>
                    <span className="text-xs text-base-content/60">
                      {contest.participantCount} participants
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center gap-2 mb-4 bg-base-300 p-2 rounded-lg">
                    <FiClock
                      className={`w-4 h-4 shrink-0 ${
                        contest.winner?.status === "declared" ||
                        contestStatus.ended
                          ? "text-error"
                          : "text-success"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-xs text-base-content/70">
                        {formatDeadline(contest.deadline)}
                      </p>
                      <p
                        className={`text-xs font-semibold ${
                          contest.winner?.status === "declared" ||
                          contestStatus.ended
                            ? "text-error"
                            : "text-accent"
                        }`}
                      >
                        {contest.winner?.status === "declared"
                          ? "Contest Closed"
                          : contestStatus.display}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Link
                      to={`/contest/${contest._id}`}
                      className="btn btn-sm btn-outline w-full gap-2"
                    >
                      <FiEye className="w-4 h-4" />
                      View Details
                    </Link>

                    {canEdit ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={`/dashboard/edit-contest/${contest._id}`}
                          className="btn btn-sm bg-secondary text-base-100 hover:bg-secondary/80 gap-1"
                        >
                          <FiEdit2 className="w-3 h-3" />
                          Edit
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(contest._id, contest.name)
                          }
                          className="btn btn-sm bg-error text-base-100 hover:bg-error/80 gap-1"
                        >
                          <FiTrash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    ) : (
                      ""
                    )}

                    {contest.status === "approved" && (
                      <Link
                        to={`/dashboard/submitted-tasks/${contest._id}`}
                        className="btn btn-sm btn-outline w-full gap-2 hover:bg-secondary hover:text-base-100"
                      >
                        <FiFileText className="w-4 h-4" />
                        View Submissions
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MyContests;
