import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import { imageUpload } from "../../../utils";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch contest details
  const {
    data: contest,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contest-edit", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    values: contest
      ? {
          name: contest.name,
          image: contest.image,
          description: contest.description,
          contestType: contest.contestType,
          prizeMoney: contest.prizeMoney,
          entryFee: contest.entryFee,
          taskInstruction: contest.taskInstruction,
          deadline: contest.deadline
            ? new Date(contest.deadline).toISOString().slice(0, 16)
            : "",
        }
      : {},
  });

  const imageFile = watch("imageFile");

  // Update mutation
  const { mutate: updateContest, isPending: isUpdating } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/contest/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contest-edit", id]);
      queryClient.invalidateQueries(["my-contests"]);
      Swal.fire({
        title: "Success!",
        text: "Contest updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard/my-contests");
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update contest",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      let imageUrl = contest.image;

      // Upload new image if selected
      if (imageFile && imageFile[0]) {
        setIsUploading(true);
        try {
          imageUrl = await imageUpload(imageFile[0]);
        } catch (error) {
          toast.error("Failed to upload image");
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      const updatedContest = {
        name: data.name,
        image: imageUrl,
        description: data.description,
        contestType: data.contestType,
        prizeMoney: Number(data.prizeMoney),
        entryFee: Number(data.entryFee),
        taskInstruction: data.taskInstruction,
        deadline: new Date(data.deadline).toISOString(),
      };

      updateContest(updatedContest);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  // Check if contest can be edited
  if (contest.status !== "pending") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-error/10 border border-error/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-error mb-4">
            Cannot Edit Contest
          </h2>
          <p className="text-base-content/70 mb-6">
            Only pending contests can be edited. This contest has been{" "}
            <span className="font-semibold capitalize">{contest.status}</span>.
          </p>
          <button
            onClick={() => navigate("/dashboard/my-contests")}
            className="btn btn-primary"
          >
            Back to My Contests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Edit <span className="gradient-text">Contest</span>
        </h2>
        <p className="text-base-content/70">
          Update your contest details before admin approval
        </p>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto bg-base-200 rounded-2xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contest Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Contest Name *</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Contest name is required",
                minLength: {
                  value: 5,
                  message: "Contest name must be at least 5 characters",
                },
              })}
              placeholder="Enter contest name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-error text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Contest Image</span>
            </label>

            {/* Current Image Preview */}
            <div className="mb-4">
              <p className="text-sm text-base-content/60 mb-2">
                Current Image:
              </p>
              <img
                src={imagePreview || contest.image}
                alt="Contest"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Upload New Image */}
            <input
              type="file"
              accept="image/*"
              {...register("imageFile")}
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            <span className="text-xs text-base-content/60 mt-1">
              Leave empty to keep current image
            </span>
          </div>

          {/* Contest Type & Prize Money Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contest Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Contest Type *</span>
              </label>
              <select
                {...register("contestType", {
                  required: "Contest Type is Required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select contest type</option>

                <optgroup label="Creative">
                  <option value="Design">Design</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="UI/UX Design">UI / UX Design</option>
                  <option value="Illustration">Illustration</option>
                  <option value="Photography">Photography</option>
                  <option value="Videography">Videography</option>
                  <option value="Animation">Animation</option>
                </optgroup>

                <optgroup label="Writing & Content">
                  <option value="Writing">Writing</option>
                  <option value="Creative Writing">Creative Writing</option>
                  <option value="Copywriting">Copywriting</option>
                  <option value="Blogging">Blogging</option>
                  <option value="Technical Writing">Technical Writing</option>
                  <option value="Poetry">Poetry</option>
                </optgroup>

                <optgroup label="Tech & Development">
                  <option value="Coding">Coding</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Game Development">Game Development</option>
                  <option value="AI / Machine Learning">
                    AI / Machine Learning
                  </option>
                  <option value="Data Science">Data Science</option>
                </optgroup>

                <optgroup label="Business & Marketing">
                  <option value="Marketing">Marketing</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="SEO">SEO</option>
                  <option value="Branding">Branding</option>
                  <option value="Startup Pitch">Startup Pitch</option>
                </optgroup>

                <optgroup label="Media & Performance">
                  <option value="Music">Music</option>
                  <option value="Voice Acting">Voice Acting</option>
                  <option value="Podcast">Podcast</option>
                  <option value="Short Film">Short Film</option>
                </optgroup>

                <optgroup label="Academic & Innovation">
                  <option value="Research">Research</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Ideathon">Ideathon</option>
                </optgroup>

                <option value="Others">Others</option>
              </select>
              {errors.contestType && (
                <span className="text-error text-sm mt-1">
                  {errors.contestType.message}
                </span>
              )}
            </div>

            {/* Prize Money */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Prize Money ($) *
                </span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("prizeMoney", {
                  required: "Prize money is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Prize money must be at least $1",
                  },
                })}
                placeholder="Enter prize amount"
                className="input input-bordered w-full"
              />
              {errors.prizeMoney && (
                <span className="text-error text-sm mt-1">
                  {errors.prizeMoney.message}
                </span>
              )}
            </div>
          </div>

          {/* Entry Fee & Deadline Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry Fee */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Entry Fee ($) *
                </span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("entryFee", {
                  required: "Entry fee is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Entry fee cannot be negative",
                  },
                })}
                placeholder="Enter entry fee"
                className="input input-bordered w-full"
              />
              {errors.entryFee && (
                <span className="text-error text-sm mt-1">
                  {errors.entryFee.message}
                </span>
              )}
            </div>

            {/* Deadline */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Deadline *</span>
              </label>
              <input
                type="datetime-local"
                {...register("deadline", {
                  required: "Deadline is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const now = new Date();
                    return (
                      selectedDate > now || "Deadline must be in the future"
                    );
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.deadline && (
                <span className="text-error text-sm mt-1">
                  {errors.deadline.message}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Description *</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
              })}
              placeholder="Describe your contest..."
              className="textarea textarea-bordered h-32"
            />
            {errors.description && (
              <span className="text-error text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Task Instructions */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Task Instructions *
              </span>
            </label>
            <textarea
              {...register("taskInstruction", {
                required: "Task instructions are required",
                minLength: {
                  value: 20,
                  message: "Instructions must be at least 20 characters",
                },
              })}
              placeholder="Provide detailed instructions for participants..."
              className="textarea textarea-bordered h-32"
            />
            {errors.taskInstruction && (
              <span className="text-error text-sm mt-1">
                {errors.taskInstruction.message}
              </span>
            )}
          </div>

          {/* Warning Message */}
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
            <p className="text-sm text-warning">
              ⚠️ <strong>Note:</strong> You can only edit this contest while
              it's in pending status. Once approved by admin, no changes can be
              made.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-contests")}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating || isUploading}
              className="btn btn-primary flex-1"
            >
              {isUploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Uploading Image...
                </>
              ) : isUpdating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Update Contest"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContest;
