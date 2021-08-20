export const SigninAction = (value) => (dispatch) => {
    // console.log("Add Permission");
    dispatch({ type: "SIGNIN", payload: value });
  };

  export const LoginAction = (value) => (dispatch) => {
    // console.log("Add Permission");
    dispatch({ type: "LOGIN", payload: value });
  };