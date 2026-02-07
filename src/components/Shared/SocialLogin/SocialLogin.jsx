import React from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveOrUpdateUser } from "../../../utils";

const SocialLogin = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handleGoogleSignIn}
      className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
    >
      <FcGoogle size={32} />

      <p>
        {loading ? (
          <TbFidgetSpinner className="animate-spin m-auto" />
        ) : (
          "Continue with Google"
        )}
      </p>
    </button>
  );
};

export default SocialLogin;
