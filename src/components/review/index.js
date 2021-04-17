import React from "react";
import clsx from "clsx";
import { generateName, timeAgo } from "../../helpers/misc";

import getInitials from "../../helpers/getInitials";

import { Avatar, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: "16px",
  },
  priCol: {
    color: theme.palette.primary.main,
  },
}));

const Review = ({ review }) => {
  const classes = useStyles();
  const globalCls = useGlobalStyles();

  // renderStars
  const renderStars = (num) => {
    const tempJsxArray = [];

    for (let i = 0; i < num; i++) {
      tempJsxArray.push(<i key={i} className="fas fa-star"></i>);
    }

    for (let i = tempJsxArray.length; i < 5; i++) {
      tempJsxArray.push(<i key={i} className="far fa-star"></i>);
    }

    return tempJsxArray;
  };

  return (
    <div className="f mar_t-64">
      <Avatar
        className={classes.avatar}
        src={baseUrl + review.user?.profilePicture}
      >
        {getInitials(
          generateName(
            review.user?.firstName,
            review.user?.middleName,
            review.user?.lastName
          )
        )}
      </Avatar>
      <div className="fcol">
        <div className="fc">
          <div className={clsx(globalCls.txtMdPri, "fwb")}>
            {generateName(
              review.user?.firstName,
              review.user?.middleName,
              review.user?.lastName
            )}
          </div>
          <div className={clsx("fc fss mar_l-8", classes.priCol)}>
            {renderStars(review.star)}
          </div>
        </div>
        <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
          {timeAgo(review.createdAt)}
        </div>
        <div className={clsx(globalCls.txtSmPri, "mar_t-8")}>
          {review.review}
        </div>
        <div className="fc fss mar_t-12">
          <div className="fc">
            <i className="far fa-thumbs-up mar_r-4"></i>{" "}
            {review.helpfulCount ? review.helpfulCount : ""} Helpful
          </div>
          <div className="fc mar_l-16">
            <i className="fas fa-exclamation-circle mar_r-4"></i> Report
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
