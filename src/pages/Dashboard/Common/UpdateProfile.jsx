import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import { FiCamera, FiUser, FiMail, FiFileText, FiInfo } from "react-icons/fi";
import { motion } from "framer-motion";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });

  const imageFile = watch("imageFile");
  const bioLength = watch("bio")?.length || 0;

  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name || "",
        email: userInfo.email || "",
        bio: userInfo.bio || "",
      });
      setImagePreview(userInfo.image);
    }
  }, [userInfo, reset]);

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch("/user/update", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user.email]);
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard/profile");
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update profile",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submit
  const onSubmit = async (data) => {
    try {
      let imageUrl = userInfo.image;

      // Upload new image
      if (imageFile && imageFile[0]) {
        setIsUploading(true);
        try {
          imageUrl = await imageUpload(imageFile[0]);
          toast.success("Image uploaded successfully");
        } catch (error) {
          toast.error("Failed to upload image");
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      const updatedData = {
        name: data.name,
        email: data.email,
        bio: data.bio,
        image: imageUrl,
      };

      updateProfile(updatedData);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Update <span className="gradient-text">Profile</span>
        </h2>
        <p className="text-base-content/70">
          Update your profile information and bio
        </p>
      </div>

      {/* Form Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3 bg-base-200 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary via-accent to-secondary"></div>

          {/* Form  */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8">
            <div className="flex flex-col items-center -mt-16 mb-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75"></div>
                <img
                  src={imagePreview || userInfo.image}
                  alt="Profile"
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-base-200 shadow-xl"
                />
                <label
                  htmlFor="imageFile"
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition shadow-lg border-2 border-base-200"
                >
                  <FiCamera className="w-5 h-5 text-base-100" />
                  <input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    {...register("imageFile")}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="text-sm text-base-content/60 text-center mt-4">
                Click the camera icon to update your profile picture
              </p>
              <p className="text-xs text-base-content/50 mt-1">
                Max size: 5MB • Formats: JPG, PNG, GIF
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FiUser className="w-4 h-4" />
                      Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                  />
                  {errors.name && (
                    <span className="text-error text-sm mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FiMail className="w-4 h-4" />
                      Email *
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                    disabled
                  />
                  <span className="text-xs text-base-content/50 mt-1">
                    Email cannot be changed
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FiFileText className="w-4 h-4" />
                    Bio
                  </span>
                  <span className="label-text-alt text-base-content/50">
                    {bioLength} / 500
                  </span>
                </label>
                <textarea
                  {...register("bio", {
                    maxLength: {
                      value: 500,
                      message: "Bio must be less than 500 characters",
                    },
                  })}
                  placeholder="Write something about yourself..."
                  className="textarea textarea-bordered h-32 w-full"
                />
                {errors.bio && (
                  <span className="text-error text-sm mt-1">
                    {errors.bio.message}
                  </span>
                )}
              </div>

              <div className="bg-info/10 border border-info/30 rounded-lg p-4">
                <p className="text-sm text-info flex items-center gap-2">
                  <span className="shrink-0"><FiInfo/></span>
                  <span>
                    <strong>Note:</strong> Your profile information will be
                    visible to other users on the platform.
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/profile")}
                  className="btn btn-outline flex-1 px-4 py-2"
                  disabled={isUpdating || isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating || isUploading}
                  className="btn btn-primary flex-1 px-4 py-2"
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
                    "Update Profile"
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateProfile;
