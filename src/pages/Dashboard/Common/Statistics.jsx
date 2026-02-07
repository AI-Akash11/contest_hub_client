import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import CreatorStatistics from "../../../components/Dashboard/Statistics/CreatorStatistics";
import UserStatistics from "../../../components/Dashboard/Statistics/UserStatistics";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";
const Statistics = () => {
  const [role, isRoleLoading] = useRole();
  if(isRoleLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div>
      {role === "admin" && <AdminStatistics />}
      {role === "creator" && <CreatorStatistics />}
      {role === "user" && <UserStatistics />}
    </div>
  );
};

export default Statistics;
