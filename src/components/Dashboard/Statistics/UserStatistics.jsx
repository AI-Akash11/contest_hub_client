import { useQuery } from "@tanstack/react-query";
import { FaTrophy, FaListUl, FaDollarSign } from "react-icons/fa";
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

const UserStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: userData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const res = await axiosSecure("/user");
      return res.data.userActions;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const { contestsParticipated, contestsWon, totalWinnings } = userData;

  const pieData = [
    { name: "Participated", value: contestsParticipated },
    { name: "Won", value: contestsWon },
  ];

  return (
    <div className="container mx-auto md:px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">
          User <span className="gradient-text">Overview</span>
        </h2>
        <p className="text-base-content/70">
          Your participation, wins, and total earnings summary
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="relative bg-base-300 rounded-xl shadow-md p-6">
          <FaListUl className="absolute top-4 right-4 w-8 h-8 text-info opacity-80" />
          <p className="text-sm text-base-content/60">Contests Participated</p>
          <h3 className="text-3xl font-bold text-info">
            {contestsParticipated}
          </h3>
        </div>

        <div className="relative bg-base-300 rounded-xl shadow-md p-6">
          <FaTrophy className="absolute top-4 right-4 w-8 h-8 text-success opacity-80" />
          <p className="text-sm text-base-content/60">Contests Won</p>
          <h3 className="text-3xl font-bold text-success">
            {contestsWon}
          </h3>
        </div>

        <div className="relative bg-base-300 rounded-xl shadow-md p-6">
          <FaDollarSign className="absolute top-4 right-4 w-8 h-8 text-warning opacity-80" />
          <p className="text-sm text-base-content/60">Total Winnings</p>
          <h3 className="text-3xl font-bold text-warning">
            ${totalWinnings}
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-base-300 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          User Performance Breakdown
        </h3>

        <div className="h-72">
          {contestsParticipated + contestsWon + totalWinnings === 0 ? (
            <p className="text-center text-base-content/60 mt-20">
              No activity recorded yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={90}
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
    </div>
  );
};

export default UserStatistics;
