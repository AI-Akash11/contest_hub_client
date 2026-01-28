import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({
  fullScreen = true,
  message = "Loading Contest Hub...",
  size = 50,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      <ClipLoader
        size={size}
        color="var(--color-primary)"
        aria-label="Loading"
      />

      <p className="sm font-medium base-content opacity-80">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
