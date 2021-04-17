import React from "react";
import clsx from "clsx";
import netRating from "../../../helpers/netRating";

// components
import Loader from "../../../components/loader";
import RenderStars from "../../../components/ratings/RenderStars";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

// keys
import { baseUrl } from "../../../config";

// misc
import { generateName } from "../../../helpers/misc";

// assets
import userPlaceholder from "../../../assets/img/userPlaceholder.svg";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    padding: "24px",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flex: "1",
    marginTop: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
  rating: {
    color: theme.palette.primary.main,
    fontSize: "1rem",
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    fontSize: "1.2rem",
    whiteSpace: "wrap",
  },
  img: {
    height: "80px",
    width: "80px",
    borderRadius: "4px",
    objectFit: "cover",
    objectPosition: "center",
  },
}));

const ProfileHeader = ({ postings, applications }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const auth = useSelector((state) => state.auth);

  // renderJobHeader
  const renderJobHeader = () => {
    if (auth.loading) {
      return <Loader />;
    } else if (auth.authenticated) {
      return (
        <div className={clsx(cls.root)}>
          <img
            className={cls.img}
            src={
              auth.user.profilePicture
                ? baseUrl + auth.user.profilePicture
                : userPlaceholder
            }
            alt=""
          />
          <div className={clsx("fcolbw", "mar_l-16")}>
            <div className="fcol">
              <div className={clsx(globalCls.txtMdSec, "fwb")}>
                {generateName(
                  auth.user.firstName,
                  auth.user.middleName,
                  auth.user.lastName
                )}
              </div>
              <div className={clsx("fc", "mar_t-4", cls.rating)}>
                <RenderStars numOfStar={netRating(auth.user.ratings)} />
              </div>
            </div>
            <div className={clsx("fc fwb", globalCls.txtSmPriCol)}>
              {applications
                ? applications.getApplicationsData?.length +
                  " applications by you"
                : postings
                ? postings.getPostingsData?.length + " job postings by you"
                : ""}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Something went wrong...</div>;
    }
  };

  return renderJobHeader();
};

export default ProfileHeader;
