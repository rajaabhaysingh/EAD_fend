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
