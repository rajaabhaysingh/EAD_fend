import moment from "moment";

export const timeAgo = (time) => {
  return moment(time).fromNow();
};

export const generateName = (f, m, l) => {
  if (!f || !l) {
    return "Name unavailable";
  }

  if (m) {
    return f + " " + m + " " + l;
  } else {
    return f + " " + l;
  }
};

export const parseDate = (date) => {
  return moment(date).format("DD MMM YYYY");
};

export const parseDateTime = (date) => {
  return moment(date).format("DD MMM YYYY h:mm A");
};

export const isExpired = (date) => {
  return moment(date).diff(moment(new Date())) > 0 ? true : false;
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return true;
  } else {
    return false;
  }
};
