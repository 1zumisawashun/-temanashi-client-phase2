import { createContext, useReducer, useEffect } from "react";
import { firebase, projectAuth } from "../firebase/config";

interface Action {
  type: string;
  payload: firebase.User | null;
}
interface State {
  user: firebase.User | null;
  authIsReady?: boolean;
}
interface ContextInterface {
  dispatch: (value: Action) => void; // dispatch: React.Dispatch<Action>;
  user: firebase.User | null;
  authIsReady?: boolean;
}

export const AuthContext = createContext<ContextInterface | undefined>(
  undefined
);

export const authReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider: React.VFC<
  React.PropsWithChildren<React.ReactNode>
> = (props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      if (!user) return;
      dispatch({
        type: "AUTH_IS_READY",
        payload: user,
      });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
