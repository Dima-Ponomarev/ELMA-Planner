class Backlog {
  constructor(tasks) {
    this.tasks = tasks;
    this.container = document.getElementById("backlog");
    this.renderBacklog();
  }

  renderBacklog() {
    const list = document.createElement("ul");
    list.className = "backlog-list";

    this.tasks.forEach((task) => {
      const listItem = task.createTaskElement();
      list.append(listItem);
    });

    this.container.append(list);
  }
}

export default Backlog;
