import React from "react";
import { useRouteMatch } from "react-router-dom";

// styling
import {
  Button,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

// components

// assets

// colors

// icons
import { ArrowDownward, Filter, MoreVert, Sort } from "@material-ui/icons";

// redux
import { themeAction } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: "1",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "2px 32px 0 32px",
  },
  filterBtn: {
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
    textTransform: "none",
    margin: "0 8px",
    display: "flex",
    alignItems: "center",
    fontWeight: "normal",
  },
  sortBtn: {
    fontSize: "0.8rem",
    color: theme.palette.primary.main,
    textTransform: "none",
    margin: "0 8px",
    display: "flex",
    alignItems: "center",
    padding: "2px 12px",
    background: theme.palette.background.paper,
    borderRadius: "20px",
    fontWeight: "normal",
  },
  iconBtn: {
    fontSize: "0.9rem",
    boxShadow: theme.shadows[4],
    margin: "8px",
  },
  mobFilterContainer: {
    width: "100vw",
    height: "calc(100% - 60px)",
    boxSizing: "border-box",
    position: "fixed",
    overflow: "scroll",
    top: "60px",
    left: "0",
    display: "flex",
    flex: "1",
    background: theme.palette.background.bg,
    zIndex: "9999",
  },
  filterOptions: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  filterValues: {
    width: "100%",
  },
  option: {
    width: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    color: theme.palette.text.secondary,
    fontSize: "0.8rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  optionSelected: {
    width: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "0.8rem",
    background: theme.palette.background.paper,
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.bg,
    color: theme.palette.text.secondary,
    maxWidth: 620,
    border: `1px solid ${theme.palette.divider}`,
  },
}))(Tooltip);

// FilterOption
const FilterOption = ({ state, setState, handleChange, topic, filters }) => {
  const [open, setOpen] = React.useState(false);

  const cls = useStyles();
  const globalCls = useGlobalStyles();

  // handleTooltipClose
  const handleTooltipClose = () => {
    setOpen(false);
  };

  // handleTooltipOpen
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <CustomTooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        arrow
        interactive
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          <div className="fcol fss pad-8">
            {filters.map((option, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={state[option.value]}
                    onChange={handleChange}
                    name={option.value}
                    color="primary"
                    size="small"
                  />
                }
                label={option.title}
                className={globalCls.txtMdSec}
              />
            ))}
          </div>
        }
      >
        <Button className={cls.filterBtn} onClick={handleTooltipOpen}>
          {topic} <i className="fas fa-chevron-down mar_l-8 mar_t-2"></i>
        </Button>
      </CustomTooltip>
    </ClickAwayListener>
  );
};

