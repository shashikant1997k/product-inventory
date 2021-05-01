let userDetails = localStorage.getItem("userDetails");
let tkn = localStorage.getItem("authToken");
let prodList = localStorage.getItem("productList");

export const initialState = {
  user:
    userDetails !== null && JSON.parse(userDetails)
      ? JSON.parse(userDetails)
      : null,
  token: tkn !== null ? tkn : null,
  productList:
    prodList !== null && JSON.parse(prodList).length > 0
      ? JSON.parse(prodList)
      : [],
  openModal: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  USER_LOGOUT: "USER_LOGOUT",
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  OPEN_MODAL: "OPEN_MODAL",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.data.userDetails,
        token: action.data.token,
      };
    case actionTypes.USER_LOGOUT:
      localStorage.clear();
      return {};

    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        productList: [...state.productList, action.item],
      };

    case actionTypes.EDIT_PRODUCT:
      state.productList[action.id] = action.item;
      return {
        ...state,
        productList: [...state.productList],
      };
    case actionTypes.DELETE_PRODUCT:
      let temp = state.productList.filter((v, i) => i !== action.id);
      return {
        ...state,
        productList: [...temp],
      };
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        openModal: action.open,
        id: action.id,
      };

    default:
      return state;
  }
};

export default rootReducer;
