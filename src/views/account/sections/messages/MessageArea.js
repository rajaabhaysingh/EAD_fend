import React from "react";
import clsx from "clsx";
import { useRef } from "react";
import { io } from "socket.io-client";

// styling
import { Avatar, Hidden, IconButton, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// components
import Loader from "../../../../components/loader";

// assets
import chat_bg from "../../../../assets/img/chat_bg.svg";

// colors

// icons
import { ChevronLeft, MoreVert } from "@material-ui/icons";

// redux
import { useDispatch, useSelector } from "react-redux";

// helpers
import getInitials from "../../../../helpers/getInitials";
import { generateName, timeAgo } from "../../../../helpers/misc";
import {
  addSocketMessage,
  getMessages,
  newMessage,
} from "../../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundImage: `url(${chat_bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
  },
  chatHeader: {
    height: "60px",
    width: "100%",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "0 16px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    marginRight: "16px",
    padding: "0",
  },
  avatar2: {
    marginLeft: "16px",
    padding: "0",
  },
  chatMessages: {
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    flex: "1",
    padding: "16px",
    boxSizing: "border-box",
  },
  msgBlockSent: {
    display: "flex",
    marginTop: "12px",
    alignSelf: "flex-end",
  },
  msgBlockReceived: {
    display: "flex",
    marginTop: "12px",
    alignSelf: "flex-start",
  },
  msgReceived: {
    padding: "8px",
    background: theme.palette.background.paper,
    borderRadius: "8px",
    fontSize: "0.9rem",
    color: theme.palette.text.secondary,
  },
  msgSent: {
    padding: "8px",
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: "8px",
    fontSize: "0.9rem",
  },
  msgUtils: {
    fontSize: "0.7rem",
    // fontWeight: "bold",
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    boxSizing: "border-box",
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  txtInput: {
    borderRadius: "40px 0 0 40px",
    outline: "none",
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.bg,
    height: "38px",
    width: "100%",
    boxSizing: "border-box",
    padding: "16px",
    color: theme.palette.text.primary,
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
  msgSend: {
    height: "38px",
    borderRadius: "0 40px 40px 0",
    outline: "none",
    border: "none",
    padding: "0 16px",
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const MessageArea = ({ setShowMsgList, selectedConv }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const auth = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const socket = useRef();

  // local state management
  const [msgTyped, setMsgTyped] = React.useState("");
  const [msgReceived, setMsgReceived] = React.useState(null);

  // getting out target user from conversation members list
  let targetUser = undefined;

  for (const member of selectedConv?.members) {
    if (member._id != auth.user?._id) {
      targetUser = member;
    }
  }

  // connect to socket on component mount
  React.useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    socket.current.on("getMessage", (data) => {
      console.log(data);
      // dispatch add message eventfrom socket
      setMsgReceived({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // on every new message received
  React.useEffect(() => {
    dispatch(
      addSocketMessage(
        {
          sender: msgReceived?.sender,
          text: msgReceived?.text,
          createdAt: Date.now(),
        },
        msgReceived?.sender
      )
    );
  }, [msgReceived]);

  // add users to socket server as they connect
  React.useEffect(() => {
    socket.current.emit("addUser", auth.user?._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [auth.user]);

  // load messages each time selectedConv is changed
  React.useEffect(() => {
    dispatch(getMessages(selectedConv._id));
  }, [selectedConv]);

  // scroll on each new message received
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  // handleMsgSend
  const handleMsgSend = (e) => {
    e.preventDefault();

    if (!msgTyped) {
      alert("Cannot send empty message.");

      return;
    }

    // sending message through socket server
    socket.current.emit("sendMessage", {
      senderId: auth?.user._id,
      receiverId: targetUser?._id,
      text: msgTyped,
    });

    // dispatch database action
    dispatch(
      newMessage({
        text: msgTyped,
        conversationId: selectedConv._id,
      })
    );

    setMsgTyped("");
  };

  return message.getMessagesByConvIdLoading ? (
    <Loader />
  ) : message.getMessagesByConvIdSuccess ? (
    <div className={cls.root}>
      <div className={cls.chatHeader}>
        <div className="fc">
          <Hidden mdUp>
            <IconButton
              style={{ marginRight: "8px" }}
              onClick={() => setShowMsgList(true)}
            >
              <ChevronLeft />
            </IconButton>
          </Hidden>
          <Avatar
            className={cls.avatar}
            src={process.env.REACT_APP_BASE_URL + targetUser?.profilePicture}
          >
            {getInitials(
              generateName(
                targetUser?.firstName,
                targetUser?.middleName,
                targetUser?.lastName
              )
            )}
          </Avatar>
          <div className={clsx(globalCls.txtMdPri, "fwb")}>
            {generateName(
              targetUser?.firstName,
              targetUser?.middleName,
              targetUser?.lastName
            )}
          </div>
        </div>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
      <div className={cls.chatMessages}>
        {message.getMessagesByConvIdData?.length > 0 ? (
          message.getMessagesByConvIdData.map((message) =>
            message.sender == auth.user._id ? (
              <div className={cls.msgBlockSent} ref={scrollRef}>
                <div className={cls.msgSent}>
                  <div className="fcol">
                    <div className="">{message.text}</div>
                    <div className={clsx("fend mar_t-4 fc", cls.msgUtils)}>
                      <span>{timeAgo(message.createdAt)}</span>{" "}
                      <i className="fas fa-check mar_l-8"></i>
                    </div>
                  </div>
                </div>
                <Avatar
                  className={cls.avatar2}
                  src={
                    process.env.REACT_APP_BASE_URL + auth.user?.profilePicture
                  }
                >
                  {getInitials(
                    generateName(
                      auth.user?.firstName,
                      auth.user?.middleName,
                      auth.user?.lastName
                    )
                  )}
                </Avatar>
              </div>
            ) : (
              <div className={cls.msgBlockReceived} ref={scrollRef}>
                <Avatar
                  className={cls.avatar}
                  src={
                    process.env.REACT_APP_BASE_URL + targetUser?.profilePicture
                  }
                >
                  {getInitials(
                    generateName(
                      targetUser?.firstName,
                      targetUser?.middleName,
                      targetUser?.lastName
                    )
                  )}
                </Avatar>
                <div className={cls.msgReceived}>
                  <div className="fcol">
                    <div className="">{message.text}</div>
                    <div className={clsx("fend mar_t-4 fc", cls.msgUtils)}>
                      <span>{timeAgo(message.createdAt)}</span>{" "}
                      <i className="fas fa-check mar_l-8"></i>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <Alert severity="info">Send your first message below...</Alert>
        )}
      </div>
      <form className={cls.inputArea} onSubmit={handleMsgSend}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msgTyped}
          onChange={(e) => setMsgTyped(e.target.value)}
          className={cls.txtInput}
        />
        <button className={cls.msgSend}>SEND</button>
      </form>
    </div>
  ) : message.getMessagesByConvIdError ? (
    <Alert severity="error">{message.getMessagesByConvIdError}</Alert>
  ) : (
    <Loader />
  );
};

export default MessageArea;
