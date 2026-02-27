import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiDollarSign, FiEye } from "react-icons/fi";

const MyParticipated = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: participated = [], isLoading } = useQuery({
    queryKey: ["myParticipated", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure("/my-participated");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto md:px-4 py-8">

        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            My Participated <span className="gradient-text">Contests</span>
          </h2>
          <p className="text-base-content/70">
            See your participated contests and payment status.
          </p>
        </div>

        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden md:block overflow-x-auto bg-base-300 rounded-xl shadow">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-base-content/10">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Contest
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Payment Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {participated.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-base-content/5 hover:bg-base-200 transition"
                >
                  {/* Contest */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>

                  {/* Payment Status */}
                  <td className="px-6 py-4">
                    <span className="badge badge-primary badge-outline px-4 py-3 md:py-6 text-sm font-semibold">
                      Paid ${item.price}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <Link
                      to={`/contest/${item.contestId}`}
                      className="text-primary font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}

              {participated.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-10 text-base-content/60"
                  >
                    You haven't participated in any contests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on Mobile */}
        <div className="md:hidden space-y-4">
          {participated.length === 0 ? (
            <div className="text-center py-10 bg-base-300 rounded-xl">
              <p className="text-base-content/60">
                You haven't participated in any contests yet.
              </p>
            </div>
          ) : (
            participated.map((item) => (
              <div
                key={item._id}
                className="bg-base-300 rounded-xl p-4 shadow-lg"
              >
                {/* Contest Image and Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover ring-2 ring-base-content/20"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base-content line-clamp-2">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-lg px-3 py-2">
                    <FiDollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      Paid ${item.price}
                    </span>
                    <span className="ml-auto badge badge-success badge-xs">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/contest/${item.contestId}`}
                  className="btn btn-primary btn-sm w-full gap-2"
                >
                  <FiEye className="w-4 h-4" />
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
    </div>
  );
};

export default MyParticipated;