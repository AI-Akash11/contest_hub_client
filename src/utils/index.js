import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData,
  );
  return data?.data?.display_url;
};

export const getContestStatus = (deadline) => {
  const now = new Date();
  const endDate = new Date(deadline);
  const timeDiff = endDate - now;

  if (timeDiff <= 0) {
    return { ended: true, display: "Ended" };
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return {
      ended: false,
      display: `${days}d ${hours}h left`,
    };
  } else if (hours > 0) {
    return {
      ended: false,
      display: `${hours}h ${minutes}m left`,
    };
  } else {
    return {
      ended: false,
      display: `${minutes}m left`,
    };
  }
};

export const formatDeadline = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData,
  );

  return data;
};
