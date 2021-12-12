import moment from "moment";

class User {
  constructor(data) {
    this.id = data.id;
    const middleName = data.secondName.length ? ` ${data.secondName} ` : " ";
    this.name = data.firstName + middleName + data.surname;
    this.username = data.username;
    this.tasks = data.tasks;
  }

  createRow = (currentWeek) => {
    //save current week
    this.currentWeek = currentWeek;

    //container
    const rowContainer = document.createElement("div");
    rowContainer.className = "row";

    //name
    const nameCell = document.createElement("div");
    nameCell.className = "cell name-cell";

    //add drag events
    nameCell.addEventListener("dragover", this.onDragOverCell);
    nameCell.addEventListener("dragenter", this.onDragEnterCell);
    nameCell.addEventListener("dragleave", this.onDragLeaveCell);
    nameCell.addEventListener("drop", this.onDragDrop);

    const nameText = document.createElement("p");
    nameText.className = "cell-text";
    nameText.innerText = this.name;

    nameCell.append(nameText);
    rowContainer.append(nameCell);

    //planer days
    for (let day = 0; day < 7; day++) {
      const dayCell = document.createElement("div");
      dayCell.className = "cell day-cell";
      dayCell.dataset.date = currentWeek[day].format("YYYY-MM-DD");

      const dayTask = this.tasks.find((task) => {
        return (
          currentWeek[day] >= task.planStartDate &&
          currentWeek[day] <= task.planEndDate
        );
      });
      if (dayTask) {
        //create tooltip
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.innerText = dayTask.description || "Tooltip text";
        dayCell.append(tooltip);

        dayCell.classList.add("active");
        const cellText = document.createElement("p");
        cellText.className = "cell-text";
        cellText.innerText = dayTask.subject;

        dayCell.append(cellText);
      } else {
        dayCell.addEventListener("dragover", this.onDragOverCell);
        dayCell.addEventListener("dragenter", this.onDragEnterCell);
        dayCell.addEventListener("dragleave", this.onDragLeaveCell);
        dayCell.addEventListener("drop", this.onDragDrop);
      }

      rowContainer.append(dayCell);
    }

    return rowContainer;
  };

  onDragOverCell = (e) => {
    e.preventDefault();
  };
  onDragEnterCell = (e) => {
    e.preventDefault();

    //apply hovered styles if cell is not name cell
    if (e.target.dataset.date) {
      e.target.classList.add("hovered");
    }
  };
  onDragLeaveCell = (e) => {
    e.target.classList.remove("hovered");
  };
  onDragDrop = (e) => {
    //get data
    const transferedData = e.dataTransfer.getData("text/plain");
    const task = JSON.parse(transferedData);

    let planStart = moment(task.planStartDate);
    let planEnd = moment(task.planEndDate);
    const planDayDifference = planEnd.diff(planStart, "days");

    //change plan date if dragged to date cell
    if (e.target.dataset.date) {
      planStart = moment(e.target.dataset.date, "YYYY-MM-DD");
      planEnd = planStart.clone().add(planDayDifference, "day");
    }

    //save data
    this.tasks.push({
      ...task,
      planStartDate: planStart,
      planEndDate: planEnd,
    });

    //remove task from backlog
    const taskElement = document.getElementById(task.id);
    taskElement.remove();

    const newRowChildren = [...this.createRow(this.currentWeek).children];
    const currentRow = e.target.closest(".row");
    currentRow.innerHTML = "";
    newRowChildren.forEach((element) => {
      currentRow.append(element);
    });

    //TODO: check if user has planned task on chosen dates

    //remove event listeners
    e.target.removeEventListener("dragover", this.onDragOverCell);
    e.target.removeEventListener("dragenter", this.onDragEnterCell);
    e.target.removeEventListener("dragleave", this.onDragLeaveCell);
    e.target.removeEventListener("drop", this.onDragDrop);
  };
}

export default User;
