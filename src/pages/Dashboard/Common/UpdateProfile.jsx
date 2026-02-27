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
  const [selectedImage, setSelectedImage] = useState(null);
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

  const bioLength = watch("bio")?.length || 0;

  useEffect(() => {
    if (userInfo?.email) {
      reset({
        name: userInfo.name || "",
        email: userInfo.email || "",
        bio: userInfo.bio || "",
      });
      setImagePreview(userInfo.image);
    }
  }, [userInfo, reset]);

    //  Update profile mutation
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
      }).then(() => navigate("/dashboard/profile"));
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update profile",
        icon: "error",
      });
    },
  });


  // Image handling

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

//  Form submit 
  const onSubmit = async (data) => {
    try {
      let imageUrl = userInfo.image;

      if (selectedImage) {
        setIsUploading(true);
        imageUrl = await imageUpload(selectedImage);
        setIsUploading(false);
      }

      updateProfile({
        name: data.name,
        bio: data.bio,
        image: imageUrl,
      });
    } catch (err) {
      setIsUploading(false);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="container mx-auto md:px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Update <span className="gradient-text">Profile</span>
        </h2>
        <p className="text-base-content/70">
          Update your profile information and bio
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-base-200 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-primary via-accent to-secondary" />

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8">
          {/* Avatar */}
          <div className="flex flex-col items-center -mt-16 mb-8">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-base-200 shadow-xl"
              />
              <label
                htmlFor="imageFile"
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer border-2 border-base-200"
              >
                <FiCamera className="text-base-100" />
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="label font-semibold flex gap-2">
                  <FiUser /> Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <p className="text-error text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="label font-semibold flex gap-2">
                  <FiMail /> Email
                </label>
                <input
                  {...register("email")}
                  disabled
                  className="input input-bordered w-full bg-base-300"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="label font-semibold flex justify-between">
                <span className="flex gap-2">
                  <FiFileText /> Bio
                </span>
                <span className="text-xs opacity-60">{bioLength}/500</span>
              </label>
              <textarea
                {...register("bio", { maxLength: 500 })}
                className="textarea textarea-bordered w-full h-32"
              />
            </div>

            <div className="bg-info/10 border border-info/30 rounded-lg p-4 text-sm">
              <FiInfo className="inline mr-2" />
              Your profile information is visible to others.
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/profile")}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUploading || isUpdating}
                className="btn btn-primary flex-1"
              >
                {isUploading || isUpdating ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
