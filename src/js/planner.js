import getWeekDates from "./utils/getWeekDates";
import moment from "moment";

class Planner {
  constructor(users) {
    this.users = users;
    this.currentStartDate = moment();
    this.container = document.getElementById("planner");

    //render
    this.initControlButtons();
    this.renderTable();
  }

  initControlButtons = () => {
    const prevButton = document.querySelector(".button-prev");
    const nextButton = document.querySelector(".button-next");

    //show previous week
    prevButton.addEventListener("click", () => {
      this.currentStartDate = this.currentStartDate.subtract(7, "day");
      this.rerender();
    });

    //show next week
    nextButton.addEventListener("click", () => {
      this.currentStartDate = this.currentStartDate.add(7, "day");
      this.rerender();
    });
  };

  renderTable = () => {
    const currentWeek = getWeekDates(this.currentStartDate);

    //create header
    const headerRow = document.createElement("div");
    headerRow.className = "row header-row";
    const emptyCell = document.createElement("div");
    emptyCell.className = "header-cell cell name-cell";
    headerRow.append(emptyCell);

    for (let day = 0; day < 7; day++) {
      const month = String(currentWeek[day].month() + 1).padStart(2, "0");
      const dayOfMonth = String(currentWeek[day].date());

      const dayCell = document.createElement("div");
      dayCell.className = "cell header-cell";
      dayCell.innerText = `${month}.${dayOfMonth}`;

      headerRow.append(dayCell);
    }

    this.container.append(headerRow);

    //create row for each user
    this.users.forEach((user) => {
      const row = user.createRow(currentWeek);
      this.container.append(row);
    });
  };

  rerender = () => {
    const tableContainer = document.getElementById("planner");
    tableContainer.innerHTML = "";
    this.renderTable();
  };
}

export default Planner;
