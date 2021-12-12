import moment from "moment";

const getWeekDates = (currentDate) => {
  const week = [];

  const weekStart = currentDate.clone().startOf("isoWeek");

  for (let i = 0; i < 7; i++) {
    week.push(moment(weekStart).add(i, "days"));
  }

  return week;
};

export default getWeekDates;
