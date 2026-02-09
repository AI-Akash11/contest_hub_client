import { useQuery } from "@tanstack/react-query";
import { FaPlusCircle, FaCheckCircle, FaDollarSign } from "react-icons/fa";
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

const COLORS = ["#3b82f6", "#22c55e", "#facc15"];

const CreatorStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: creatorData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["creatorStats"],
    queryFn: async () => {
      const res = await axiosSecure("/user");
      return res.data.creatorActions;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const { contestsCreated, contestsCompleted, totalPrizePaid } = creatorData;

  const pieData = [
    { name: "Created", value: contestsCreated },
    { name: "Completed", value: contestsCompleted },
    { name: "Prize Paid", value: totalPrizePaid },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">
          Creator <span className="gradient-text">Overview</span>
        </h2>
        <p className="text-base-content/70">
          Insights into your contest creation and completion activity
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="relative bg-base-100 rounded-xl shadow-md p-6">
          <FaPlusCircle className="absolute top-4 right-4 w-8 h-8 text-info opacity-80" />
          <p className="text-sm text-base-content/60">Contests Created</p>
          <h3 className="text-3xl font-bold text-info">{contestsCreated}</h3>
        </div>

        <div className="relative bg-base-100 rounded-xl shadow-md p-6">
          <FaCheckCircle className="absolute top-4 right-4 w-8 h-8 text-success opacity-80" />
          <p className="text-sm text-base-content/60">Contests Completed</p>
          <h3 className="text-3xl font-bold text-success">
            {contestsCompleted}
          </h3>
        </div>

        <div className="relative bg-base-100 rounded-xl shadow-md p-6">
          <FaDollarSign className="absolute top-4 right-4 w-8 h-8 text-warning opacity-80" />
          <p className="text-sm text-base-content/60">Total Prize Paid</p>
          <h3 className="text-3xl font-bold text-warning">${totalPrizePaid}</h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-base-100 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          Creator Activity Breakdown
        </h3>

        <div className="h-72">
          {contestsCreated + contestsCompleted + totalPrizePaid === 0 ? (
            <p className="text-center text-base-content/60 mt-20">
              No creator activity recorded yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90} label>
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
    </div>
  );
};

export default CreatorStatistics;
