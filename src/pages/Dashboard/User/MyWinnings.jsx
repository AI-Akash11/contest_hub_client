import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyWinnings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: winnings = [], isLoading } = useQuery({
    queryKey: ["myWinnings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure("/my-winnings");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto md:px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            My <span className="gradient-text">Winnings</span>
          </h2>
          <p className="text-base-content/70">
            Contests you have won and the prize amount received.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-base-300 rounded-xl shadow">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-base-content/10">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Contest
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Result
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {winnings.map((item) => (
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

                  {/* Result (badge-style preserved) */}
                  <td className="px-6 py-4">
                    <span className="badge badge-secondary badge-outline px-4 py-6 text-sm font-semibold">
                      Won ${item.prize}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <Link
                      to={`/contest/${item.contestId}`}
                      className="text-secondary font-medium hover:underline"
                    >
                      View Contest
                    </Link>
                  </td>
                </tr>
              ))}

              {winnings.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-10 text-base-content/60"
                  >
                    You haven’t won any contests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default MyWinnings;
