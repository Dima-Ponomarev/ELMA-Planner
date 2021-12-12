class Backlog {
  constructor(tasks) {
    this.tasks = tasks;
    this.container = document.getElementById("backlog");
    this.renderBacklog();
  }

  renderBacklog() {
    const backlogHeader = document.createElement("h2");
    backlogHeader.className = "backlog-header";
    const backlogHeaderText = document.createElement("p");
    backlogHeaderText.innerText = "Backlog";

    backlogHeader.append(backlogHeaderText);

    const list = document.createElement("ul");
    list.className = "backlog-list";

    this.tasks.forEach((task) => {
      const listItem = task.createTaskElement();
      list.append(listItem);
    });

    this.container.append(backlogHeader);
    this.container.append(list);
  }
}

export default Backlog;
