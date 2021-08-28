import React from "react";
import { Auth } from "aws-amplify";
import Amplify from "@aws-amplify/core";
import { awsconfig } from "../aws-exports";

import SigninForm from "../pages/Singin";
import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducer from "../Reducer";

import { setUserInfo } from "../actions/UserInfo";

import { useSelector } from 'react-redux';


const store = createStore(appReducer);

Amplify.configure(awsconfig);

const AuthStateApp: React.FC = ({ children }) => {
  // const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object>();
  // const [reloadSetUserInfo, setReloadSetUserInfo] = React.useState(false);

  const unsubscribe = store.subscribe(() => {
    setUser(store.getState().setter.value);
  });

  React.useEffect(() => {
    if (!user) {
      Auth.currentAuthenticatedUser().then((authData) => {
        store.dispatch(setUserInfo(authData));
        setUserInfo(authData);
      });
    }
    return () => {
      unsubscribe();
    };
  }, []);

  return user?.username ? (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  ) : (
    <Provider store={store}>
        <SigninForm />
    </Provider>
  );
};

export const useAuth =  () => {
  const user = useSelector((state) => state.setter.value);
  const idToken = user.signInUserSession.idToken.jwtToken;
  return {idToken}
}

export const refreshToken = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    store.dispatch(setUserInfo(user));
    return user.idToken.jwtToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default AuthStateApp;
