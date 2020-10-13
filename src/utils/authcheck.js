import React, { useEffect, useContext } from "react";
import history from "./history";
import Context from "./context";
import * as ACTIONS from "../store/actions/actions";

// Utilize useEffect to update authentication state

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      // Checkes if access tokens in local storage haven't expired and user is still logged in
      context.handleUserLogin();
      context.handleUserAddProfile(context.authObj.userProfile);
      history.replace("/");
    } else {
      context.handleUserLogout();
      context.handleUserRemoveProfile(context.authObj.userProfile);
      history.replace("/");
    }
  }, []);

  return <div></div>;
};

export default AuthCheck;
