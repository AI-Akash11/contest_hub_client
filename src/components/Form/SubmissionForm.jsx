import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SubmissionForm = ({ contestId, contestName, contestEnded }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // get existing submission
  const {
    data: existingSubmission,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-submission", contestId],
    queryFn: async () => {
      const res = await axiosSecure(`/my-submission/${contestId}`);
      return res.data;
    },
    enabled: !!contestId && !contestEnded,
  });

  const hasSubmitted = !!existingSubmission?.submissionLink;

  useEffect(() => {
    if (existingSubmission?.submissionLink) {
      reset({ submissionLink: existingSubmission.submissionLink });
    }
  }, [existingSubmission, reset]);

  // Mutation
  const submitMutation = useMutation({
    mutationFn: ({ submissionLink }) =>
      axiosSecure.post("/submit-task", {
        contestId,
        submissionLink,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries(["my-submission", contestId]);

      Swal.fire({
        title: "Success!",
        text: hasSubmitted
          ? "Your submission has been updated successfully!"
          : "Your submission has been recorded successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    },

    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to submit. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const onSubmit = async (data) => {
    let link = data.submissionLink.trim();

    try {
      new URL(link);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    const result = await Swal.fire({
      title: hasSubmitted ? "Update Submission?" : "Submit Your Work?",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Contest:</strong> ${contestName}</p>
          <p class="mb-2"><strong>Submission Link:</strong></p>
          <p class="text-sm text-blue-600 break-all">${link}</p>
          ${
            hasSubmitted
              ? '<p class="text-sm text-warning mt-3">This will update your previous submission.</p>'
              : ""
          }
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: hasSubmitted
        ? "Yes, update it!"
        : "Yes, submit it!",
    });

    if (result.isConfirmed) {
      submitMutation.mutate({ submissionLink: link });
    }
  };

  if (isLoading) {
    return (
      <p className="text-sm text-base-content/60">
        Loading submission...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-error">
        Failed to load submission info
      </p>
    );
  }

  return (
    <div className="bg-linear-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-xl p-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✅</span>
          <h3 className="font-bold text-success">
            {hasSubmitted ? "Submission Recorded" : "You're Registered!"}
          </h3>
        </div>
        <p className="text-sm text-base-content/70">
          {contestEnded
            ? "Contest has ended. Submissions are closed."
            : hasSubmitted
            ? "You can update your submission before the deadline."
            : "Submit your work to compete for the prize!"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Instructions */}
        <div className="bg-base-100 rounded-lg p-4">
          <p className="text-xs font-semibold text-base-content/70 mb-2">
            📝 Submission Guidelines:
          </p>
          <ul className="text-xs text-base-content/60 space-y-1">
            <li>• Upload your work to Google Drive, Dropbox, or similar</li>
            <li>• Make sure the link is publicly accessible</li>
            <li>• You can update your submission before the deadline</li>
            <li>• Follow the task instructions carefully</li>
          </ul>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Submission Link
          </label>
          <input
            type="url"
            placeholder="https://drive.google.com/your-file-link"
            disabled={contestEnded}
            className="w-full px-4 py-3 rounded-lg border-2 border-success/30 bg-base-100 focus:outline-none focus:border-success disabled:opacity-50 disabled:cursor-not-allowed"
            {...register("submissionLink", {
              required: "Submission link is required",
            })}
          />
          {errors.submissionLink && (
            <p className="text-xs text-error mt-1">
              {errors.submissionLink.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitMutation.isPending || contestEnded}
          className="w-full py-3 rounded-lg bg-success text-success-content font-semibold hover:bg-success/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitMutation.isPending ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              {hasSubmitted ? "Updating..." : "Submitting..."}
            </>
          ) : hasSubmitted ? (
            "Update Submission"
          ) : (
            "Submit Your Work"
          )}
        </button>

        {hasSubmitted && (
          <p className="text-xs text-center text-success">
            ✓ Last submitted:{" "}
            {new Date(existingSubmission?.submittedAt).toLocaleString()}
          </p>
        )}
      </form>
    </div>
  );
};

export default SubmissionForm;
