class Task {
  constructor(task) {
    this.task = task;
  }

  createTaskElement = () => {
    const { subject, description } = this.task;

    const listItem = document.createElement("li");
    listItem.className = "backlog-item";

    const titleElement = document.createElement("p");
    titleElement.className = "backlog-item-title";
    titleElement.innerText = subject;

    if (description) {
      const descriptionElement = document.createElement("p");
      subjectdescriptionElementText.className = "backlog-item-description";
      descriptionElement.innerText = description;

      listItem.append(descriptionElement);
    }

    listItem.append(subjectText);

    return listItem;
  };
}

export default Task;
