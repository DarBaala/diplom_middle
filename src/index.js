"use strict";

/// (2 пункт ТЗ) Товарищ Юсуп, данная функция отвечает за отклик кнопки "Выбрать клуб"
const chooseClub = () => {
  const clubList = document.getElementById("club");
  const bodyClub = document.getElementById("body-club");
  clubList.addEventListener("click", () => {
    document.body.addEventListener("click", (event) => {
      bodyClub.style.display = "block";
      let target = event.target;
      if (target === clubList) {
        bodyClub.style.display = "block";
      } else if (target !== clubList) {
        bodyClub.style.display = "none";
      }
    });
  });
};
chooseClub();
/// (3 пункт ТЗ) Открывает модальное окно free_visit_form
const popup = () => {
  const openPopup = document.getElementById("free_visit_form");
  const popupActive = document.querySelector(".popup-free_visit_form");
  const overlayClose = document.querySelector(".form-wrapper");
  openPopup.addEventListener("click", () => {
    document.body.addEventListener("click", (event) => {
      popupActive.style.display = "block";
      let target = event.target;
      if (target === openPopup) {
        popupActive.style.display = "block";
      }
      if (target !== overlayClose) {
        console.log(555);
      }
    });
  });
};
popup();
//free_visit_form
const formWrapper = document.querySelector(".form-content");
