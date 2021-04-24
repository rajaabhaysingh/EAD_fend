import React, { useEffect, useMemo } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { isLoggedIn } from "../../helpers/misc";

// styling
import {
  Button,
  FormControlLabel,
  Grid,
  makeStyles,
  Switch as MuiSwitch,
} from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Modal from "@material-ui/core/Modal";

// components
import Page from "../../components/mui/Page";
import NormalJobHeader from "./section/NormalJobHeader";
import JobDesc from "./section/JobDesc";
import JobDetails from "./section/JobDetails";
import Reviews from "./section/Reviews";
import Ratings from "../../components/ratings";
import JobCardSuggestion from "../../components/jobCard/JobCardSuggestion";
import Divider from "../../components/misc/Divider";
import PostJobCard from "./components/PostJobCard";
import Loader from "../../components/loader";
import JobSlider from "./section/JobSlider";
import Footer from "../../components/footer/Footer";

// assets

// colors

// icons

// redux
import { getJobById, getHomeLocalJobs, applyOnJob } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    color: theme.palette.text.secondary,
    margin: "32px 0 8px 0",
    fontSize: "1.2 rem",
    fontWeight: "bold",
  },
  modal: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "90vw",
    maxWidth: "620px",
    maxHeight: "70vh",
    overflowY: "scroll",
    zIndex: 99999,
    marginTop: "60px",
  },
}));

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

const JobPage = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const [open, setOpen] = React.useState(false);
  const [availableFrom, setAvailableFrom] = React.useState(new Date());
  const [availableTill, setAvailableTill] = React.useState(new Date());
  const [permAvail, setPermAvail] = React.useState(false);

  const { url, path } = useRouteMatch();
  const { jobId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const job = useSelector((state) => state.jobs);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*, application/pdf",
    maxFiles: 5,
    maxSize: 5243000,
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

  // load dynamic data
  useEffect(() => {
    dispatch(getJobById(jobId));
    dispatch(getHomeLocalJobs());
  }, [jobId]);

  useEffect(() => {
    if (job.applyOnJobSuccess && job.applyOnJobContextId === jobId) {
      setOpen(false);
    }
  }, [job.applyOnJobSuccess]);

  // handleJobApply
  const handleJobApply = (e) => {
    e.preventDefault();

    // check if loggedin
    if (isLoggedIn()) {
      const formData = new FormData();

      formData.append("jobId", jobId);
      formData.append("availableFrom", availableFrom);
      formData.append("availableTill", availableTill);
      formData.append("permanentlyAvailable", permAvail);
      if (acceptedFiles.length > 0) {
        for (const file of acceptedFiles) {
          formData.append("coverLetter", file);
        }
      }

      // dispatch
      dispatch(applyOnJob(formData, jobId));
    } else {
      history.push(`/login?target=${url}`);
    }
  };

  // handleOpen - modal
  const handleOpen = () => {
    setOpen(true);
  };

  // handleClose - modal
  const handleClose = () => {
    setOpen(false);
  };

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

  // renderJobPageRoute
  const renderJobPageRoute = () => {
    if (job.getJobByIdData) {
      return (
        <div
          className={clsx(globalCls.pad_8_16, globalCls.pclr_mobtb, "justc")}
        >
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <NormalJobHeader job={job} apply={handleOpen} />
              <JobDesc job={job} />
              <JobDetails job={job} />
              <Ratings ratings={job.getJobByIdData?.ratings} />
              <Reviews
                reviews={job.getJobByIdData?.reviews}
                jobId={
                  job.getJobByIdData?._id ? job.getJobByIdData._id : undefined
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              className={globalCls.pcMarL_mobMarT32}
            >
              <div className="fcol">
                <PostJobCard />
                <div className={cls.heading}>Suggested jobs</div>
                <Divider className="mar_b-20" />
                {job.getHomeLocalJobsData?.jobs?.map((job) => (
                  <JobCardSuggestion job={job} key={job._id} />
                ))}
              </div>
            </Grid>
          </Grid>
          {/* Modal for application on job */}
          <Modal open={open} onClose={handleClose} className="fccc">
            <div className={cls.modal}>
              <div className={globalCls.txtLgPri}>
                <strong>Submit application</strong>
              </div>
              <p className={globalCls.txtSmSec}>
                Please provide the necessary details for applying over the job
                post.
              </p>
              <form className="fcol" onSubmit={handleJobApply}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Available from:"
                  format="dd/MM/yyyy"
                  value={availableFrom}
                  onChange={setAvailableFrom}
                  size="small"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  margin="normal"
                  label="Available Till:"
                  format="dd/MM/yyyy"
                  value={availableTill}
                  onChange={setAvailableTill}
                  size="small"
                  disabled={permAvail}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <div className="fcbw bb fsm mar_t-16">
                  <FormControlLabel
                    control={
                      <MuiSwitch
                        checked={permAvail}
                        onChange={(e) => setPermAvail(e.target.checked)}
                        color="primary"
                      />
                    }
                    className={globalCls.txtMdSec}
                    label="Permanently available"
                  />
                </div>
                <section className="mar_t-16">
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p className={globalCls.txtSmSec}>
                      Drag 'n' drop necessary files here, or click to select
                      files
                    </p>
                    <div className={globalCls.txtErr}>
                      Only <strong>images</strong> and <strong>PDFs</strong> are
                      accepted. Maximum 5 files allowed.
                    </div>
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
                {job.applyOnJobError && job.applyOnJobContextId == jobId ? (
                  <Alert className="f1 mar_t-16" severity="error">
                    {job.applyOnJobError}
                  </Alert>
                ) : null}

                <Button
                  className={globalCls.marT32}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  CONFIRM APPLICATION
                </Button>
              </form>
            </div>
          </Modal>
          {job.applyOnJobLoading ? <Loader /> : null}
        </div>
      );
    } else {
      // check for error
      if (job.getJobByIdError === "Job not found. [code: 404]") {
        return <Redirect to="/error404" />;
      } else {
        return (
          <Alert className="f1 mar_t-16" severity="error">
            <AlertTitle>SOME ERROR OCCURED</AlertTitle>
            {job.getJobByIdError}
          </Alert>
        );
      }
    }
  };

  return (
    <Page title="Wilswork | Jobs">
      <Switch>
        <Route path={path} exact>
          {job.getHomeLocalJobsLoading || job.getJobByIdLoading ? (
            <Loader />
          ) : job.getJobByIdError ? (
            <Alert>{job.getJobByIdError}</Alert>
          ) : job.getJobByIdData ? (
            <div className="fcol">
              {renderJobPageRoute()}
              <div className={clsx(globalCls.secContainer, "mar_t-64")}>
                <JobSlider
                  title="Similar jobs"
                  subTitle="Related jobs that applicants preferred."
                  jobs={job}
                />
              </div>
              <Footer />
            </div>
          ) : (
            <Redirect to="/error404" />
          )}
        </Route>
        <Route path={`${path}/all-comments`} exact>
          All comments route
        </Route>
        <Redirect to="/error404" />
      </Switch>
    </Page>
  );
};

export default JobPage;
