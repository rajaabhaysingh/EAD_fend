import React, { useEffect } from "react";
// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";
import HomeCarousel from "./section/HomeCarousel";
import JobSlider from "../jobs/section/JobSlider";
import Infographics from "./section/Infographics";
import Loader from "../../components/loader";
import Footer from "../../components/footer/Footer";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// redux
import { useDispatch } from "react-redux";
import {
  getHomeCarouselBanners,
  getHomeLocalJobs,
  getAllCategory,
} from "../../redux/actions";
import { useSelector } from "react-redux";
import CategorySlider from "../categories/section/CategorySlider";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Home = ({}) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner);
  const jobs = useSelector((state) => state.jobs);
  const category = useSelector((state) => state.category);
  const helper = useSelector((state) => state.helper);

  // fetching initial data on component mount
  useEffect(() => {
    dispatch(getHomeCarouselBanners("Ads"));
    dispatch(getHomeLocalJobs());
    dispatch(getAllCategory());
  }, []);

  return (
    <Page title="Wilswork | Home">
      <div className={cls.root}>
        <Header helper={helper} />
        {banner.getHomeCarouselBannerLoading ||
        jobs.hetHomeLocalJobLoading ||
        category.fetchLoading ? (
          <Loader />
        ) : (
          <div
            className={
              helper.marginTop
                ? clsx(globalCls.bodyRoot, globalCls.bodyRootTransform)
                : globalCls.bodyRoot
            }
          >
            <div className={globalCls.secContainer}>
              <HomeCarousel banner={banner} />
            </div>
            <div className={globalCls.secContainer}>
              <CategorySlider catList={category.fetchData_mainOnly} />
            </div>
            <div className={globalCls.secContainer}>
              <JobSlider
                title="Recommended jobs near you"
                subTitle="We recommend jobs based on youy current location and browsing history"
                jobs={jobs}
              />
            </div>
            <div className={globalCls.secContainer}>
              <Infographics />
            </div>
            <div className={globalCls.secContainer}>
              <JobSlider
                title="Jobs related to your profile"
                subTitle="Based on your search history and profile"
                jobs={jobs}
              />
            </div>
            <div className={globalCls.secContainer}>
              <JobSlider
                title="Trending all over"
                subTitle="Based on trends and application hits"
                jobs={jobs}
              />
            </div>
            <Footer />
          </div>
        )}
      </div>
    </Page>
  );
};

export default Home;
