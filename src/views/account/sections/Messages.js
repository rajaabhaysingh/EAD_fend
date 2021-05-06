import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Page from "../../../components/mui/Page";

// components
import Userstamp from "../sections/messages/Userstamp";
import MessageArea from "../sections/messages/MessageArea";
import Loader from "../../../components/loader";

// styling
import { Hidden, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../../../redux/actions";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    display: "flex",
    height: "100%",
  },
  chatNamesVisible: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    width: "360px",
    maxWidth: "360px",
    borderRight: `1px solid ${theme.palette.divider}`,
    listStyle: "none",
    margin: "0",
    padding: "0",
    transform: "translateX(0)",
    transition: "ease-in 0.25s",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "100%",
      border: "none",
    },
  },
  chatNamesHidden: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    width: "360px",
    maxWidth: "360px",
    borderRight: `1px solid ${theme.palette.divider}`,
    listStyle: "none",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "100%",
      border: "none",
      transform: "translateX(-101%)",
      transition: "ease-in 0.25s",
    },
  },
  inputWrapper: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    boxSizing: "border-box",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  txtInput: {
    borderRadius: "40px",
    outline: "none",
    border: `1px solid ${theme.palette.divider}`,
    height: "38px",
    width: "100%",
    boxSizing: "border-box",
    padding: "16px",
    color: theme.palette.text.primary,
    background: theme.palette.background.bg,
    fontSize: "0.9rem",
    "&:hover": {
      borderColor: "rgba(0,0,0,0.2)",
    },
    "&:focus": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&:disabled": {
      background: theme.palette.divider,
      color: theme.palette.divider,
    },
  },
}));

const Messages = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const { path } = useRouteMatch();
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  // local state management
  const [searchChat, setSearchChat] = React.useState("");
  const [showMsgList, setShowMsgList] = React.useState(true);
  const [selectedConv, setSelectedConv] = React.useState(
    message.getConversationsData?.length > 0
      ? message.getConversationsData[0]
      : undefined
  );

  // get all conversation on component mount
  React.useEffect(() => {
    // dispatch get all conversation action
    dispatch(getConversation());
  }, []);

  return (
    <Switch>
      <Route path={path} exact>
        <Page title="Wilswork | Messages">
          {message.getConversationsLoading ? (
            <Loader />
          ) : (
            <div className={cls.root}>
              {/* for mobile */}
              <Hidden mdUp>
                {showMsgList ? (
                  <ul
                    className={
                      showMsgList ? cls.chatNamesVisible : cls.chatNamesHidden
                    }
                  >
                    <div className={cls.inputWrapper}>
                      <input
                        type="text"
                        placeholder="Search here"
                        value={searchChat}
                        onChange={(e) => setSearchChat(e.target.value)}
                        className={cls.txtInput}
                      />
                    </div>
                    {message.getConversationsData?.length > 0 ? (
                      message.getConversationsData.map((conversation) => (
                        <Userstamp
                          key={conversation._id}
                          setShowMsgList={setShowMsgList}
                          conversation={conversation}
                          setSelectedConv={setSelectedConv}
                          selectedConv={selectedConv}
                        />
                      ))
                    ) : (
                      <Alert severity="warning">
                        Your message box is empty.
                      </Alert>
                    )}
                  </ul>
                ) : (
                  <MessageArea
                    setShowMsgList={setShowMsgList}
                    selectedConv={selectedConv}
                  />
                )}
              </Hidden>
              {/* for pc */}
              <Hidden smDown>
                <ul
                  className={
                    showMsgList ? cls.chatNamesVisible : cls.chatNamesHidden
                  }
                >
                  <div className={cls.inputWrapper}>
                    <input
                      type="text"
                      placeholder="Search here"
                      value={searchChat}
                      onChange={(e) => setSearchChat(e.target.value)}
                      className={cls.txtInput}
                    />
                  </div>
                  {message.getConversationsData?.length > 0 ? (
                    message.getConversationsData.map((conversation) => (
                      <Userstamp
                        key={conversation._id}
                        setShowMsgList={setShowMsgList}
                        conversation={conversation}
                        setSelectedConv={setSelectedConv}
                        selectedConv={selectedConv}
                      />
                    ))
                  ) : (
                    <Alert severity="warning">Your message box is empty.</Alert>
                  )}
                </ul>
                <MessageArea
                  setShowMsgList={setShowMsgList}
                  selectedConv={selectedConv}
                />
              </Hidden>
            </div>
          )}
        </Page>
      </Route>
    </Switch>
  );
};

export default Messages;
