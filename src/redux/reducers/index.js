import { combineReducers } from "redux";
import helperReducer from "./helper.reducers";
import authReducer from "./auth.reducers";
import signupReducers from "./signup.reducers";
import categoryReducers from "./category.reducers";
import postingReducers from "./posting.reducers";
import bannerReducers from "./banner.reducers";
import jobsReducers from "./jobs.reducers";
import applicationsReducers from "./applications.reducers";
import profileReducers from "./profile.reducers";
import searchReducers from "./search.reducers";
import paymentReducers from "./payment.reducers";
import messageReducers from "./message.reducers";

const rootReducer = combineReducers({
  helper: helperReducer,
  auth: authReducer,
  signup: signupReducers,
  category: categoryReducers,
  postings: postingReducers,
  banner: bannerReducers,
  jobs: jobsReducers,
  application: applicationsReducers,
  profile: profileReducers,
  search: searchReducers,
  payment: paymentReducers,
  message: messageReducers,
});

export default rootReducer;
