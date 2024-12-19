const Popup = document.querySelector(".popup");
shortTime = 1000
longTime = 2000

function ShowPopUp(message, time) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  document.getElementById('main').appendChild(popup);
  popup.textContent = message;
  popup.style.transition = "0.3s";
  popup.textContent = message;
  setTimeout(() => {
    popup.style.zIndex = "1";
    popup.style.opacity = 1;
    popup.style.marginTop = "20px";
  }, 1);
  setTimeout(() => {
    popup.style.opacity = "";
    setTimeout(() => {
      popup.style.zIndex = "-1";
      popup.remove();
    }, 400);
  }, time);
  popup.addEventListener("click", () => {
    popup.style.opacity = "";
    setTimeout(() => {
      popup.remove();
      popup.style.zIndex = "-1";
    }, 300);
  });
}
