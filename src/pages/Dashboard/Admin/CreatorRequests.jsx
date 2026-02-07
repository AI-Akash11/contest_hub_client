import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import Swal from "sweetalert2";

const CreatorRequests = () => {
  const axiosSecure = useAxiosSecure();

  //   get query
  const {
    data: requests = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["creator-requests"],
    queryFn: async () => {
      const res = await axiosSecure("/creator-requests");
      return res.data;
    },
  });

  //   approve mutation
  const { mutateAsync: approveCreator } = useMutation({
    mutationFn: async (email) => {
      return axiosSecure.patch(`/creator-requests/approve/${email}`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  // delete mutation
  const { mutateAsync: deleteRequest } = useMutation({
    mutationFn: async (email) => {
      return axiosSecure.delete(`/creator-requests/delete/${email}`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleApprove = async (email) => {
    const result = await Swal.fire({
      title: "Approve creator?",
      text: "This user will be able to create contests.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      await approveCreator(email);
      Swal.fire("Approved!", "User is now a creator.", "success");
    }
  };

  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Reject request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      await deleteRequest(email);
      Swal.fire("Deleted!", "Request has been removed.", "success");
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className="bg-base-200 rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">
          Creator <span className="gradient-text">Requests</span>
        </h2>
        <p className="text-base-content/70">
          Review and manage requests from users who want to become contest
          creators.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-base-content/10 bg-base-100">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-base-200">
            <tr>
              <th className="text-left text-sm font-semibold">User Email</th>
              <th className="text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {/* Row */}
            {requests.map((req) => (
              <tr key={req?._id} className="hover:bg-base-200/50 transition">
                <td className="text-sm font-medium">{req.email}</td>

                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleApprove(req.email)}
                      className="px-4 py-2 text-sm rounded-lg bg-success text-success-content font-semibold hover:bg-success/90 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleDelete(req.email)}
                      className="px-4 py-2 text-sm rounded-lg bg-error text-error-content font-semibold hover:bg-error/90 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="2"
                  className="text-center py-10 text-base-content/60"
                >
                  No creator requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorRequests;
