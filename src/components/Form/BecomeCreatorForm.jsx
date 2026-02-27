import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BecomeCreatorForm = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.post("/become-creator");
      return data;
    },
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = async () => {
    try {
      Swal.fire({
        title: "Submitting Request",
        text: "Please wait while we process your request",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await mutateAsync();

      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: "Your request is under review. You’ll be notified once approved.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="container mx-auto md:px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">
          Become a <span className="gradient-text">Contest</span> Creator
        </h2>
        <p className="text-sm md:text-base text-base-content/70">
          Get access to create contests, manage submissions, and select winners
          on ContestHub.
        </p>
      </div>

      <div className="my-6 rounded-xl bg-base-100 border border-base-content/10 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-base-content mb-2">
          What does a Contest Creator do?
        </h3>

        <p className="text-xs md:text-sm text-base-content/70 leading-relaxed">
          Contest Creators are responsible for publishing contests, defining
          clear rules and tasks, reviewing submissions, and selecting winners in
          a fair and transparent manner. As a creator, you will have access to
          creator-only tools that help you manage contests and track participant
          activity.
        </p>

        <p className="text-xs md:text-sm text-base-content/70 leading-relaxed mt-3">
          All creator requests are reviewed by the admin team. Once approved,
          you will be able to create contests, set prize details, and manage
          submissions directly from your dashboard.
        </p>
      </div>

      {/* Info */}
      <div className="bg-base-200 rounded-xl p-4 mb-6 text-xs md:text-sm text-base-content/80 space-y-2">
        <p>✔ Create and publish contests</p>
        <p>✔ Manage participants and submissions</p>
        <p>✔ Select winners transparently</p>
        <p>✔ Earn trust within the ContestHub community</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-3 items-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary mt-1"
            {...register("agreement", {
              required: "You must agree before continuing",
            })}
          />
          <p className="text-xs md:text-sm text-base-content/70">
            I agree to follow ContestHub rules, ensure fair judging, and comply
            with platform policies.
          </p>
        </div>
        {errors.agreement && (
          <p className="text-error text-sm">{errors.agreement.message}</p>
        )}

        <div className="pt-4">
          <button
            disabled={isPending}
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-base-100 font-semibold
            hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition"
          >
            {isPending ? "Submitting Request..." : "Request Creator Access"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeCreatorForm;
