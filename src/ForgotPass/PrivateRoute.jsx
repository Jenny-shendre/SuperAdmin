import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/TokenUtils";
import React from "react";

// export function PrivateRoute(props){
//     console.log(isAuthenticated());
//     if (isAuthenticated()) {
//         return props.children;
//     } else {
//        return <Navigate to="/login"></Navigate>
//     }
// }

// export const PrivateRoute = ({ element: Element }) => {
//     return isAuthenticated() ? <Element/> : <Navigate to="/" />;
// };

export const PrivateRoute = ({ element: Element }) => {
  if (isAuthenticated()) {
    return <Element />;
  } else {
    return <Navigate to="/" />;
  }
};
