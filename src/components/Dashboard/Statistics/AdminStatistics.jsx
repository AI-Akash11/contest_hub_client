import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ErrorPage from "../../../pages/ErrorPage";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: adminData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminData"],
    queryFn: async () => {
      const res = await axiosSecure("/user");
      return res.data.adminActions;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  const { approved, rejected, deleted } = adminData || {};

  const pieData = [
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
    { name: "Deleted", value: deleted },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">
          Admin <span className="gradient-text">Overview</span>
        </h2>
        <p className="text-base-content/70">
          High-level insights into administrative actions and platform activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Approved Contests */}
        <div className="relative bg-base-100 rounded-xl shadow-md p-6 overflow-hidden">
          <div className="absolute top-4 right-4 text-success">
            <FaCheckCircle className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-sm text-base-content/60 mb-1">Contests Approved</p>
          <h3 className="text-3xl font-bold text-success">{approved}</h3>
        </div>

        {/* Rejected Contests */}
        <div className="relative bg-base-100 rounded-xl shadow-md p-6 overflow-hidden">
          <div className="absolute top-4 right-4 text-warning">
            <FaTimesCircle className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-sm text-base-content/60 mb-1">Contests Rejected</p>
          <h3 className="text-3xl font-bold text-warning">{rejected}</h3>
        </div>

        {/* Deleted Contests */}
        <div className="relative bg-base-100 rounded-xl shadow-md p-6 overflow-hidden">
          <div className="absolute top-4 right-4 text-error">
            <FaTrashAlt className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-sm text-base-content/60 mb-1">Contests Deleted</p>
          <h3 className="text-3xl font-bold text-error">{deleted}</h3>
        </div>
      </div>

      {/* Future Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-base-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            Administrative Actions Summary
          </h3>
          {/* pie chart */}
          <div className="h-72">
            {approved + rejected + deleted === 0 ? (
              <p className="text-center text-base-content/60 mt-20">
                No administrative actions recorded yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Info / Notes */}
        <div className="bg-base-100 rounded-xl shadow-md p-6">
          <h4 className="text-lg font-semibold mb-2">Administrative Notes</h4>
          <p className="text-sm text-base-content/60 mb-4">
            These metrics reflect cumulative admin actions since platform
            launch.
          </p>

          <ul className="text-sm text-base-content/70 space-y-2">
            <li>• Actions are counted only when successfully processed</li>
            <li>• Approved contests become publicly visible</li>
            <li>• Deleted contests cannot be recovered</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
