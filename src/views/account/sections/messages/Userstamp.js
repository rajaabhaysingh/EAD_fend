import React from "react";
import clsx from "clsx";

// components

// helpers
import getInitials from "../../../../helpers/getInitials";
import { generateName, timeAgo } from "../../../../helpers/misc";

// styling
import { Avatar, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../../styles/globalStyles";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    display: "flex",
    alignItems: "center",
    padding: "16px",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  active: {
    backgroundColor: theme.palette.background.paper,
  },
  chatUiBox: {
    display: "flex",
    flex: "1",
  },
  avatar: {
    marginRight: "16px",
  },
}));

const Userstamp = ({
  conversation,
  setShowMsgList,
  setSelectedConv,
  selectedConv,
}) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const auth = useSelector((state) => state.auth);

  // getting out target user from conversation members list
  let targetUser = undefined;

  for (const member of conversation.members) {
    if (member._id != auth.user?._id) {
      targetUser = member;
    }
  }

  return (
    <div
      className={
        selectedConv?._id == conversation._id
          ? clsx(cls.root, cls.active)
          : cls.root
      }
      onClick={() => {
        setShowMsgList(false);
        setSelectedConv(conversation);
      }}
    >
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
      <div className="fcol of_hid">
        <div className={clsx(globalCls.txtMdPri, "fwb")}>
          {generateName(
            targetUser?.firstName,
            targetUser?.middleName,
            targetUser?.lastName
          )}
        </div>
        {/* <div className={clsx(globalCls.txtSmSec, "mar_t-4 ellipsis")}>
          Hello dear Singh, please contact website admins SOON...
        </div> */}
        <div className={clsx(globalCls.txtSmPriCol, "mar_t-4")}>
          {timeAgo(conversation.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default Userstamp;
