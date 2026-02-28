import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FiLogIn, FiLoader } from "react-icons/fi";

const DemoLoginButton = ({ role }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const credentials = {
    user: {
      email: import.meta.env.VITE_DEMO_USER_EMAIL || "demo@user.com",
      password: import.meta.env.VITE_DEMO_USER_PASSWORD || "DemoUser123!",
      label: "Login as Demo User",
      redirect: "/",
    },
    creator: {
      email: import.meta.env.VITE_DEMO_CREATOR_EMAIL || "demo@creator.com",
      password: import.meta.env.VITE_DEMO_CREATOR_PASSWORD || "DemoCreator456!",
      label: "Login as Demo Creator",
      redirect: "/dashboard",
    },
  };

  const creds = credentials[role];

  if (!creds) return null;

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await signIn(creds.email, creds.password);
      toast.success(`Welcome, ${role === "creator" ? "Creator" : "User"}!`);
      navigate(creds.redirect);
    } catch (error) {
      toast.error("Demo login failed. Please try again.");
      console.error("Demo login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDemoLogin}
      disabled={isLoading}
      className={`btn gap-2 w-full sm:w-auto min-w-[200px] ${
        role === "creator"
          ? "btn-accent hover:bg-accent-focus"
          : "btn-primary hover:bg-primary-focus"
      }`}
    >
      {isLoading ? (
        <>
          <FiLoader className="w-5 h-5 animate-spin" />
          Logging in...
        </>
      ) : (
        <>
          <FiLogIn className="w-5 h-5" />
          {creds.label}
        </>
      )}
    </button>
  );
};

export default DemoLoginButton;
