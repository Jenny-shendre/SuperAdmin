import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Table from "./components/Table/Table.jsx";
import Overview from "./components/Overview/Overview.jsx";
import ErrorComp from "./components/ERROR/ErrorComp.jsx";
import Direct_Visitors from "./pages/Direct_Visitors/Direct_Visitors.jsx";
import Channel_Visitors from "./pages/Channel_Visitors/Channel_Visitors.jsx";
import Channel_Partners from "./pages/Channel_Partners/Channel_Partners.jsx";
import Project from "./pages/Project/Project.jsx";
import Team from "./pages/Team/Team.jsx";
import Channel_Partners_Overseas from "./pages/Channel_Partners_Overseas/Channel_Partners_Overseas.jsx";
import FormEdit from "./components/EditForm/EditForm.jsx";
import EditForm1 from "./components/EditForm/EditForm1.jsx";
import EditForm2 from "./components/EditForm/EditForm2.jsx";
import Table6 from "./components/Table/Table6.jsx";
import Table7 from "./components/Table/Table7.jsx";
import OverviewPage from "./components/SalesExecutive/OverviewPage/OverviewPage.jsx";
import Client from "./PagesSalesExecutive/Client.jsx";
import Note from "./PagesSalesExecutive/Note.jsx";
import ClientM from "./PagesSalesManager/ClientM.jsx";
import OverviewMang from "./components/Overview/OverViewMan.jsx";

import LoginTwo from "./ForgotPass/LoginTwo.jsx";
import LoginThree from "./ForgotPass/LoginThree.jsx";
import LoginFour from "./ForgotPass/LoginFour.jsx";
import { PrivateRoute } from "./ForgotPass/PrivateRoute.jsx";
import Table12 from "./components/Table/Team1.2.jsx";

import MyTeam from "./PagesSalesManager/MyTeam.jsx";
import SettingEx from "./components/SettingExecutive/SettingEx.jsx";
import SettingPageAdmin from "./components/SettingAdmin/SettingPageAdmin.jsx";
import overviewID from "./components/Overview/NoteInput.jsx";
import ViewMembers from "./components/Table/ViewMembers.jsx";
import ClientHistory from "./components/Table/MyTeamMan2.jsx";
import IDMan from "./components/EditForm/IDMan.jsx";
import IDSales from "./components/EditForm/IDSales.jsx";
import Setting from "./components/SettingMang/Setting.jsx";

const router = createBrowserRouter([
  //Login_Cred
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComp />,
  },
  {
    path: "/login-two",
    element: <LoginTwo />,
  },

  {
    path: "/login-three",
    element: <LoginThree />,
  },

  {
    path: "/login-four",
    element: <LoginFour />,
  },

  // SuperAdmin
  {
    path: "/SuperAdmin",
    element: <App />,
    errorElement: <ErrorComp />,
    children: [
      {
        path: "",
        element: <PrivateRoute element={Overview} />,
      },
      {
        path: "Direct_Visitors",
        element: <PrivateRoute element={Direct_Visitors} />,
      },
      {
        path: "Channel_Visitors",
        element: <PrivateRoute element={Channel_Visitors} />,
      },
      {
        path: "Channel_Partners",
        element: <PrivateRoute element={Channel_Partners} />,
      },
      {
        path: "Rainbow_overseas/:channelID",
        element: <PrivateRoute element={Channel_Partners_Overseas} />,
      },
      {
        path: "Project",
        element: <PrivateRoute element={Project} />,
      },
      {
        path: "Team",
        element: <PrivateRoute element={Team} />,
      },
      {
        path: "View_Members",
        element: <PrivateRoute element={ViewMembers} />,
      },

      {
        path: "Direct_Visitors/:id",
        element: <PrivateRoute element={FormEdit} />,
      },
      {
        path: "Channel_Visitors/:id",
        element: <PrivateRoute element={EditForm1} />,
      },
      {
        path: "EditForm2/:id",
        element: <PrivateRoute element={EditForm2} />,
      },
      {
        path: "Team/:id",
        element: <PrivateRoute element={Table6} />,
      },
      {
        path: "project/:id",
        element: <PrivateRoute element={Table7} />,
      },
      {
        path: "teamName/:teamName/:employeeId/:name",
        element: <PrivateRoute element={Table12} />,
      },

      {
        path: "SettingAdmin",
        element: <PrivateRoute element={SettingPageAdmin} />,
      },
    ],
  },

  // SalesExecutive
  {
    path: "/SalesExecutive",
    element: <App />,
    errorElement: <ErrorComp />,
    children: [
      {
        path: "/SalesExecutive/",
        element: <PrivateRoute element={OverviewPage} />,
      },
      {
        path: "/SalesExecutive/Client",
        element: <PrivateRoute element={Client} />,
      },
      {
        path: "/SalesExecutive/Notes",
        element: <PrivateRoute element={Note} />,
      },
      {
        path: "/SalesExecutive/Notes/IDHistory/:ClientId",
        element: <PrivateRoute element={IDSales} />,
      },
      {
        path: "/SalesExecutive/SettingEx",
        element: <PrivateRoute element={SettingEx} />,
      },
    ],
  },

  // SalesManager
  {
    path: "/SalesManager",
    element: <App />,
    errorElement: <ErrorComp />,
    children: [
      {
        path: "/SalesManager/",
        element: <PrivateRoute element={OverviewMang} />,
      },
      {
        path: "/SalesManager/Client",
        element: <PrivateRoute element={ClientM} />,
      },
      {
        path: "/SalesManager/My_Team",
        element: <PrivateRoute element={MyTeam} />,
      },
      {
        path: "/SalesManager/clientID",
        element: <PrivateRoute element={overviewID} />,
      },
      {
        path: "/SalesManager/ClientHistory/:employeeId/:name",
        element: <PrivateRoute element={ClientHistory} />,
      },
      {
        path: "/SalesManager/IDMan/:clientid",
        element: <PrivateRoute element={IDMan} />,
      },
      {
        path: "/SalesManager/Setting",
        element: <PrivateRoute element={Setting} />,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
