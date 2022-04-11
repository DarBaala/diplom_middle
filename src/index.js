"use strict";

/// (2 пункт ТЗ) Товарищ Юсуп, данная функция отвечает за отклик кнопки "Выбрать клуб"
const chooseClub = () => {
  const openClub = (event) => {
    let target = event.target;
    const clubList = document.getElementById("club"),
      bodyClub = document.getElementById("body-club");
    if (target === clubList) {
      bodyClub.style.display = "block";
    } else if (target !== bodyClub) {
      bodyClub.style.display = "none";
    }
  };
  document.body.addEventListener("click", openClub);
};
chooseClub();

/// (3 пункт ТЗ) Открывает модальное окно free_visit_form
const popupVisit = () => {
  const openVisit = (event) => {
    let target = event.target;
    const freeVisit = document.getElementById("free_visit_form"),
      closeIcon = document.getElementById("visit-close"),
      visitOverlay = document.getElementById("visit-overlay");
    if (target.closest(".open-popup")) {
      freeVisit.style.display = "flex";
    } else if (target === closeIcon || target === visitOverlay) {
      freeVisit.style.display = "none";
    }
  };
  document.body.addEventListener("click", openVisit);
};
popupVisit();

/// (4 пункт ТЗ) Открывается модальное окно callback_form
const callbackForm = () => {
  const openCallback = (event) => {
    let target = event.target;
    const buttonCallback = document.querySelector(".callback-btn"),
      overlayCallback = document.getElementById("overlay-callback"),
      callback = document.getElementById("callback_form"),
      closeCallback = document.getElementById("callback-close");
    if (target === buttonCallback) {
      callback.style.display = "flex";
    } else if (target === overlayCallback || target === closeCallback) {
      callback.style.display = "none";
    }
  };
  document.body.addEventListener("click", openCallback);
};
callbackForm();

/// (5 пункт ТЗ) Все формы на странице и в модальных окнах должны отправляться посредством ajax
const sendForm = (formName, color = "color: white;") => {
  const form = document.getElementById(formName),
    errorMessage = "Что-то пошло не так :(",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с Вами свяжемся!";
  let statusMessage = document.createElement("div");
  statusMessage.style.cssText = `${color} padding-top: 10px; font-size: 14px;`;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.appendChild(statusMessage);
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      statusMessage.textContent = loadMessage;
      if (request.readyState != 4) {
        return;
      }
      if (request.status === 200) {
        statusMessage.textContent = successMessage;
        form.reset();
      } else {
        statusMessage.textContent = errorMessage;
      }
    });
    request.open("POST", "./server.php");
    request.setRequestHeader("Content-Type", "multipart/form-data");
    const formData = new FormData(form);
    request.send(formData);
  });
};
sendForm("form1");
sendForm("form2");
sendForm("banner-form");
sendForm("card_order", "color: black;");
sendForm("footer_form");
