import React from "react";

// styling
import { makeStyles, Button } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";
import { Alert, AlertTitle } from "@material-ui/lab";

// components
import CategoryCard from "../../../components/categoryCard";

// assets

// colors

// icons
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CategorySlider = ({ catList }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={clsx("of_scr", "sb_hid", globalCls.pad_lr_8_16)}>
      <div className={clsx("f")}>
        {catList?.length > 0 ? (
          catList.map((category) => (
            <CategoryCard category={category} key={category._id} />
          ))
        ) : (
          <div className={clsx(globalCls.pad_lr_8_16, "f1")}>
            <Alert className="f1" severity="info">
              <AlertTitle>NO CATEGORIES AVAILABLE</AlertTitle>
              It seems that there isn't any job available under this segment.
              You can check jobs under different categories or if you think this
              is a mistake, please contact website admins.
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySlider;
