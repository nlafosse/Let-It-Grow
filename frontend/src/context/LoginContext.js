import createAppContext from "./createContext";

const initialState = {
  isLoggedin: false,
};

const contextlogin = (dispatch) => {
  return () => {
    dispatch({ type: "Log In" });
  };
};
const contextlogout = (dispatch) => {
  return () => {
    dispatch({ type: "Log Out" });
  };
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "Log In":
      return {
        isLoggedin: true,
      };
    case "Log Out":
      return {
        isLoggedin: false,
      };
  }
};

export const { Context, Provider } = createAppContext(
  loginReducer,
  {
    contextlogin,
    contextlogout,
  },
  { ...initialState }
);
