import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure()

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post(`/payment-success`, {
        sessionId,
      });
    }
  }, [sessionId, axiosSecure]);
  console.log(sessionId);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-base-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          You have successfully completed your payment and joined the contest.
        </p>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-sm text-green-700">
          🎉 Best of luck! Your submission can be added from your dashboard once
          the contest starts.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link to={'/dashboard/my-participated'} className="btn btn-primary">Go to My Participations</Link>
          <Link to={'/'} className="btn btn-outline btn-sm">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
