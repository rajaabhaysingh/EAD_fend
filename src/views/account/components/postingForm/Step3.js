import React from "react";
import clsx from "clsx";
import { KeyboardDatePicker } from "@material-ui/pickers";

// styling
import {
  Button,
  FormControlLabel,
  Grid,
  makeStyles,
  Modal,
  Radio,
  RadioGroup,
  Switch,
} from "@material-ui/core";
import useGlobalStyles from "../../../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// components
import Steps from "../../../../components/misc/Steps";
import Loader from "../../../../components/loader";
import LocationAutoComplete from "../../../../components/header/LocationAutoComplete";

// assets

// colors
import { Add, Check, ChevronLeft } from "@material-ui/icons";

// icons

// redux
import { useSelector, useDispatch } from "react-redux";
import { addAddress, clearAddAddress } from "../../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  addressLabel: {
    marginLeft: "8px",
    display: "flex",
    flex: "1",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    fontSize: "0.9rem",
  },
  option: {
    margin: "8px 0 0 0",
    borderRadius: "4px",
    background: theme.palette.background.paper,
    padding: "8px",
  },
  modal: {
    backgroundColor: theme.palette.background.bg,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "90vw",
    maxWidth: "620px",
    maxHeight: "70vh",
    overflow: "scroll",
    zIndex: 99999,
    marginTop: "60px",
  },
  bor: {
    border: `1px solid ${theme.palette.divider}`,
    height: "38px",
    boxSizing: "border-box",
    padding: "0 8px",
    borderRadius: "4px",
    outline: "none",
  },
}));

