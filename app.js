const tableRow = document.querySelectorAll(".table__row");

Array.from(tableRow).forEach((row) => {
  console.log("hi");
  console.log(row);
  row.addEventListener("click", () => {
    row.nextElementSibling.classList.add("list-item__children--active");
  });
});
