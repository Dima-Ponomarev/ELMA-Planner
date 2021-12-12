class Task {
  constructor(task, remove) {
    this.remove = remove;
    this.task = task;
  }

  createTaskElement = () => {
    const { subject, description } = this.task;

    const listItem = document.createElement("li");
    listItem.className = "backlog-item";
    listItem.id = this.task.id;
    listItem.setAttribute("draggable", true);

    listItem.addEventListener("dragstart", this.dragStart);
    listItem.addEventListener("dragend", this.dragEnd);

    const titleElement = document.createElement("p");
    titleElement.className = "backlog-item-title";
    titleElement.innerText = subject;

    listItem.append(titleElement);

    //append description if it exists
    if (description) {
      const descriptionElement = document.createElement("p");
      subjectdescriptionElementText.className = "backlog-item-description";
      descriptionElement.innerText = description;

      listItem.append(descriptionElement);
    }

    this.element = listItem;

    return listItem;
  };

  dragStart = (e) => {
    setTimeout(() => {
      this.element.classList.add("invisible");
    }, 0);

    const dragData = JSON.stringify(this.task);
    e.dataTransfer.setData("text/plain", dragData);
    e.dataTransfer.dropEffect = "data";
  };

  dragEnd = () => {
    this.element.classList.remove("invisible");
  };
}

export default Task;