const Step3 = ({ step, setStep, formState, onChange, submitJob }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const postings = useSelector((state) => state.postings);

  // local state management
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [addressForm, setAddressForm] = React.useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    locality: "",
    addressLine: "",
    cityDistrictTown: "",
    state: "",
    country: "India",
    landmark: "",
    lat: "",
    long: "",
    alternatePhone: "",
  });

  // close modal after address add is successful
  if (profile.addAddressSuccess) {
    dispatch(clearAddAddress());
  }

  // handleAddAddress
  const handleAddAddress = () => {
    setIsModalOpen(true);
  };

  // handleAddSubmit
  const handleAddSubmit = (e) => {
    e.preventDefault();

    // dispatch Add address
    dispatch(addAddress(addressForm, setIsModalOpen));
  };

  // handleJobSubmit
  const handleJobSubmit = (e) => {
    e.preventDefault();

    submitJob();
  };

  // onAddressChange
  const onAddressChange = (e, field, type) => {
    if (type === "text") {
      setAddressForm({
        ...addressForm,
        [field]: e.target.value,
      });
    } else if (type === "select") {
      setAddressForm({
        ...addressForm,
        [field]: e,
      });
    } else if (type === "checked") {
      setAddressForm({
        ...addressForm,
        [field]: e.target.checked,
      });
    } else {
    }
  };

  // renderAddress
  const renderAddress = () => {
    return profile.getAddressesLoading ? (
      <Loader />
    ) : profile.getAddressesSuccess ? (
      profile.getAddressesData?.length > 0 ? (
        <RadioGroup
          aria-label="job address"
          name="address"
          value={formState.address}
          className="w-100"
          onChange={(e) => onChange(e, "address", "text")}
        >
          {profile.getAddressesData.map((address) => (
            <FormControlLabel
              value={address._id}
              control={<Radio />}
              label={
                <div className={clsx(cls.addressLabel)}>
                  {address?.name || "N/A"}, {address?.addressLine || "N/A"},{" "}
                  {address?.landmark || "N/A"},{" "}
                  {address?.cityDistrictTown || "N/A"},{" "}
                  {address?.state || "N/A"}, {address?.country || "N/A"},{" "}
                  {address?.pinCode || "N/A"}
                </div>
              }
              className={cls.option}
            />
          ))}
        </RadioGroup>
      ) : (
        <Alert severity="warning" className="f1 mar_t-24">
          You don't have any saved addresses. Please add an address first to
          proceed.
        </Alert>
      )
    ) : (
      <Alert severity="error" className="f1 mar_t-24">
        {profile.getAddressesError}
      </Alert>
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className={globalCls.txtSmSec}>
            Select job location.{" "}
            <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
          </div>
          {renderAddress()}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="button"
            startIcon={<Add />}
            onClick={handleAddAddress}
          >
            Add new Address
          </Button>
        </Grid>
        {/* application deadline */}
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className="fcol f1">
            <div className={globalCls.txtSmSec}>Application deadline </div>
            <KeyboardDatePicker
              margin="normal"
              size="small"
              format="dd/MM/yyyy"
              value={formState.deadline}
              onChange={(e) => onChange(e, "deadline", "select")}
              KeyboardButtonProps={{
                "aria-label": "change deadline",
              }}
              className={clsx(globalCls.formInput)}
              style={{ height: "38px", margin: "4px 0 0 0" }}
            />
          </div>
        </Grid>
        {/* is paused */}
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className="fcol f1">
            <div className={globalCls.txtSmSec}>
              Do you want to publish this job instantly{" "}
            </div>
            <div className={clsx(cls.bor, "mar_t-4 fc")}>
              <Switch
                checked={formState.isPaused}
                onChange={(e) => onChange(e, "isPaused", "checked")}
                color="primary"
              />
              <div className={globalCls.txtMdPriCol}>
                Don't publish this job now.
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fccc"
      >
        <div className={cls.modal}>
          <div className={globalCls.txtLgPri}>
            <strong>Add new address</strong>
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
            Add a new job address to add it to your job profile.
          </div>
          <form className="fcol mar_t-32" onSubmit={handleAddSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="fcol">
                  <div className={globalCls.txtSmSec}>
                    Name{" "}
                    <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
                  </div>
                  <input
                    className={clsx(globalCls.formInput, "mar_t-4")}
                    type="text"
                    placeholder="Enter full name"
                    value={addressForm.name}
                    onChange={(e) => onAddressChange(e, "name", "text")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="fcol">
                  <div className={globalCls.txtSmSec}>
                    Address line{" "}
                    <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
                  </div>
                  <LocationAutoComplete
                    addressForm={addressForm}
                    setAddressForm={setAddressForm}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="fcol">
                  <div className={globalCls.txtSmSec}>
                    Locality{" "}
                    <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
                  </div>
                  <input
                    className={clsx(globalCls.formInput, "mar_t-4")}
                    type="text"
                    placeholder="Eg: Colony name, area name, etc"
                    value={addressForm.locality}
                    onChange={(e) => onAddressChange(e, "locality", "text")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <div className="fcol">
                  <div className={globalCls.txtSmSec}>
                    District{" "}
                    <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
                  </div>
                  <input
                    className={clsx(globalCls.formInput, "mar_t-4")}
                    type="text"
                    placeholder="Enter your district"
                    value={addressForm.cityDistrictTown}
                    onChange={(e) =>
                      onAddressChange(e, "cityDistrictTown", "text")
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <div className="fcol">
                  <div className={globalCls.txtSmSec}>
                    State/UT{" "}
                    <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
                  </div>
                  <input
                    className={clsx(globalCls.formInput, "mar_t-4")}
                    type="text"
                    placeholder="Select your state"
                    value={addressForm.state}
                    onChange={(e) => onAddressChange(e, "state", "text")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="fcol">
                  <div className={globalCls.txtSmSec}>
                    Landmark{" "}
                    <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
                  </div>
                  <input
                    className={clsx(globalCls.formInput, "mar_t-4")}
                    type="text"
                    placeholder="Eg: Near ABC road/building..."
                    value={addressForm.landmark}
                    onChange={(e) => onAddressChange(e, "landmark", "text")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <div className="fcol">
                  <div className={globalCls.txtSmSec}>
                    PIN Code{" "}
                    <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
                  </div>
                  <input
                    className={clsx(globalCls.formInput, "mar_t-4")}
                    type="number"
                    placeholder="Eg: XXXXXX"
                    value={addressForm.pinCode}
                    onChange={(e) => onAddressChange(e, "pinCode", "text")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <div className="fcol">
                  <div className={globalCls.txtSmSec}>
                    Contact number{" "}
                    <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
                  </div>
                  <input
                    className={clsx(globalCls.formInput, "mar_t-4")}
                    type="text"
                    placeholder="Eg: +91XXXXXXXXXX"
                    value={addressForm.mobileNumber}
                    onChange={(e) => onAddressChange(e, "mobileNumber", "text")}
                  />
                </div>
              </Grid>
            </Grid>
            {profile.addAddressError ? (
              <Alert className="f1 mar_t-16" severity="error">
                {profile.addAddressError}
              </Alert>
            ) : null}

            <Button
              className={globalCls.marT32}
              variant="contained"
              color="primary"
              type="submit"
              disabled={profile.addAddressLoading}
            >
              ADD NOW
            </Button>
          </form>
        </div>
      </Modal>
      <div className="fcbw mar_t-32">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          type="button"
          startIcon={<ChevronLeft />}
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="button"
          endIcon={<Check />}
          onClick={handleJobSubmit}
          disabled={postings.postNewJobLoading}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default Step3;
