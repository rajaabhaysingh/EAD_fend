import React, { useEffect } from "react";
// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";
import HomeCarousel from "./section/HomeCarousel";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// redux
import { useDispatch } from "react-redux";
import { getHomeCarouselBanners } from "../../redux/actions";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Home = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner);

  // fetching initial data on component mount
  useEffect(() => {
    dispatch(getHomeCarouselBanners("General"));
  }, []);

  return (
    <Page title="Home">
      <div className={cls.root}>
        <Header helper={helper} />
        <div className={globalCls.bodyRoot}>
          <div className={globalCls.secContainer}>
            <HomeCarousel banner={banner} />
          </div>
          <p>dz</p>
          <p>dz</p>
          <p>dz</p>
          <p>dz</p>
        </div>
      </div>
    </Page>
  );
};

export default Home;
