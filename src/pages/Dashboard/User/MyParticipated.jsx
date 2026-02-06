import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyParticipated = () => {
  const { user } = useAuth();

  const { data: participated = [], isLoading } = useQuery({
    queryKey: ["myParticipated", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-participated/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4">
      <div className="py-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            My Participated <span className="gradient-text">Contests</span>
          </h2>
          <p className="text-base-content/70">
            See your participated contests, the price you paid and status. 
          </p>
        </div>

        <div className="overflow-x-auto bg-base-300 rounded-xl shadow">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-base-content/10">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Contest
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Paid
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
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

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold">
                    ${item.price}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="badge badge-success badge-outline">
                      Paid
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
                    colSpan="4"
                    className="text-center py-10 text-base-content/60"
                  >
                    You haven’t participated in any contests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParticipated;
