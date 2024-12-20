const dropdown = document.querySelectorAll(".dropdown");
const dropContent = document.querySelectorAll(".drop-content");
const dropManager = document.querySelectorAll(".drop-manager");
const labels = document.querySelectorAll(".checkbox-container");
let filterOpen = false;
let orderOpen = false;

document.addEventListener('click', (event) => {
  if (!dropManager[0].contains(event.target) && !dropManager[1].contains(event.target)) {
    dropContent.forEach((dropContent) => {
      dropContent.style.maxHeight = "0px";
    });
    dropdown.forEach((dropdown) => {
      dropdown.classList.remove('dropdown-open')
    });
  }
});


dropdown.forEach((dropdown, index) => {
  dropdown.addEventListener("click", () => {
    if (index === 0) {
      if (!filterOpen) {
        filterOpen = true
      } else {
        filterOpen = false
      }
    } else {
      if (!orderOpen) {
        orderOpen = true
      } else {
        orderOpen = false
      }
    }
    dropdown.classList.toggle("dropdown-open");
    if (dropContent[index].style.maxHeight != `${dropContent[index].length * 48}px` && dropContent[index].length < 5) {
      dropContent[index].style.maxHeight = `${dropContent[index].length * 48}px`;
    } else if (dropContent[index].style.maxHeight != "232px" && dropContent[index].length > 5) {
      dropContent[index].style.maxHeight = "232px";
    } else {
      dropContent[index].style.maxHeight = "0px";
    }
  });
});

function checkFilters() {
  const checkboxes = document.querySelectorAll('.drop-content input[type="checkbox"]');

  const checkedTexts = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.parentNode.textContent.trim());

  return checkedTexts; // Retorna os textos das checkboxes marcadas
}


function checkChecked() {
  const checkboxes = document.querySelectorAll('#roleFilter input[type="checkbox"]');

  const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

  document.getElementById('firstDropdownText').textContent = `Filtros (${checkedCount})`
}

document.getElementById('roleFilter').addEventListener('click', () => {
  checkChecked();
  checkFilters();
  fetchMembers();
})