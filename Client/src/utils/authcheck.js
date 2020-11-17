import React, { useEffect, useContext, Profiler } from "react";
import history from "./history";
import Context from "./context";
import * as ACTIONS from "../store/actions/actions";

import axios from "axios";

// Utilize useEffect to update authentication state

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      // Checkes if access tokens in local storage haven't expired and user is still logged in
      const profile = context.authObj.userProfile;
      context.handleUserLogin();
      context.handleUserAddProfile(profile);
      axios
        .post("/api/posts/userprofiletodb", profile)
        .then(
          axios.get("/api/get/userprofilefromdb", {
            params: { email: Profiler.profile.email },
          })
        )
        .then((res) => context.handleAddDBProfile(res.data))
        .then(history.replace("/"));
    } else {
      context.handleUserLogout();
      context.handleUserRemoveProfile();
      history.replace("/");
    }
  }, [context.authObj.userProfile, context]);

  return <div></div>;
};

export default AuthCheck;
