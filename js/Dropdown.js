const dropdown = document.querySelectorAll(".dropdown");
const dropContent = document.querySelectorAll(".drop-content");
const labels = document.querySelectorAll(".checkbox-container");

dropdown.forEach((dropdown, index) => {
  dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("dropdown-open");
    if (dropContent[index].style.maxHeight != `${dropContent[index].length * 48}px`) {
      dropContent[index].style.maxHeight = `${dropContent[index].length * 48}px`;
    } else {
      dropContent[index].style.maxHeight = "0px";
    }
  });
});
