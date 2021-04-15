import React from "react";

// styling
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
  ratingTxt: {
    color: theme.palette.primary.main,
    fontSize: "0.7rem",
  },
}));

const RenderStars = ({ numOfStar }) => {
  const cls = useStyles();

  // renderStars
  const renderStars = (stars) => {
    const rating = parseFloat(stars);
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

  return numOfStar === "N/A" ? (
    <div className={cls.ratingTxt}>Rating unavailable</div>
  ) : (
    renderStars(numOfStar)
  );
};

export default RenderStars;
