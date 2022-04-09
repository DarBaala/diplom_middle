/// Товарищ Юсуп, данная функция отвечает за отклик кнопки "Выбрать клуб"
const chooseClub = () => {
  const clubList = document.getElementById("club");
  const bodyClub = document.getElementById("body-club");
  document.body.addEventListener("click", (event) => {
    let target = event.target;
    if (target === clubList) {
      bodyClub.style.display = "block";
    } else if (target !== clubList) {
      bodyClub.style.display = "none";
    }
  });
};
chooseClub();
