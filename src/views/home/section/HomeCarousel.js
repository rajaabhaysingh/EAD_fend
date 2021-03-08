import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import clsx from "clsx";
import "keen-slider/keen-slider.min.css";

// styling
import { Button, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

// components

// assets

// colors

// icons

// redux

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const HomeCarousel = ({ banner }) => {
  // local state mgmt
  const [pause, setPause] = React.useState(false);
  const timer = React.useRef();

  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 1,
    spacing: 10,
    loop: true,
    duration: 1000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
    breakpoints: {
      "(min-width: 1px) and (max-width: 599px)": {
        slidesPerView: 1,
      },
      "(min-width: 600px) and (max-width: 959px)": {
        slidesPerView: 2,
      },
      "(min-width: 960px) and (max-width: 1919px)": {
        slidesPerView: 3,
      },
      "(min-width: 1920px)": {
        slidesPerView: 4,
      },
    },
  });

  useEffect(() => {
    console.log(banner.getHomeCarouselBannerData);
  }, [banner]);

  useEffect(() => {
    sliderRef.current.addEventListener("mouseover", () => {
      setPause(true);
    });
    sliderRef.current.addEventListener("mouseout", () => {
      setPause(false);
    });
  }, [sliderRef]);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 3000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

  return (
    <div ref={sliderRef} className={clsx("keen-slider", cls.root)}>
      {banner?.getHomeCarouselBannerData?.map((slide, i) => (
        <div
          key={i}
          className={clsx(globalCls.imgContainer, "keen-slider__slide")}
        >
          <img
            className={globalCls.carouselBanner}
            src={process.env.REACT_APP_BASE_URL + slide.banner}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default HomeCarousel;
