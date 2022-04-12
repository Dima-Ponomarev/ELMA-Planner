const elementTemplate = document.querySelector(".schedule__template");
const optionsPopupTemplate = document.querySelector(".options-template");
const optionsLegalPopupTemplate = document.querySelector(
  ".options-template__legal"
);
const optionsPositionPopupTemplate = document.querySelector(
  ".options-template__position"
);

const getData = async () => {
  const fetchData = await fetch("./data.json");
  const data = await fetchData.json();
  console.log(data);
  return data;
};

const generateBranch = async (branch, root, level) => {
  const element = elementTemplate.content.cloneNode(true);
  const descriptionElement = element.querySelector(".list-item__text");
  descriptionElement.innerText = branch.description;

  const nameElement = element.querySelector(".list-item-container");
  nameElement.style.paddingLeft = `${27 + level * 36}px`;
  if (branch.children) {
    nameElement.classList.add("list-item__department");

    const tableRow = element.querySelector(".table__row");
    tableRow.addEventListener("click", () => {
      const arrow = tableRow.querySelector(".list-item__arrow");
      arrow.classList.toggle("list-item__arrow--active");
      tableRow.nextElementSibling.classList.toggle(
        "list-item__children--active"
      );
    });
    const newRoot = element.querySelector(".list-item__children");
    const departments = branch.children.filter((child) => !!child.children);
    const positions = branch.children.filter((child) => !child.children);
    departments.forEach((child) => {
      generateBranch(child, newRoot, level + 1);
    });

    positions.forEach((child) => {
      generateBranch(child, newRoot, level + 1);
    });

    const actionsElement = element.querySelector(".list-item__actions");

    let optionsPopup;
    if (level === 0) {
      optionsPopup = optionsLegalPopupTemplate.content.cloneNode(true);
    } else {
      optionsPopup = optionsPopupTemplate.content.cloneNode(true);
      const addDepBtn = optionsPopup.querySelector(
        ".option-list__add-position"
      );
      addDepBtn.addEventListener("click", () => {
        console.log("add position");
      });
    }

    const addDepBtn = optionsPopup.querySelector(
      ".option-list__add-department"
    );
    addDepBtn.addEventListener("click", () => {
      console.log("add dep");
    });

    const deleteBtn = optionsPopup.querySelector(".option-list__delete");
    deleteBtn.addEventListener("click", () => {
      console.log("delete");
    });
    actionsElement.append(optionsPopup);

    actionsElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const isCloseCurrent = !!event.target.querySelector(
        ".list-item__options-popup--active"
      );

      if (!isCloseCurrent) {
        const activePopup = document.querySelector(
          ".list-item__options-popup--active"
        );
        if (!!activePopup) {
          activePopup.classList.remove("list-item__options-popup--active");
        }

        const activeOption = document.querySelector(
          ".list-item__actions--active"
        );
        if (!!activeOption) {
          activeOption.classList.remove("list-item__actions--active");
        }
      }

      actionsElement.classList.toggle("list-item__actions--active");
      const popup = actionsElement.querySelector(".list-item__options-popup");
      popup.classList.toggle("list-item__options-popup--active");
    });
  } else {
    nameElement.classList.add("list-item__position");
    const amountElement = element.querySelector(".list-item__amount");
    const dateElement = element.querySelector(".list-item__date");
    const salaryElement = element.querySelector(".list-item__salary");

    amountElement.innerText = "1";
    dateElement.innerText = "20.03.2022";
    salaryElement.innerText = "90000";

    //-----------------------------

    const actionsElement = element.querySelector(".list-item__actions");

    const optionsPopup = optionsPositionPopupTemplate.content.cloneNode(true);

    const deleteBtn = optionsPopup.querySelector(".option-list__delete");
    deleteBtn.addEventListener("click", () => {
      console.log("delete");
    });
    actionsElement.append(optionsPopup);

    actionsElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const isCloseCurrent = !!event.target.querySelector(
        ".list-item__options-popup--active"
      );

      if (!isCloseCurrent) {
        const activePopup = document.querySelector(
          ".list-item__options-popup--active"
        );
        if (!!activePopup) {
          activePopup.classList.remove("list-item__options-popup--active");
        }

        const activeOption = document.querySelector(
          ".list-item__actions--active"
        );
        if (!!activeOption) {
          activeOption.classList.remove("list-item__actions--active");
        }
      }

      actionsElement.classList.toggle("list-item__actions--active");
      const popup = actionsElement.querySelector(".list-item__options-popup");
      popup.classList.toggle("list-item__options-popup--active");
    });
  }

  root.append(element);
};

const generateList = async (data, rootElement) => {
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      const element = generateBranch(data.children[i], rootElement, 0);
    }
  }
};

const init = async () => {
  const root = document.querySelector(".wrapper");

  const data = await getData();

  generateList(data, root);
};

init();
