import { combineReducers } from "redux";
import helperReducer from "./helper.reducers";
import authReducer from "./auth.reducers";
import signupReducers from "./signup.reducers";
import categoryReducers from "./category.reducers";
import ordersReducers from "./orders.reducers";
import bannerReducers from "./banner.reducers";

const rootReducer = combineReducers({
  helper: helperReducer,
  auth: authReducer,
  signup: signupReducers,
  category: categoryReducers,
  order: ordersReducers,
  banner: bannerReducers,
});

export default rootReducer;
