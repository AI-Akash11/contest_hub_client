import { motion } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiClock,
  FiAward,
  FiUser,
  FiMail,
} from "react-icons/fi";
import Container from "../../components/Shared/Container";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { formatDeadline, getContestStatus } from "../../utils";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import toast from "react-hot-toast";

const ContestDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const {
    data: contestDetails = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contestDetails", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/contest/${id}`);
      return res.data;
    },
  });

  const {
    _id,
    name,
    image,
    contestType,
    description,
    taskInstruction,
    prizeMoney,
    entryFee,
    participantCount,
    creator,
    deadline,
    winner,
  } = contestDetails || {};
  console.log(winner);

  const formatedDeadline = formatDeadline(deadline);
  const contestStatus = getContestStatus(deadline);

  // Payment Mutation
  const { mutate: createCheckoutSession, isPending: isPaymentPending } =
    useMutation({
      mutationFn: async (paymentInfo) => {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-checkout-session`,
          paymentInfo,
        );
        return data;
      },
      onSuccess: (data) => {
        if (data.url) {
          window.location.href = data.url;
        } else {
          toast.error("No checkout URL received");
        }
      },
      onError: (error) => {
        console.error("Payment error:", error);
        Swal.fire({
          title: "Payment Failed",
          text:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });

  const handlePayment = async () => {
    const paymentInfo = {
      contestId: _id,
      name,
      contestType,
      price: entryFee,
      description,
      image,
      creator,
      participant: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    const confirmation = await Swal.fire({
      title: `Do You want to participate in ${name}?`,
      text: `You will be paying $${entryFee}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed to Pay!",
    });

    if (confirmation.isConfirmed) {
      createCheckoutSession(paymentInfo);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <section className="bg-linear-to-br from-base-200 via-accent/5 to-primary/10 pb-20">
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <Container>
            <div className="pb-8">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold bg-primary/20 text-primary rounded-full">
                {contestType} Contest
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {name}
              </h1>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 bg-base-300 rounded-2xl"
            >
              <h2 className="text-xl font-bold mb-4">About This Contest</h2>
              <p className="text-base-content/70 leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Task */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 md:p-8 bg-base-300 rounded-2xl"
            >
              <h2 className="text-xl font-bold mb-4">Task Instructions</h2>
              <p className="text-base-content/70 leading-relaxed">
                {taskInstruction}
              </p>
            </motion.div>

            {/* Winner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              {winner && winner.status !== "pending" ? (
                // Winner Declared
                <div className="p-6 md:p-8 bg-base-300 shadow-xl">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-3">
                      <FiAward className="w-5 h-5 text-primary animate-pulse" />
                      <span className="text-sm font-bold text-primary uppercase tracking-wide">
                        Winner Announced
                      </span>
                    </div>
                  </div>

                  {/* Winner Card */}
                  <div className="bg-base-300 rounded-xl p-6 border border-primary/30">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75 animate-pulse"></div>
                        <img
                          src={winner.image}
                          alt={winner.name}
                          className="relative w-20 h-20 rounded-full object-cover ring-2 ring-primary"
                        />
                        {/* Trophy Badge */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border-2 border-base-300">
                          <FiAward className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-primary/70 uppercase">
                            Champion
                          </span>
                          <span className="badge badge-success badge-xs">
                            Verified
                          </span>
                        </div>
                        <h3 className="text-xl font-bold truncate mb-1">
                          {winner.name}
                        </h3>
                        <p className="text-sm text-base-content/70">
                          {winner.email || "Contest Winner"}
                        </p>
                      </div>
                    </div>

                    {/* Prize Banner */}
                    <div className="bg-gradient-to-r from-success/20 to-success/10 rounded-lg p-4 border border-success/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                            <FiDollarSign className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <p className="text-xs text-base-content/60">
                              Prize Money
                            </p>
                            <p className="text-2xl font-bold text-success">
                              ${prizeMoney}
                            </p>
                          </div>
                        </div>
                        <div className="text-4xl">🏆</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Message */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-base-content/60">
                      🎊 Congratulations on winning this contest! 🎊
                    </p>
                  </div>
                </div>
              ) : contestStatus.ended ? (
                // ⏳ Contest Ended - Winner Pending
                <div className="p-6 md:p-8 bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/30">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center">
                        <FiClock className="w-8 h-8 text-warning" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-warning">
                      Winner Announcement Pending
                    </h3>

                    <p className="text-sm text-base-content/70 mb-3">
                      The contest has ended. The creator is reviewing
                      submissions and will announce the winner soon!
                    </p>
                  </div>
                </div>
              ) : (
                // 🔥 Contest Ongoing
                <div className="p-6 md:p-8 bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/30">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                        <FiAward className="w-8 h-8 text-accent" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-accent">
                      Contest In Progress
                    </h3>

                    <p className="text-sm text-base-content/70 mb-4">
                      Winner will be announced after the deadline. Submit your
                      best work to compete!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-base-300 rounded-2xl space-y-4"
            >
              <Stat
                icon={<FiDollarSign />}
                label="Prize Money:"
                value={`$${prizeMoney}`}
                color="primary"
              />
              <Stat
                icon={<FiDollarSign />}
                label="Entry Fee:"
                value={`$${entryFee}`}
              />
              <Stat
                icon={<FiUsers />}
                label="Participants:"
                value={participantCount}
              />
              <Stat
                icon={<FiUser />}
                label="Created By:"
                value={creator.name}
              />
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Header Bar */}
              <div
                className={`px-6 py-4 ${
                  contestStatus.ended
                    ? "bg-gradient-to-r from-error to-error/80"
                    : "bg-gradient-to-r from-success to-success/80"
                }`}
              >
                <div className="flex items-center justify-between text-base-100">
                  <div className="flex items-center gap-2">
                    <FiClock className="w-5 h-5" />
                    <span className="font-semibold">
                      {contestStatus.ended
                        ? "Contest Closed"
                        : "Registration Open"}
                    </span>
                  </div>
                  {!contestStatus.ended && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-base-100 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-base-100"></span>
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 bg-base-300">
                <div className="space-y-4">
                  {/* Deadline */}
                  <div className="flex items-center justify-between pb-3 border-b border-base-content/10">
                    <span className="text-sm text-base-content/70">
                      {contestStatus.ended ? "Closed on:" : "Deadline:"}
                    </span>
                    <span className="font-semibold">{formatedDeadline}</span>
                  </div>

                  {/* Time  */}
                  {contestStatus.ended ? (
                    <div className="text-center py-4 bg-error/5 rounded-lg">
                      <FiClock className="w-8 h-8 text-error mx-auto mb-2" />
                      <p className="text-sm font-medium text-error">
                        Registration period has ended
                      </p>
                      <p className="text-xs text-base-content/60 mt-1">
                        Check back for results!
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-4 bg-success/5 rounded-lg">
                      <p className="text-3xl font-bold text-success mb-2">
                        {contestStatus.display}
                      </p>
                      <p className="text-xs text-base-content/70">
                        until deadline
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                disabled={contestStatus.ended || isPaymentPending}
                onClick={handlePayment}
                className="w-full py-4 rounded-xl bg-primary text-base-100 font-semibold hover:scale-105 transition disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPaymentPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
                ) : contestStatus.ended ? (
                  "Contest Ended"
                ) : (
                  `Register & Pay $${entryFee}`
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const Stat = ({ icon, label, value, color = "base" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl bg-${color}/20 flex items-center justify-center`}
      >
        <span className={`text-${color}`}>{icon}</span>
      </div>
      <span className="text-base-content/70">{label}</span>
    </div>
    <span className="font-bold">{value}</span>
  </div>
);

export default ContestDetails;
