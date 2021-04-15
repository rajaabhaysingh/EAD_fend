import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core";

import netRating from "../../helpers/netRating";
import totalRating from "../../helpers/totalRatings";
import calculatePercentage from "../../helpers/calcPerc";

const useStyles = makeStyles((theme) => ({
  root: {},
  revBox: {
    display: "flex",
    alignItems: "center",
    flex: "1",
  },
  fullWidth: {
    display: "flex",
    flex: "1",
  },
  minWidth: {
    minWidth: "140px",
    fontSize: "0.85rem",
  },
  netRating: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
  progBase: {
    display: "flex",
    flex: "1",
    height: "8px",
    borderRadius: "20px",
    background: theme.palette.background.paperLight,
  },
  progBar: {
    position: "absolute",
    top: "0",
    left: "0",
    borderRadius: "8px",
    height: "8px",
    background: theme.palette.primary.main,
  },
  warnCol: {
    color: theme.palette.warning.main,
  },
  priCol: {
    color: theme.palette.primary.main,
  },
}));

const Ratings = ({ ratings }) => {
  const classes = useStyles();

  const nettRating = netRating(ratings);
  const totRatings = totalRating(ratings);

  // renderStars
  const renderStars = (rating) => {
    const intPart = parseInt(rating);
    let decPart = rating - intPart;
    decPart = decPart < 0.25 ? 0 : decPart < 0.95 ? 1 : 2;

    const tempJsxArray = [];

    for (let i = 0; i < intPart; i++) {
      tempJsxArray.push(<i key={i} className="fas fa-star"></i>);
    }

    if (tempJsxArray.length === 5) {
      return tempJsxArray;
    }

    switch (decPart) {
      case 0:
        tempJsxArray.push(
          <i key={decPart + "decPart"} className="far fa-star"></i>
        );
        break;

      case 1:
        tempJsxArray.push(
          <i key={decPart + "decPart"} className="fas fa-star-half-alt"></i>
        );
        break;

      case 2:
        tempJsxArray.push(
          <i key={decPart + "decPart"} className="fas fa-star"></i>
        );
        break;

      default:
        tempJsxArray.push(
          <i key={decPart + "decPart"} className="far fa-star"></i>
        );
        break;
    }

    for (let i = tempJsxArray.length; i < 5; i++) {
      tempJsxArray.push(<i key={i + "trailing"} className="far fa-star"></i>);
    }

    return tempJsxArray;
  };

  // renderProgressBar
  const renderProgressBar = (val) => {
    return (
      <div className="rel f1  mar_l-12 mar_r-12">
        <div className={classes.progBase}></div>
        <div className={clsx(classes.progBar)} style={{ width: val }}></div>
      </div>
    );
  };

  // renderIndividualRatings
  const renderIndividualRatings = () => {
    const relPercArray = [];
    const maxPerc = Math.max(
      ratings.fiveStar,
      ratings.fourStar,
      ratings.threeStar,
      ratings.twoStar,
      ratings.oneStar
    );

    relPercArray.push(calculatePercentage(ratings.fiveStar, maxPerc));
    relPercArray.push(calculatePercentage(ratings.fourStar, maxPerc));
    relPercArray.push(calculatePercentage(ratings.threeStar, maxPerc));
    relPercArray.push(calculatePercentage(ratings.twoStar, maxPerc));
    relPercArray.push(calculatePercentage(ratings.oneStar, maxPerc));

    const percArray = [];
    percArray.push(calculatePercentage(ratings.fiveStar, totRatings));
    percArray.push(calculatePercentage(ratings.fourStar, totRatings));
    percArray.push(calculatePercentage(ratings.threeStar, totRatings));
    percArray.push(calculatePercentage(ratings.twoStar, totRatings));
    percArray.push(calculatePercentage(ratings.oneStar, totRatings));

    return (
      <>
        <div className="fc mar_t-4">
          {renderProgressBar(relPercArray[0])}
          <div className={classes.minWidth}>
            <span className={classes.warnCol}>{renderStars(5)}</span>{" "}
            <span className={classes.priCol}>{percArray[0]}</span>
          </div>
        </div>
        <div className="fc mar_t-4">
          {renderProgressBar(relPercArray[1])}
          <div className={classes.minWidth}>
            <span className={classes.warnCol}>{renderStars(4)}</span>{" "}
            <span className={classes.priCol}>{percArray[1]}</span>
          </div>
        </div>
        <div className="fc mar_t-4">
          {renderProgressBar(relPercArray[2])}
          <div className={classes.minWidth}>
            <span className={classes.warnCol}>{renderStars(3)}</span>{" "}
            <span className={classes.priCol}>{percArray[2]}</span>
          </div>
        </div>
        <div className="fc mar_t-4">
          {renderProgressBar(relPercArray[3])}
          <div className={classes.minWidth}>
            <span className={classes.warnCol}>{renderStars(2)}</span>{" "}
            <span className={classes.priCol}>{percArray[3]}</span>
          </div>
        </div>
        <div className="fc mar_t-4">
          {renderProgressBar(relPercArray[4])}
          <div className={classes.minWidth}>
            <span className={classes.warnCol}>{renderStars(1)}</span>{" "}
            <span className={classes.priCol}>{percArray[4]}</span>
          </div>
        </div>
      </>
    );
  };

  return ratings ? (
    <div className="fcol mar_t-48">
      <div className="fsxl fwb mar_b-16">Ratings {"&"} reviews</div>
      <div className={classes.revBox}>
        <div className={clsx(classes.warnCol, "fccc")}>
          <div className={classes.netRating}>{nettRating}</div>
          <div className="fc">{renderStars(nettRating)}</div>
          <div className="fc fsm mar_t-8">{totRatings} Ratings</div>
        </div>
        <div className="fcol f1">{renderIndividualRatings()}</div>
      </div>
    </div>
  ) : null;
};

export default Ratings;
