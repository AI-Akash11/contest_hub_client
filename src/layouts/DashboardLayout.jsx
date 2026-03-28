import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const DashboardLayout = () => {
  const [isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner message="Loading Dashboard..." />;
  }

  return (
    <div className="relative min-h-screen md:flex bg-base-100">
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1  md:ml-64">
        <div className="p-4">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