const SearchFilters = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const [state, setState] = React.useState({});
  const [mobActiveOption, setMobActiveOption] = React.useState("Location");

  // handleChange
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // local state management
  const [mobFilterVisible, setMobFilterVisible] = React.useState(false);

  // locationFilterOptions
  const locationFilterOptions = [
    {
      title: "Near me",
      value: 0,
    },
    {
      title: "Upto 10 KMs",
      value: 10,
    },
    {
      title: "Upto 50 KMs",
      value: 50,
    },
    {
      title: "All India",
      value: -1,
    },
  ];
  // categoryFilterOptions
  const categoryFilterOptions = [
    {
      title: "Skilled Labour",
      value: "skilled_labourer",
    },
    {
      title: "Unskilled Labour",
      value: "unskilled_labourer",
    },
    {
      title: "Services",
      value: "services",
    },
    {
      title: "Household helper",
      value: "household_helper",
    },
  ];
  // durationFilterOptions
  const durationFilterOptions = [
    {
      title: "Few days",
      value: "day",
    },
    {
      title: "Few weeks",
      value: "week",
    },
    {
      title: "Few months",
      value: "month",
    },
    {
      title: "Permanent",
      value: "permanent",
    },
  ];
  // expFilterOptions
  const expFilterOptions = [
    {
      title: "Few weeks",
      value: "week",
    },
    {
      title: "Few months",
      value: "month",
    },
    {
      title: "Few years",
      value: "year",
    },
    {
      title: "Not required",
      value: "not_required",
    },
  ];

  // renderFilterOptions
  const renderFilterOptions = () => {
    let selectedOptionList = locationFilterOptions;

    switch (mobActiveOption) {
      case "Location":
        selectedOptionList = locationFilterOptions;
        break;
      case "Category":
        selectedOptionList = categoryFilterOptions;
        break;
      case "Job duration":
        selectedOptionList = durationFilterOptions;
        break;
      case "Pay":
        selectedOptionList = locationFilterOptions;
        break;
      case "Experience":
        selectedOptionList = expFilterOptions;
        break;

      default:
        break;
    }

    return selectedOptionList.map((option, i) => (
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            checked={state[option.value]}
            onChange={handleChange}
            name={option.value}
            color="primary"
            size="small"
          />
        }
        label={option.title}
        className={globalCls.txtMdSec}
      />
    ));
  };

  return (
    <div className={cls.root}>
      {/* for PC */}
      <Hidden smDown>
        <div className="fc">
          <FilterOption
            state={state}
            setState={setState}
            handleChange={handleChange}
            topic="Location"
            filters={locationFilterOptions}
          />
          <FilterOption
            state={state}
            setState={setState}
            handleChange={handleChange}
            topic="Category"
            filters={categoryFilterOptions}
          />
          <FilterOption
            state={state}
            setState={setState}
            handleChange={handleChange}
            topic="Job duration"
            filters={durationFilterOptions}
          />
          <FilterOption
            state={state}
            setState={setState}
            handleChange={handleChange}
            topic="Pay"
            filters={locationFilterOptions}
          />
          <FilterOption
            state={state}
            setState={setState}
            handleChange={handleChange}
            topic="Experience"
            filters={expFilterOptions}
          />
        </div>
        <div className="mar_l-32 fc">
          <Button className={cls.sortBtn}>
            Sort by relevance <i className="fas fa-sort mar_l-8 mar_t-2"></i>
          </Button>
        </div>
      </Hidden>
      {/* for Mobile */}
      <Hidden mdUp>
        <div className="fend">
          <IconButton
            color="primary"
            className={cls.iconBtn}
            onClick={() => setMobFilterVisible(!mobFilterVisible)}
          >
            <i className="fas fa-filter"></i>
          </IconButton>
          <IconButton color="primary" className={cls.iconBtn}>
            <i className="fas fa-sort-amount-up"></i>
          </IconButton>
        </div>
        {mobFilterVisible && (
          <div className={cls.mobFilterContainer}>
            <div className={clsx("fcol", cls.filterOptions)}>
              <div
                onClick={() => setMobActiveOption("Location")}
                className={
                  mobActiveOption === "Location"
                    ? cls.optionSelected
                    : cls.option
                }
              >
                Location
              </div>
              <div
                onClick={() => setMobActiveOption("Category")}
                className={
                  mobActiveOption === "Category"
                    ? cls.optionSelected
                    : cls.option
                }
              >
                Category
              </div>
              <div
                onClick={() => setMobActiveOption("Job duration")}
                className={
                  mobActiveOption === "Job duration"
                    ? cls.optionSelected
                    : cls.option
                }
              >
                Job
              </div>
              <div
                onClick={() => setMobActiveOption("Pay")}
                className={
                  mobActiveOption === "Pay" ? cls.optionSelected : cls.option
                }
              >
                Pay
              </div>
              <div
                onClick={() => setMobActiveOption("Experience")}
                className={
                  mobActiveOption === "Experience"
                    ? cls.optionSelected
                    : cls.option
                }
              >
                Experience
              </div>
            </div>
            <div className={clsx("fcol", cls.filterValues)}>
              <div className="fcol f1 pad-8 of_scr">
                {renderFilterOptions()}
              </div>
              <div className="fcbw pad-8">
                <Button onClick={() => setMobFilterVisible(false)}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => setMobFilterVisible(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
      </Hidden>
    </div>
  );
};

export default SearchFilters;
