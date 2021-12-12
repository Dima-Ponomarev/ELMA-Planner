import getWeekDates from "./utils/getWeekDates";

class User {
  constructor(data) {
    this.id = data.id;
    const middleName = data.secondName.length ? ` ${data.secondName} ` : " ";
    this.name = data.firstName + middleName + data.surname;
    this.username = data.username;
    this.tasks = data.tasks;
  }

  createRow = (currentWeek) => {
    const rowContainer = document.createElement("div");
    rowContainer.className = "row";

    const nameCell = document.createElement("div");
    nameCell.className = "cell name-cell";

    const nameText = document.createElement("p");
    nameText.className = "cell-text";
    nameText.innerText = this.name;

    nameCell.append(nameText);
    rowContainer.append(nameCell);

    for (let day = 0; day < 7; day++) {
      const dayCell = document.createElement("div");
      dayCell.className = "cell day-cell";

      const dayTask = this.tasks.find((task) => {
        return (
          currentWeek[day] >= task.planStartDate &&
          currentWeek[day] <= task.planEndDate
        );
      });
      if (dayTask) {
        dayCell.classList.add("active");

        const cellText = document.createElement("p");
        cellText.className = "cell-text";
        cellText.innerText = dayTask.subject;

        dayCell.append(cellText);
      }

      rowContainer.append(dayCell);
    }

    return rowContainer;
  };
}

export default User;
