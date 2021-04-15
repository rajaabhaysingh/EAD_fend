import React from "react";

// styling
import { Button, Grid, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../../styles/globalStyles";

// components
import Steps from "../../../../components/misc/Steps";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";

// assets

// colors

// icons
import { ChevronLeft, ChevronRight, PlusOne } from "@material-ui/icons";

// redux

const useStyles = makeStyles((theme) => ({
  root: {},
  errorBtn: {
    color: theme.palette.error.main,
    marginLeft: "8px",
  },
}));

const Step2 = ({
  step,
  setStep,
  formState,
  setFormState,
  prerequisiteInitState,
  facilitiesInitState,
  faqsInitState,
}) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  // handlePrerequisitesChange
  const handlePrerequisitesChange = (e, label, i) => {
    const updatedPrereq = [...formState.prerequisites];
    updatedPrereq[i] = e.target.value;

    setFormState({
      ...formState,
      prerequisites: updatedPrereq,
    });
  };

  // handleFacilitiesChange
  const handleFacilitiesChange = (e, label, i) => {
    const updatedFacilities = [...formState.facilities];
    updatedFacilities[i][label] = e.target.value;

    setFormState({
      ...formState,
      facilities: updatedFacilities,
    });
  };

  // handleFAQsChange
  const handleFAQsChange = (e, label, i) => {
    const updatedFAQs = [...formState.faqs];
    updatedFAQs[i][label] = e.target.value;

    setFormState({
      ...formState,
      faqs: updatedFAQs,
    });
  };

  // renderAddPrerequisites
  const renderAddPrerequisites = () => {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="fcol">
          <div className={globalCls.txtSmSec}>
            Enter job prerequisites (optional)
          </div>
        </div>
        {formState.prerequisites.map((inputGroup, i) => (
          <input
            key={i}
            className={clsx(globalCls.formInput, "mar_t-4 w-100")}
            type="text"
            placeholder="Eg: Must have worked as worker before, etc."
            value={formState.prerequisites[i]}
            onChange={(e) => handlePrerequisitesChange(e, "prerequisite", i)}
          />
        ))}
        <div className="fc mar_t-8">
          <Button
            type="button"
            color="primary"
            variant="outlined"
            disabled={formState.prerequisites?.slice(-1)[0]?.length <= 0}
            onClick={() => {
              setFormState({
                ...formState,
                prerequisites: [
                  ...formState.prerequisites,
                  prerequisiteInitState,
                ],
              });
            }}
          >
            <PlusOne />
          </Button>
          <Button
            type="button"
            variant="text"
            className={cls.errorBtn}
            onClick={() => {
              setFormState({
                ...formState,
                prerequisites: [prerequisiteInitState],
              });
            }}
          >
            REMOVE ALL PREREQUISITES
          </Button>
        </div>
      </Grid>
    );
  };

  // renderAddFacilities
  const renderAddFacilities = () => {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="fcol">
          <div className={globalCls.txtSmSec}>
            Enter job facilities (optional){" "}
          </div>
        </div>
        {formState.facilities.map((inputGroup, i) => (
          <div className="fc w-100 mar_t-4" key={i}>
            <input
              className={clsx(globalCls.formInput, "f1")}
              type="text"
              placeholder="Eg: Accomodation, etc."
              value={formState.facilities[i].key}
              onChange={(e) => handleFacilitiesChange(e, "key", i)}
            />
            <input
              className={clsx(globalCls.formInput, "mar_l-4 f1")}
              type="text"
              placeholder="Eg: Accomodation and food will be provided, etc."
              value={formState.facilities[i].value}
              onChange={(e) => handleFacilitiesChange(e, "value", i)}
            />
          </div>
        ))}
        <div className="fc mar_t-8">
          <Button
            type="button"
            color="primary"
            variant="outlined"
            disabled={
              formState.facilities?.slice(-1)[0]?.key?.length <= 0 ||
              formState.facilities?.slice(-1)[0]?.value?.length <= 0
            }
            onClick={() => {
              setFormState({
                ...formState,
                facilities: [...formState.facilities, facilitiesInitState],
              });
            }}
          >
            <PlusOne />
          </Button>
          <Button
            type="button"
            variant="text"
            className={cls.errorBtn}
            onClick={() => {
              setFormState({
                ...formState,
                facilities: [facilitiesInitState],
              });
            }}
          >
            REMOVE ALL Facilities
          </Button>
        </div>
      </Grid>
    );
  };

  // renderAddFAQs
  const renderAddFAQs = () => {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="fcol">
          <div className={globalCls.txtSmSec}>
            Enter FAQs related to job (optional){" "}
          </div>
        </div>
        {formState.faqs.map((inputGroup, i) => (
          <div className="fc w-100 mar_t-4" key={i}>
            <input
              className={clsx(globalCls.formInput, "f1")}
              type="text"
              placeholder="Eg: Is pay negotiable ?, etc."
              value={formState.faqs[i].que}
              onChange={(e) => handleFAQsChange(e, "que", i)}
            />
            <input
              className={clsx(globalCls.formInput, "mar_l-4 f1")}
              type="text"
              placeholder="Eg: Yes, pay is negotiable and is based on quality of work... etc."
              value={formState.faqs[i].answer}
              onChange={(e) => handleFAQsChange(e, "answer", i)}
            />
          </div>
        ))}
        <div className="fc mar_t-8">
          <Button
            type="button"
            color="primary"
            variant="outlined"
            disabled={
              formState.faqs?.slice(-1)[0]?.que?.length <= 0 ||
              formState.faqs?.slice(-1)[0]?.answer?.length <= 0
            }
            onClick={() => {
              setFormState({
                ...formState,
                faqs: [...formState.faqs, faqsInitState],
              });
            }}
          >
            <PlusOne />
          </Button>
          <Button
            type="button"
            variant="text"
            className={cls.errorBtn}
            onClick={() => {
              setFormState({
                ...formState,
                faqs: [faqsInitState],
              });
            }}
          >
            REMOVE ALL FAQs
          </Button>
        </div>
      </Grid>
    );
  };

  return (
    <div className="fcol">
      <Steps total={3} active={step} />
      <Alert severity="info" className="f1 mar_t-24">
        Fill up the form below with all the relevent job details and
        descriptions.{" "}
        <strong>
          Fields marked with
          <span className={clsx(globalCls.txtErr, "")}> * </span>
          are mendatory.
        </strong>
      </Alert>
      <Grid container spacing={3} className={globalCls.marT16}>
        {renderAddPrerequisites()}
        {renderAddFacilities()}
        {renderAddFAQs()}
      </Grid>
      <div className="fcbw mar_t-32">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          type="button"
          startIcon={<ChevronLeft />}
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="button"
          endIcon={<ChevronRight />}
          onClick={() => setStep(3)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step2;
