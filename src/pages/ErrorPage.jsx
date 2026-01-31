import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Top Back Button */}
      <div className="p-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <BsArrowLeft />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <img
          src="https://i.ibb.co.com/0ythqdy3/error-404.png"
          alt="404 Error"
          className="w-72 md:w-96 mb-8 drop-shadow-lg"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="bg-linear-to-r from-error to-warning bg-clip-text text-transparent">
            Oops! Page Not Found
          </span>
        </h1>

        <p className="text-base-content/70 mb-8 max-w-md">
          The page you’re looking for doesn’t exist, might have been removed, or
          is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="btn btn-primary rounded-full px-8"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
