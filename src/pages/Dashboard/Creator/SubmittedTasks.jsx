import { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SubmittedTasks = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const {
    data: submissions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contest-submissions", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest-submissions/${id}`);
      return res.data;
    },
  });

  // Declare winner mutation
  const { mutate: declareWinner, isLoading: isDeclaring } = useMutation({
    mutationFn: async (submissionId) => {
      const res = await axiosSecure.patch(
        `/submissions/declare-winner/${submissionId}`,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Winner declared successfully!");
      setSelectedSubmission(null);
      queryClient.invalidateQueries(["contest-submissions", id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to declare winner");
    },
  });

  const handleDeclareWinner = (submissionId) => {
    Swal.fire({
      title: "Declare Winner?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, declare winner",
    }).then((result) => {
      if (result.isConfirmed) {
        declareWinner(submissionId);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">
        Contest Submissions ({submissions.length})
      </h2>

      {submissions.length === 0 ? (
        <p className="text-center text-base-content/60">No submissions yet</p>
      ) : (
        <div className="grid gap-4">
          {submissions.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-base-200 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.participantImage}
                  alt={item.participantName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{item.participantName}</p>
                  <p className="text-xs text-base-content/60">
                    {item.participantEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {item.status === "winner" && (
                  <span className="badge badge-success">Winner</span>
                )}

                <button
                  onClick={() => setSelectedSubmission(item)}
                  className="btn btn-sm btn-outline"
                >
                  View Submission
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedSubmission && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedSubmission.participantImage}
                alt={selectedSubmission.participantName}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg">
                  {selectedSubmission.participantName}
                </h3>
                <p className="text-sm text-base-content/60">
                  {selectedSubmission.participantEmail}
                </p>
              </div>
            </div>

            <div className="bg-base-200 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold mb-2">Submission Link</p>
              <a
                href={selectedSubmission.submissionLink}
                target="_blank"
                rel="noreferrer"
                className="link link-primary break-all"
              >
                {selectedSubmission.submissionLink}
              </a>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-outline"
              >
                Close
              </button>

              {selectedSubmission.status !== "winner" && (
                <button
                  disabled={isDeclaring}
                  onClick={() => handleDeclareWinner(selectedSubmission._id)}
                  className="btn btn-success"
                >
                  {isDeclaring ? "Declaring..." : "Declare Winner"}
                </button>
              )}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default SubmittedTasks;
