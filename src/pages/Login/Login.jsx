import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import SocialLogin from "../../components/Shared/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import DemoLoginButton from "../../components/demoLogin/DemoLogin";

const Login = () => {
  const { signIn, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (user) return <Navigate to={from} replace={true} />;

  // form submit handler
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      //User Login
      await signIn(email, password);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      // console.log(err);
      toast.error(err?.message);
      reset();
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex flex-col max-w-xl p-6 rounded-md md:p-10 bg-base-200 text-base-content">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-base-content/50">
            Sign in to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* email */}
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
                autoComplete="current-password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-base-300 text-base-content"
                {...register("password", {
                  required: "password is required",
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
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-primary text-base-content/50 cursor-pointer">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px md:w-16 dark:bg-base-300"></div>
          <p className="px-3 text-sm dark:text-base-content/50">
            Login with social accounts
          </p>
          <div className="flex-1 h-px md:w-16 dark:bg-base-300"></div>
        </div>
        <SocialLogin></SocialLogin>

        <p className="px-6 text-sm text-center text-base-content/50">
          Don&apos;t have an account yet?{" "}
          <Link
            state={from}
            to="/signup"
            className="hover:underline hover:text-primary text-base-content/70"
          >
            Sign up
          </Link>
          .
        </p>

        {/* DEMO LOGIN BUTTONS - Placed here */}
        <div className="mt-8 space-y-4">
          <p className="text-sm text-center text-base-content/70">
            Want to test the platform quickly? Use demo accounts:
          </p>

          <div className="flex flex-col gap-4 justify-center">
            <DemoLoginButton
              role="user"
              email={import.meta.env.VITE_DEMO_USER_EMAIL || "demo@user.com"}
              password={import.meta.env.VITE_DEMO_USER_PASSWORD || "123Demo!"}
              label="Demo User Login"
              color="primary"
            />

            <DemoLoginButton
              role="creator"
              email={
                import.meta.env.VITE_DEMO_CREATOR_EMAIL || "demo@creator.com"
              }
              password={
                import.meta.env.VITE_DEMO_CREATOR_PASSWORD || "123Demo!"
              }
              label="Demo Creator Login"
              color="accent"
            />
          </div>

          <p className="text-xs text-center text-base-content/60">
            These are safe demo accounts for reviewers — no real data affected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
