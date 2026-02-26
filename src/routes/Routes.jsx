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
import CreatorRequests from "../pages/Dashboard/Admin/CreatorRequests";
import CreatorRoute from "./CreatorRoute";
import AdminRoute from "./AdminRoute";
import InDevelopment from "../components/Shared/InDevelopment/InDevelopment";
import UpdateProfile from "../pages/Dashboard/Common/UpdateProfile";
import Accessibility from "../pages/StaticPages/Accessibility";
import Careers from "../pages/StaticPages/Careers";
import ContactUs from "../pages/StaticPages/ContactUs";
import ContestGuidelines from "../pages/StaticPages/ContestGuidelines";
import CookiePolicy from "../pages/StaticPages/CookiePolicy";
import FAQ from "../pages/StaticPages/FAQ";
import HelpCenter from "../pages/StaticPages/HelpCenter";
import PrivacyPolicy from "../pages/StaticPages/PrivacyPolicy";
import RefundPolicy from "../pages/StaticPages/RefundPolicy";
import Sitemap from "../pages/StaticPages/Sitemap";
import TermsOfService from "../pages/StaticPages/TermsOfService";

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
      {
        path: "/coming-soon",
        element: <InDevelopment />,
      },
      {
        path: "/accessibility",
        Component: Accessibility
      },
      {
        path: "/careers",
        Component: Careers
      },
      {
        path: "/contact-us",
        Component: ContactUs
      },
      {
        path: "/contest-guidelines",
        Component: ContestGuidelines
      },
      {
        path: "/cookie-policy",
        Component: CookiePolicy
      },
      {
        path: "/faq",
        Component: FAQ
      },
      {
        path: "/help-center",
        Component: HelpCenter
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy
      },
      {
        path: "/refund-policy",
        Component: RefundPolicy
      },
      {
        path: "/sitemap",
        Component: Sitemap
      },
      {
        path: "/terms-of-service",
        Component: TermsOfService
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
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        )
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
            <CreatorRoute>
              <AddContest />
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-contest/:id",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <EditContest></EditContest>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-contests",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <MyContests />
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "submitted-tasks/:id",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <SubmittedTasks></SubmittedTasks>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      // admin
      {
        path: "creator-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <CreatorRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageContests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
