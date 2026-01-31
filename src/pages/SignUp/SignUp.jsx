import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import SocialLogin from "../../components/Shared/SocialLogin/SocialLogin";
import { imageUpload } from "../../utils";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;

    const imageFile = image[0];


    try {

      const imageURL = await imageUpload(imageFile);

      //2. User Registration
      const result = await createUser(email, password);

      //3. Save username & profile photo
      await updateUserProfile(
        name,
        imageURL
      );
      console.log(result);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-base-200 text-base-content">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-base-content/50">Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-base-300 text-base-content"
                data-temp-mail-org="0"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name can only contain letters",
                  },
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.name.message}
              </p>
            )}
            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-base-content/80"
              >
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-base-content/60
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-primary/10 file:text-primary/80
      hover:file:bg-primary/20
      bg-base-300 border border-dashed border-primary/40 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
      py-2"
                {...register("image", {
                  required: "Profile image is required",
                })}
              />
              <p className="mt-1 text-xs text-base-content/50">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            {errors.image && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.image.message}
              </p>
            )}
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-base-300 text-base-content"
                data-temp-mail-org="0"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
            {/* password */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-base-300 text-base-content"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-base-300"></div>
          <p className="px-3 text-sm dark:text-base-content/50">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-base-300"></div>
        </div>
        <SocialLogin></SocialLogin>
        <p className="px-6 text-sm text-center text-base-content/50">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-primary text-base-content/70"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
