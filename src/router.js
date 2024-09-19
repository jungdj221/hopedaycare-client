import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import BusManagement from "./page/BusManagement";
import Homepage from "./page/Homepage";
import ScheduleManagement from "./page/ScheduleManagement";
import UserManagement from "./page/UserManagement";
import Error from "./page/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "bus-management", element: <BusManagement /> },
      { path: "schedule-management", element: <ScheduleManagement /> },
    ],
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

export default router;
