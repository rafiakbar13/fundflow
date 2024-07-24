import { timeStamp } from "console";
import { createContext, useEffect, useReducer } from "react";

interface AuthState {
  user: any;
  token: string | null;
  loginDate: string | null;
  dispatch?: any;
}

const initialState: AuthState = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  token: localStorage.getItem("token") || null,
  loginDate: localStorage.getItem("loginDate") || null,
};

export const authContext = createContext(initialState);

const authReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        loginDate: new Date().toISOString(),
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        loginDate: null,
      };
    default:
      return state;
  }
};

console.log(initialState);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("loginDate", state.loginDate || "");
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loginDate: state.loginDate,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
