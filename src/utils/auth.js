import auth0 from "auth0-js";
import history from "./history";

export default class Auth {
  // auth0: property used to initialize Auth0 app
  auth0 = new auth0.WebAuth({
    domain: "webapp1.auth0.com",
    clientID: "",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid profile email",
  });

  // userProfile: empty object that will store user profile data from Auth0
  userProfile = {};

  // login: brings up login widget; allows user to login w/ .authorize() function
  login = () => {
    this.auth0.authorize();
  };

  // handleAuth: saves id and access token from Auth0 into local storage; sets token expiration
  handleAuth = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult) {
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);

        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("expiresAt", expiresAt);

        this.getProfile();
        setTimeout(() => {
          history.replace("/authcheck");
        }, 600);
      } else {
        console.log(err);
      }
    });
  };

  // getAccessToken: retrieves access token from local storage
  getAccessToken = () => {
    if (localStorage.getItem("access_token")) {
      const accessToken = localStorage.getItem("access_token");
      return accessToken;
    } else {
      return null;
    }
  };

  // getProfile: parses access token to extract user profile data
  getProfile = () => {
    let accessToken = this.getAccessToken();
    if (accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = { profile };
        }
      });
    }
  };

  // logout: logs out user; removes acces token from local storage
  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expiresAt");
    setTimeout(() => {
      history.replace("/authcheck");
    }, 200);
  };

  // isAuthenticated: checks if user is logged in by comparing token expiration w/ current time
  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
    return new Date().getTime() < expiresAt;
  };
}
