import React, { useMemo } from "react";
import clsx from "clsx";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

// styling
import {
  Button,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Select as MuiSelect,
  Switch,
  TextareaAutosize,
} from "@material-ui/core";
import useGlobalStyles from "../../../../styles/globalStyles";

// components
import Steps from "../../../../components/misc/Steps";
import { Alert, AlertTitle } from "@material-ui/lab";

// assets

// colors
import { primaryLight } from "../../../../styles/colors";

// icons
import { ChevronRight } from "@material-ui/icons";

// redux

const useStyles = makeStyles((theme) => ({
  root: {},
  reactSelect: {
    marginTop: "4px",
    fontSize: "0.9rem",
    color: theme.palette.text.primary,
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

const customTheme = (theme) => ({
  ...theme,
  background: "rgba(0,0,0,0)",
  colors: {
    ...theme.colors,
    primary25: "rgba(0,0,0,0.1)",
    primary: primaryLight,
  },
});

// styles for dropzone
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "8px",
  borderRadius: 4,
  borderColor: "#bbb",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Step1 = ({ step, setStep, formState, onChange, category }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  // file upload
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5243000,
    onDrop: (acceptedFiles, fileRejections, event) => {
      onChange(acceptedFiles[0], "jobThumbnail", "singleFile");
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  // inflating category options
  let options = [{ value: undefined, label: "Not available" }];

  if (category?.fetchData_allList?.length > 0) {
    // first empty the dummy options
    options = [];

    // inflate each category item
    for (const catItem of category.fetchData_allList) {
      options.push({
        value: catItem._id,
        label: catItem.categoryName,
      });
    }
  }

  // acceptedFileItems
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li className={globalCls.txtSmPri} key={file.path}>
      {file.path}
    </li>
  ));

  // fileRejectionItems
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path}
      {/* <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul> */}
    </li>
  ));

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
        {/* job - name */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="fcol">
            <div className={globalCls.txtSmSec}>
              Enter job name{" "}
              <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
            </div>
            <input
              className={clsx(globalCls.formInput, "mar_t-4")}
              type="text"
              placeholder="Eg: Labourer for construction, etc"
              value={formState.name}
              onChange={(e) => onChange(e, "name", "text")}
            />
          </div>
        </Grid>
        {/* category */}
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className="fcol">
            <div className={globalCls.txtSmSec}>
              Select job category{" "}
              <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
            </div>
            <Select
              value={formState.category}
              onChange={(e) => onChange(e, "category", "select")}
              options={options}
              className={cls.reactSelect}
              placeholder="Eg: Unskilled labourer, etc"
              isSearchable
              theme={customTheme}
            />
          </div>
        </Grid>
        {/* duration */}
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className="fc w-100">
            <div className="fcol f1">
              <div className={globalCls.txtSmSec}>Job duration </div>
              <input
                className={clsx(globalCls.formInput, "mar_t-4")}
                type="number"
                placeholder="Eg: 7"
                value={formState.duration}
                onChange={(e) => onChange(e, "duration", "text")}
                disabled={formState.isPermanent}
              />
            </div>
            <div className="fcol f1 mar_l-8">
              <div className={globalCls.txtSmSec}>Duration unit </div>
              <MuiSelect
                value={formState.durationUnit}
                onChange={(e) => onChange(e, "durationUnit", "text")}
                variant="outlined"
                placeholder="Days, Weeks, etc"
                className={clsx(globalCls.formInputSelect, "mar_t-4")}
                disabled={formState.isPermanent}
              >
                <MenuItem value="Minute">Minutes</MenuItem>
                <MenuItem value="Hour">Hours</MenuItem>
                <MenuItem value="Day">Days</MenuItem>
                <MenuItem value="Month">Months</MenuItem>
                <MenuItem value="Unknown">Unknown</MenuItem>
              </MuiSelect>
            </div>
          </div>
        </Grid>
        {/* is permanent */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formState.isPermanent}
                onChange={(e) => onChange(e, "isPermanent", "checked")}
                color="primary"
              />
            }
            className={globalCls.txtSmPriCol}
            label="This is a permanent job."
          />
        </Grid>
        {/* job - desc */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="fcol">
            <div className={globalCls.txtSmSec}>
              Enter job description{" "}
              <span className={clsx(globalCls.txtErr, "fwb")}>*</span>
            </div>
            <TextareaAutosize
              rowsMax={3}
              aria-label="job description"
              placeholder="Eg: "
              className={clsx(globalCls.formInput, "mar_t-4")}
              value={formState.desc}
              onChange={(e) => onChange(e, "desc", "text")}
              style={{
                maxWidth: "100%",
                maxHeight: "120px",
                height: "120px",
                fontSize: "1rem",
                padding: "8px",
              }}
            />
          </div>
        </Grid>
        {/* require unit */}
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className="fc w-100">
            <div className="fcol f1">
              <div className={globalCls.txtSmSec}>
                People required
                <span className={clsx(globalCls.txtErr, "")}> * </span>
              </div>
              <input
                className={clsx(globalCls.formInput, "mar_t-4")}
                type="number"
                placeholder="Eg: 2"
                value={formState.reqQty}
                onChange={(e) => onChange(e, "reqQty", "text")}
              />
            </div>
            <div className="fcol f1 mar_l-8">
              <div className={globalCls.txtSmSec}>
                Requirement unit
                <span className={clsx(globalCls.txtErr, "")}> * </span>
              </div>
              <MuiSelect
                value={formState.reqQtyUnit}
                onChange={(e) => onChange(e, "reqQtyUnit", "text")}
                variant="outlined"
                placeholder="Man, Woman, etc"
                className={clsx(globalCls.formInputSelect, "mar_t-4")}
              >
                <MenuItem value="Man">Man</MenuItem>
                <MenuItem value="Woman">Woman</MenuItem>
                <MenuItem value="Man OR Woman">Man OR Woman</MenuItem>
              </MuiSelect>
            </div>
          </div>
        </Grid>
        {/* pay scale */}
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className="fc w-100">
            <div className="fcol f1">
              <div className={globalCls.txtSmSec}>Pay scale (in ₹) </div>
              <input
                className={clsx(globalCls.formInput, "mar_t-4")}
                type="number"
                placeholder="Eg: 500"
                value={formState.payscale}
                onChange={(e) => onChange(e, "payscale", "text")}
              />
            </div>
            <div className="fcol f1 mar_l-8">
              <div className={globalCls.txtSmSec}>Pay interval </div>
              <MuiSelect
                value={formState.payscaleUnit}
                onChange={(e) => onChange(e, "payscaleUnit", "text")}
                variant="outlined"
                placeholder="Man, Woman, etc"
                className={clsx(globalCls.formInputSelect, "mar_t-4")}
              >
                <MenuItem value="Task">Task</MenuItem>
                <MenuItem value="Hour">Hour</MenuItem>
                <MenuItem value="Day">Day</MenuItem>
                <MenuItem value="Month">Month</MenuItem>
                <MenuItem value="Unknown">Unknown</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </MuiSelect>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section className="mar_t-16">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p className={globalCls.txtSmSec}>
                Drag 'n' drop job thumbnail here, or click to select file
              </p>
              <p className={globalCls.txtErr}>
                Only <strong>images</strong> are accepted. Only 1 file allowed.
              </p>
            </div>
            <aside>
              {acceptedFiles?.length > 0 && (
                <>
                  <h4 className={clsx(globalCls.txtMdPriCol, "fwb")}>
                    Submitted files
                  </h4>
                  <ul>{acceptedFileItems}</ul>
                </>
              )}
              {fileRejectionItems?.length > 0 && (
                <Alert className="f1 mar_t-16" severity="error">
                  <AlertTitle>REJECTED FILES</AlertTitle>
                  {fileRejectionItems}
                </Alert>
              )}
            </aside>
          </section>
        </Grid>
      </Grid>
      <div className="fend mar_t-32">
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="button"
          endIcon={<ChevronRight />}
          onClick={() => setStep(2)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1;
