import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import ReactStarsRating from "react-awesome-stars-rating";

// keys
import { baseUrl } from "../../../config";

import useGlobalStyles from "../../../styles/globalStyles";

// styling
import { Button, makeStyles } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

// components
import Review from "../../../components/review";
import { Alert, AlertTitle } from "@material-ui/lab";

// misc
import { generateName } from "../../../helpers/misc";
import getInitials from "../../../helpers/getInitials";

// redux
import { useSelector, useDispatch } from "react-redux";
import { addReview } from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  btn: {
    maxWidth: "200px",
  },
  revBtn: {
    alignSelf: "center",
  },
  avatar: {
    marginRight: "16px",
  },
  cancelBtn: {
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
  },
}));

const Reviews = ({ reviews, jobId }) => {
  const globalCls = useGlobalStyles();
  const cls = useStyles();
  const auth = useSelector((state) => state.auth);
  const jobs = useSelector((state) => state.jobs);
  const history = useHistory();
  const dispatch = useDispatch();

  // local state management
  const [isReviewFormVisible, setIsReviewFormVisible] = React.useState(false);
  const [reviewForm, setReviewForm] = React.useState({
    review: "",
    star: undefined,
    jobId: jobId,
  });

  // handleChange
  const handleChange = (e, label, type) => {
    if (type === "text") {
      setReviewForm({
        ...reviewForm,
        [label]: e.target.value,
      });
    } else if (type === "star") {
      setReviewForm({
        ...reviewForm,
        [label]: e,
      });
    } else {
      setReviewForm({
        ...reviewForm,
        [label]: e.target.value,
      });
    }
  };

  // handleAddReview
  const handleAddReview = (e) => {
    e.preventDefault();

    console.log(reviewForm);
    dispatch(
      addReview(reviewForm, jobId, setReviewForm, setIsReviewFormVisible)
    );
  };

  return (
    <div className="fcol">
      {isReviewFormVisible ? (
        auth.user ? (
          <form className="f1 mar_t-32" onSubmit={handleAddReview}>
            <Avatar
              className={cls.avatar}
              src={baseUrl + auth.user?.profilePicture}
            >
              {getInitials(
                generateName(
                  auth.user?.firstName,
                  auth.user?.middleName,
                  auth.user?.lastName
                )
              )}
            </Avatar>
            <div className="fcol f1 no-decor">
              <ReactStarsRating
                onChange={(e) => handleChange(e, "star", "star")}
                value={reviewForm.star}
                isHalf={false}
              />
              <textarea
                className={clsx(globalCls.textInput, "w-100 mar_t-8")}
                type="text"
                placeholder="Type your review here..."
                value={reviewForm.review}
                onChange={(e) => handleChange(e, "review", "text")}
              />
              {jobs.addReviewError && jobs.addReviewContextId === jobId && (
                <Alert severity="error" className="f1 mar_t-16">
                  {jobs.addReviewError}
                </Alert>
              )}
              <div className="fend mar_t-16">
                <Button
                  className={clsx(cls.cancelBtn)}
                  variant="outlined"
                  size="small"
                  type="button"
                  onClick={() => setIsReviewFormVisible(false)}
                >
                  CANCEL
                </Button>
                <Button
                  className={clsx(cls.revBtn, globalCls.marL8)}
                  color="primary"
                  variant="contained"
                  size="small"
                  type="submit"
                  disabled={jobs.addReviewLoading}
                >
                  POST REVIEW
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <Button
            className={clsx(globalCls.marT32, cls.revBtn)}
            color="primary"
            variant="contained"
            size="small"
            onClick={() => history.push("/login?target=")}
          >
            LOGIN TO REVIEW
          </Button>
        )
      ) : (
        <Button
          className={clsx(globalCls.marT32, cls.revBtn)}
          color="primary"
          variant="contained"
          size="small"
          onClick={() => setIsReviewFormVisible(true)}
        >
          POST REVIEW FOR THIS JOB
        </Button>
      )}
      {reviews?.length > 0 ? (
        <div className="fcol">
          {reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <Alert className="f1 mar_t-48" severity="warning">
          <AlertTitle>NO REVIEWS AVAILABLE</AlertTitle>
          No reviews available for this job.
        </Alert>
      )}
      {reviews?.length >= 3 ? (
        <Button
          className={clsx(globalCls.rounded, globalCls.marT32, cls.btn)}
          color="primary"
        >
          See all reviews
        </Button>
      ) : null}
    </div>
  );
};

export default Reviews;
