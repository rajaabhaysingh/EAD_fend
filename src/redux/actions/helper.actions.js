import { helperConstants } from "./constants";

// themeAction
export const themeAction = (themeName) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.THEME_CHANGE_REQUEST,
      payload: {
        themeName,
      },
    });
  };
};

// fetchLocation
// export const fetchLocation = (formdata) => {
//   return async (dispatch) => {
//     dispatch({
//       type: signupConstants.SIGNUP_REQUEST,
//     });

//     await axiosIntance
//       .post("/api/signup", formdata)
//       .then((res) => {
//         if (res.status === 201) {
//           const { data } = res.data;
//           dispatch({
//             type: signupConstants.SIGNUP_SUCCESS,
//             payload: {
//               data,
//             },
//           });
//         } else {
//           if (res.status === 400) {
//             dispatch({
//               type: signupConstants.SIGNUP_FAILURE,
//               payload: {
//                 error: "Unexpected error occured. [code: arreacau]",
//               },
//             });
//           }
//         }
//       })
//       .catch((err) => {
//         dispatch({
//           type: signupConstants.SIGNUP_FAILURE,
//           payload: {
//             error:
//               typeof err.response?.data?.error !== "object"
//                 ? err.response?.data?.error
//                 : err.response?.data?.error?.message ||
//                   err.message ||
//                   "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
//           },
//         });
//       });
//   };
// };
