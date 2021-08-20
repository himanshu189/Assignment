
const initialState = {
  userData: {},
  isAuth: false,
  users1:[],
  products:[],

};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN": {
      return {
        ...state,
        userData: payload,
        isAuth: true,
      };
    }
    case "SIGNIN": {
        return {
          ...state,
          users1:[...state.users1,payload]
        
        };
      }
    case "LOGOUT": {
      return {
          ...state,
          userData:{},
          isAuth:false
      }
    }
    case "ADDPRODUCTS": {
      return {
          ...state,
          products:[payload,...state.products]
      }
    }
    case "EDITPRODUCT": {
      return {
          ...state,
          products:payload
      }
    }
    case "CLEAR":{
        return initialState
    }
    default:
      return state;
  }
};

export default rootReducer;
