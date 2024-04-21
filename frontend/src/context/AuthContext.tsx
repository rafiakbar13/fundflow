import { createContext, useEffect, useReducer } from "react";

interface AuthState {
  user: any;
  token: string | null;
  dispatch?: any;
}

const initialState: AuthState = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  token: localStorage.getItem("token") || null,
};

export const authContext = createContext(initialState);

const authReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
