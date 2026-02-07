import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddContest from "../pages/Dashboard/Creator/AddContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyContests from "../pages/Dashboard/Creator/MyContests";
import { createBrowserRouter } from "react-router";
import AllContests from "../pages/AllContests/AllContests";
import LeaderBoard from "../pages/LeaderBoard/LeaderBoard";
import About from "../pages/About/About";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import EditContest from "../pages/Dashboard/Creator/EditContest";
import SubmittedTasks from "../pages/Dashboard/Creator/SubmittedTasks";
import BecomeCreator from "../pages/Dashboard/User/BecomeCreator";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import MyParticipated from "../pages/Dashboard/User/MyParticipated";
import MyWinnings from "../pages/Dashboard/User/MyWinnings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/all-contests",
        element: <AllContests></AllContests>,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard></LeaderBoard>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // common
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // user
      {
        path: "become-creator",
        element: (
          <PrivateRoute>
            <BecomeCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "my-participated",
        element: (
          <PrivateRoute>
            <MyParticipated />
          </PrivateRoute>
        ),
      },
      {
        path: "my-winnings",
        element: (
          <PrivateRoute>
            <MyWinnings />
          </PrivateRoute>
        ),
      },
      // creator
      {
        path: "add-contest",
        element: (
          <PrivateRoute>
            <AddContest />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-contest/:id",
        element: (
          <PrivateRoute>
            <EditContest></EditContest>
          </PrivateRoute>
        ),
      },
      {
        path: "my-contests",
        element: (
          <PrivateRoute>
            <MyContests />
          </PrivateRoute>
        ),
      },
      {
        path: "submitted-tasks/:id",
        element: (
          <PrivateRoute>
            <SubmittedTasks></SubmittedTasks>
          </PrivateRoute>
        ),
      },
      // admin
      {
        path: "manage-contests",
        element: (
          <PrivateRoute>
            <ManageContests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
