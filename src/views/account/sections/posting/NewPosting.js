import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// components
import Page from "../../../../components/mui/Page";
import Step1 from "../../components/postingForm/Step1";
import Step2 from "../../components/postingForm/Step2";
import Step3 from "../../components/postingForm/Step3";

// assets

// colors

// icons

// redux
import { getAllCategory, postNewJob } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
  },
  borB: {
    padding: "24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  pad: {
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
}));

const NewPosting = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const postings = useSelector((state) => state.postings);
  const history = useHistory();

  // initial states for job form
  const prerequisiteInitState = "";
  const facilitiesInitState = {
    key: "",
    value: "",
  };
  const faqsInitState = {
    que: "",
    answer: "",
  };
  const formInitState = {
    name: "",
    category: "",
    jobThumbnail: "",
    address: "",
    desc: "",
    duration: "",
    durationUnit: "Day",
    isPermanent: false,
    reqQty: 1,
    reqQtyUnit: "Man OR Woman",
    deadline: new Date(),
    isPaused: false,
    payscale: "",
    payscaleUnit: "Day",
    prerequisites: [prerequisiteInitState],
    facilities: [facilitiesInitState],
    faqs: [faqsInitState],
  };

  // local state management
  const [formState, setFormState] = React.useState(formInitState);
  const [step, setStep] = React.useState(1);

  // get all categories for form
  React.useEffect(() => {
    if (!category.fetchSuccessful) {
      dispatch(getAllCategory());
    }
  }, []);

  // onChange
  const onChange = (e, field, type) => {
    if (type === "text") {
      setFormState({
        ...formState,
        [field]: e.target.value,
      });
    } else if (type === "select") {
      setFormState({
        ...formState,
        [field]: e,
      });
    } else if (type === "checked") {
      setFormState({
        ...formState,
        [field]: e.target.checked,
      });
    } else if (type === "singleFile") {
      setFormState({
        ...formState,
        [field]: e,
      });
    } else {
      setFormState({
        ...formState,
        [field]: e,
      });
    }
  };

  // submitJob
  const submitJob = () => {
    const formData = new FormData();

    formData.append("name", formState.name);
    formData.append("category", formState.category.value);
    formData.append("jobThumbnail", formState.jobThumbnail);
    formData.append("location", formState.address);
    formData.append("desc", formState.desc);
    formData.append("duration", formState.duration);
    formData.append("durationUnit", formState.durationUnit);
    formData.append("isPermanent", formState.isPermanent);
    formData.append("reqQty", formState.reqQty);
    formData.append("reqQtyUnit", formState.reqQtyUnit);
    formData.append("deadline", formState.deadline);
    formData.append("isPaused", formState.isPaused);
    formData.append("payscale", formState.payscale);
    formData.append("payscaleUnit", formState.payscaleUnit);

    if (formState.prerequisites.length > 0) {
      for (const prereq of formState.prerequisites) {
        if (prereq) {
          formData.append("prerequisites", prereq);
        }
      }
    }

    if (formState.facilities.length > 0) {
      let tempFacilityList = [];

      for (const facility of formState.facilities) {
        if (facility.key && facility.value) {
          tempFacilityList.push(facility);
        }
      }

      formData.append("facilities", JSON.stringify(tempFacilityList));
    }

    if (formState.faqs.length > 0) {
      let tempFAQsList = [];

      for (const faq of formState.faqs) {
        if (faq.que && faq.answer) {
          tempFAQsList.push(faq);
        }
      }

      formData.append("faqs", JSON.stringify(tempFAQsList));
    }

    dispatch(postNewJob(formData, history));
  };

  // renderFormStep
  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            step={step}
            setStep={setStep}
            formState={formState}
            onChange={onChange}
            category={category}
          />
        );

      case 2:
        return (
          <Step2
            step={step}
            setStep={setStep}
            formState={formState}
            setFormState={setFormState}
            onChange={onChange}
            prerequisiteInitState={prerequisiteInitState}
            facilitiesInitState={facilitiesInitState}
            faqsInitState={faqsInitState}
          />
        );

      case 3:
        return (
          <Step3
            step={step}
            setStep={setStep}
            formState={formState}
            onChange={onChange}
            submitJob={submitJob}
          />
        );

      default:
        return (
          <Step1
            step={step}
            setStep={setStep}
            formState={formState}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <Page title="Wilswork | New posting">
      <div className={cls.root}>
        <div className={cls.borB}>
          <div className={clsx(globalCls.txtLgSec, "fwb")}>New job Posting</div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
            You can post a job opening here.
          </div>
        </div>
        <div style={{ maxWidth: "920px" }} className={cls.pad}>
          {postings.postNewJobError ? (
            <Alert severity="error" className="f1 mar_b-24">
              {postings.postNewJobError}
            </Alert>
          ) : null}
          {renderFormStep()}
        </div>
      </div>
    </Page>
  );
};

export default NewPosting;
