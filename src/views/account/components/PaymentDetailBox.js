import React from "react";
import clsx from "clsx";
import { parseDateTime } from "../../../helpers/misc";

// components

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    marginTop: "16px",
    display: "flex",
  },
  greenBead: {
    position: "absolute",
    top: "22px",
    borderRadius: "20px",
    padding: "5px",
    background: theme.palette.success.main,
    height: "16px",
    width: "16px",
    boxSizing: "border-box",
  },
  redBead: {
    position: "absolute",
    top: "22px",
    borderRadius: "20px",
    padding: "5px",
    background: theme.palette.error.main,
    height: "16px",
    width: "16px",
    boxSizing: "border-box",
  },
  roundBeadInside: {
    height: "6px",
    width: "6px",
    background: theme.palette.background.bg,
    borderRadius: "20px",
    boxShadow: "0 2px 2px rgba(0,0,0,0.5)",
  },
  line: {
    height: "100%",
    width: "1px",
    background: theme.palette.divider,
  },
  paySuccess: {
    padding: "0px 8px",
    color: theme.palette.common.white,
    fontSize: "0.8rem",
    borderRadius: "24px",
    background: theme.palette.success.main,
  },
  payFailed: {
    padding: "0px 8px",
    color: theme.palette.common.white,
    fontSize: "0.8rem",
    borderRadius: "24px",
    background: theme.palette.error.main,
  },
}));

const PaymentDetailBox = ({ paymentObj }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={cls.root}>
      <div className={clsx("fccc", "rel")}>
        <div
          className={
            paymentObj.status === "captured" ? cls.greenBead : cls.redBead
          }
        >
          <div className={cls.roundBeadInside}></div>
        </div>
        <div className={cls.line}></div>
      </div>
      <div className="fcol mar_l-24">
        <div className={clsx("fwb", globalCls.txtSmSec)}>
          {parseDateTime(paymentObj.createdAt)}{" "}
          {paymentObj.verified ? (
            <i className="fas mar_l-8 fa-check-circle"></i>
          ) : (
            <i className="fas mar_l-8 fa-times-circle"></i>
          )}
        </div>
        <div className={clsx("fc")}>
          <div
            className={
              paymentObj.status === "captured"
                ? globalCls.txtLgPriCol
                : globalCls.txtLgErr
            }
          >
            <strong>
              ₹ {(parseFloat(paymentObj.amount) / 100).toFixed(2)}
            </strong>
          </div>
          {paymentObj.status === "captured" ? (
            <div className={clsx("mar_l-8", cls.paySuccess)}>
              Payment successful
            </div>
          ) : (
            <div className={clsx("mar_l-8", cls.payFailed)}>Payment failed</div>
          )}
        </div>
        <div className={clsx("", globalCls.txtSmSec)}>
          Id: {paymentObj.rzp_order_id}
        </div>
        <div className={clsx("mar_t-4", globalCls.txtSmPri)}>
          {paymentObj.desc}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailBox;
