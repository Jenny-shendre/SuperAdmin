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
import OverviewEX from "./components/Overview/OverViewEX.jsx";
import ClientM from "./PagesSalesManager/ClientM.jsx";
import NotesM from "./PagesSalesManager/NoteM.jsx";
import OverviewMang from "./components/Overview/OverViewMan.jsx";

import LoginTwo from "./ForgotPass/LoginTwo.jsx";
import LoginThree from "./ForgotPass/LoginThree.jsx";
import LoginFour from "./ForgotPass/LoginFour.jsx";

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
      { path: "/SuperAdmin", element: <Overview /> },
      { path: "/SuperAdmin/Direct_Visitors", element: <Direct_Visitors /> },
      { path: "/SuperAdmin/Channel_Visitors", element: <Channel_Visitors /> },
      { path: "/SuperAdmin/Channel_Partners", element: <Channel_Partners /> },
      { path: "/SuperAdmin/overseas", element: <Channel_Partners_Overseas /> },
      { path: "/SuperAdmin/Project", element: <Project /> },
      { path: "/SuperAdmin/Team", element: <Team /> },
      { path: "/SuperAdmin/Direct_Visitors/:id", element: <FormEdit /> },
      { path: "/SuperAdmin/Channel_Visitors/:id", element: <EditForm1 /> },
      { path: "/SuperAdmin/EditForm2/:id", element: <EditForm2 /> },
      { path: "/SuperAdmin/Team/:id", element: <Table6 /> },
      { path: "/SuperAdmin/project/:id", element: <Table7 /> },
    ],
  },

  // SalesExecutive
  {
    path: "/SalesExecutive",
    element: <App />,
    errorElement: <ErrorComp />,
    children: [
      { path: "/SalesExecutive/", element: <OverviewPage /> },
      { path: "/SalesExecutive/Client", element: <Client /> },
      { path: "/SalesExecutive/Notes", element: <Note /> },
    ],
  },

  // SalesManager
  {
    path: "/SalesManager",
    element: <App />,
    errorElement: <ErrorComp />,
    children: [
      { path: "/SalesManager/", element: <OverviewMang /> },
      { path: "/SalesManager/Client", element: <ClientM /> },
      { path: "/SalesManager/My_Team", element: <NotesM /> },
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
