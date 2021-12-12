import "./scss/app.scss";
import Planner from "./js/planner";
import User from "./js/user";
import moment from "moment";

const fetchUsers = async () => {
  const res = await fetch(
    "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users?limit=15"
  );
  return await res.json();
};

const fetchTasks = async () => {
  const res = await fetch(
    "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks"
  );
  return await res.json();
};

const parseInitialData = (users, tasks) => {
  let availibleTasks = tasks;
  const userCollection = users.map((user) => {
    const userTasks = [];

    availibleTasks = availibleTasks.filter((task) => {
      if (task.executor !== user.id) return true;
      userTasks.push({
        ...task,
        planStartDate: moment(task.planStartDate),
        planEndDate: moment(task.planEndDate),
      });
      return false;
    });

    return new User({
      ...user,
      tasks: userTasks,
    });
  });

  return {
    userCollection,
    backlog: availibleTasks,
  };
};

const init = async () => {
  //fetch data
  const users = await fetchUsers();
  const tasks = await fetchTasks();

  const data = parseInitialData(users, tasks);
  const table = new Planner(data.userCollection);
};

init();
