import { jobsConstants } from "../actions/constants";

const initialState = {
  getHomeLocalJobsData: [],
  getHomeLocalJobsLoading: false,
  getHomeLocalJobsSuccess: false,
  getHomeLocalJobsError: null,
  // get job by id for public and private access both
  getJobByIdData: {},
  getJobByIdLoading: false,
  getJobByIdSuccess: false,
  getJobByIdError: null,
  // application data
  applicationData: {
    acceptedApp: [],
    pendingApp: [],
  },
  // application status on my postings
  changeAppStatusData: null,
  changeAppStatusLoading: false,
  changeAppStatusSuccess: false,
  changeAppStatusError: null,
  changeAppStatusErrorContextId: null,
  // apply on job
  applyOnJobData: null,
  applyOnJobLoading: false,
  applyOnJobSuccess: false,
  applyOnJobError: null,
  applyOnJobContextId: null,
  // review addition
  addReviewLoading: false,
  addReviewSuccess: false,
  addReviewError: null,
  addReviewContextId: null,
};

// addReview
const addReview = (oldJobData, responseData) => {
  let tempJobData = { ...oldJobData };
  let tempReviews = [responseData.review, ...tempJobData.reviews];

  tempJobData.ratings = responseData.updatedJobRatings;
  tempJobData.reviews = tempReviews;

  return tempJobData;
};

// filterApplication
const filterApplication = (jobData) => {
  if (jobData?.applications?.length > 0) {
    const acceptedApp = [];
    const pendingApp = [];

    for (const application of jobData.applications) {
      if (application.status === "accepted") {
        acceptedApp.push(application);
      } else {
        pendingApp.push(application);
      }
    }

    acceptedApp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    pendingApp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      acceptedApp: acceptedApp,
      pendingApp: pendingApp,
    };
  } else {
    return {
      acceptedApp: [],
      pendingApp: [],
    };
  }
};

// filterChangeApplication
const filterChangeApplication = (oldApplicationData, updatedApplication) => {
  if (updatedApplication) {
    // copy both accepted and pending to temp array
    let updatedList = [];

    for (const app of oldApplicationData.pendingApp) {
      updatedList.push(app);
    }

    for (const app of oldApplicationData.acceptedApp) {
      updatedList.push(app);
    }

    // first remove application from oldList
    let index = null;
    for (let i = 0; i < updatedList.length; i++) {
      if (updatedList[i]._id === updatedApplication._id) {
        // making index = i+1, because if i===0, it evaluates to false
        index = i + 1;
        break;
      }
    }

    if (index) {
      // using index-1 to splice (see reason just above)
      updatedList.splice(index - 1, 1);
    }

    // append new application to list if it was not rejected
    if (updatedApplication.status !== "rejected") {
      updatedList.push(updatedApplication);
    }

    // making like filterApplication() arguement
    const tempJobData = {
      applications: updatedList,
    };

    return filterApplication(tempJobData);
  } else {
    return {
      acceptedApp: [],
      pendingApp: [],
    };
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case jobsConstants.GET_HOME_LOCAL_JOBS_REQUEST:
      state = {
        ...state,
        getHomeLocalJobsLoading: true,
        getHomeLocalJobsError: null,
      };
      break;

    case jobsConstants.GET_HOME_LOCAL_JOBS_SUCCESS:
      state = {
        ...state,
        getHomeLocalJobsData: action.payload.data,
        getHomeLocalJobsLoading: false,
        getHomeLocalJobsSuccess: true,
        getHomeLocalJobsError: null,
      };
      break;

    case jobsConstants.GET_HOME_LOCAL_JOBS_FAILURE:
      state = {
        ...state,
        getHomeLocalJobsData: [],
        getHomeLocalJobsLoading: false,
        getHomeLocalJobsSuccess: false,
        getHomeLocalJobsError: action.payload.error,
      };
      break;

    case jobsConstants.GET_JOB_BY_ID_REQUEST:
      state = {
        ...state,
        getJobByIdLoading: true,
        getJobByIdError: null,
      };
      break;

    case jobsConstants.GET_JOB_BY_ID_SUCCESS:
      state = {
        ...state,
        getJobByIdData: action.payload.data,
        applicationData: filterApplication(action.payload.data),
        getJobByIdLoading: false,
        getJobByIdSuccess: true,
        getJobByIdError: null,
      };
      break;

    case jobsConstants.GET_JOB_BY_ID_FAILURE:
      state = {
        ...state,
        getJobByIdData: [],
        applicationData: {
          acceptedApp: [],
          pendingApp: [],
        },
        getJobByIdLoading: false,
        getJobByIdSuccess: false,
        getJobByIdError: action.payload.error,
      };
      break;

    case jobsConstants.CHANGE_APP_STATUS_REQUEST:
      state = {
        ...state,
        changeAppStatusLoading: true,
        changeAppStatusError: null,
      };
      break;

    case jobsConstants.CHANGE_APP_STATUS_SUCCESS:
      state = {
        ...state,
        applicationData: filterChangeApplication(
          state.applicationData,
          action.payload.data
        ),
        changeAppStatusLoading: false,
        changeAppStatusSuccess: true,
        changeAppStatusError: null,
      };
      break;

    case jobsConstants.CHANGE_APP_STATUS_FAILURE:
      state = {
        ...state,
        changeAppStatusLoading: false,
        changeAppStatusSuccess: false,
        changeAppStatusError: action.payload.error,
        changeAppStatusErrorContextId: action.payload.contextId,
      };
      break;

    case jobsConstants.APPLY_ON_JOB_REQUEST:
      state = {
        ...state,
        applyOnJobLoading: true,
        applyOnJobError: null,
        applyOnJobContextId: action.payload.contextId,
      };
      break;

    case jobsConstants.APPLY_ON_JOB_SUCCESS:
      state = {
        ...state,
        applyOnJobData: action.payload.data,
        applyOnJobLoading: false,
        applyOnJobSuccess: true,
        applyOnJobError: null,
        applyOnJobContextId: action.payload.contextId,
      };
      break;

    case jobsConstants.APPLY_ON_JOB_FAILURE:
      state = {
        ...state,
        applyOnJobData: null,
        applyOnJobLoading: false,
        applyOnJobSuccess: false,
        applyOnJobError: action.payload.error,
        applyOnJobContextId: action.payload.contextId,
      };
      break;

    case jobsConstants.ADD_REVIEW_REQUEST:
      state = {
        ...state,
        addReviewLoading: true,
        addReviewError: null,
        addReviewContextId: action.payload.contextId,
      };
      break;

    case jobsConstants.ADD_REVIEW_SUCCESS:
      state = {
        ...state,
        getJobByIdData: addReview(state.getJobByIdData, action.payload.data),
        addReviewLoading: false,
        addReviewSuccess: true,
        addReviewError: null,
        addReviewContextId: action.payload.contextId,
      };
      break;

    case jobsConstants.ADD_REVIEW_FAILURE:
      state = {
        ...state,
        addReviewLoading: false,
        addReviewSuccess: false,
        addReviewError: action.payload.error,
        addReviewContextId: action.payload.contextId,
      };
      break;

    default:
      break;
  }

  return state;
};
