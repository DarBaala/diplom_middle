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
const sendForm = (
  formName,
  linkCheck = "card_leto_mozaika",
  color = "color: white;"
) => {
  const form = document.getElementById(formName),
    errorMessage = "Что-то пошло не так :(",
    loadMessage = "Загрузка...",
    oncheck = "Пожалуйста, примите пользовательское соглашение!",
    thanks = document.getElementById("thanks");
  const thanksModal = () => {
    thanks.style.display = "flex";
    const thanksOverlay = document.getElementById("overlay-thanks"),
      thanksClose = document.getElementById("close-thanks"),
      thanksOkay = document.getElementById("thanks-okay");
    document.body.addEventListener("click", (event) => {
      let target = event.target;
      if (
        target === thanksOverlay ||
        target === thanksClose ||
        target === thanksOkay
      ) {
        thanks.style.display = "none";
      }
    });
  };
  let statusMessage = document.createElement("div");
  statusMessage.style.cssText = `${color} padding-top: 10px; font-size: 14px;`;
  const checkDom = document.getElementById(`${linkCheck}`);
  /// (8 пункт ТЗ) Запретить отправку если не стоит галочка согласен на обработку данных
  const check = (event) => {
    const target = event.target;
    if (target.matches('[type="submit"]')) {
      if (!checkDom.checked) {
        form.appendChild(statusMessage);
        statusMessage.textContent = oncheck;
      }
    }
  };
  document.body.addEventListener("click", check);
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
        const callback = document.getElementById("callback_form"),
          freeVisit = document.getElementById("free_visit_form");
        statusMessage.remove();
        callback.style.display = "none";
        freeVisit.style.display = "none";
        thanksModal();
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
sendForm("form1", "check");
sendForm("form2", "check2");
sendForm("banner-form", "check1");
sendForm("card_order", "card_check", "color: black;");
sendForm("footer_form");

/// Валидация форм отправки
const validForm = () => {
  const formNameInput = (event) => {
    const target = event.target;
    target.value = target.value.replace(/[^а-яё\s]/gi, "");
  };
  const formNameBlur = (event) => {
    const target = event.target;
    target.value = target.value
      .split(/\s+/)
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
      .join(" ");
  };
  const formePhoneInput = (event) => {
    const target = event.target;
    target.value = target.value.replace(/[^+\d]/g, "");
  };
  const formPhoneBlur = (event) => {
    const target = event.target;
    target.value = target.value.replace(/^[\s]+|[\s\+]{1,}$/g, "");
  };
  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches('[placeholder="Ваше имя..."]')) {
      target.addEventListener("input", formNameInput);
      target.addEventListener("blur", formNameBlur);
    } else if (target.matches('[placeholder="Ваш номер телефона..."]')) {
      target.addEventListener("input", formePhoneInput);
      target.addEventListener("blur", formPhoneBlur);
    }
  });
};
validForm();

/// (6 пункт ТЗ) Подарок
const gift = () => {
  const openGift = (event) => {
    let target = event.target;
    const iconGift = document.getElementById("gift-open"),
      modalGift = document.getElementById("gift"),
      closeGift = document.getElementById("close-gift"),
      giftOverlay = document.getElementById("overlay-gift"),
      giftOkay = document.getElementById("gift-ok");
    if (target === iconGift) {
      iconGift.style.cssText = "display: none";
      modalGift.style.display = "flex";
    } else if (
      target === closeGift ||
      target === giftOverlay ||
      target === giftOkay
    ) {
      modalGift.style.display = "none";
    }
  };
  document.body.addEventListener("click", openGift);
};
gift();

/// (7 пункт ТЗ) Слайдер
const slider = () => {
  const slide = document.querySelectorAll(".slide-off"),
    mainSlider = document.querySelector(".main-slider");
  mainSlider.style.cssText = "position: relative;";
  slide.forEach((item) => {
    item.style.cssText = "opacity: 0; position: absolute;";
  });
  slide[0].style.opacity = "1";
  let currentSlide = 0;
  const autoPlay = () => {
    slide[currentSlide].style.opacity = 0;
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    slide[currentSlide].style.opacity = 1;
  };
  const startSlide = () => {
    setInterval(autoPlay, 3000);
  };
  startSlide();
};
slider();

/// (9 пункт ТЗ) Реализовать слайдер карусель
const carouselServices = new SliderСarousel({
  nameSlider: "service",
  main: ".service-wrapper",
  wrap: ".services-slider",
  prev: "#services-prev",
  next: "#services-next",
  slidesToShow: 5,
  infinite: true,
});
carouselServices.init();

/// (10 пункт ТЗ) Реализовать слайдер карусель
const carouselGallery = new SliderСarousel({
  nameSlider: "gallery",
  main: ".gallery-wrapper",
  wrap: ".gallery-slider",
  prev: "#gallery-prev",
  next: "#gallery-next",
  slidesToShow: 1,
  infinite: true,
});
carouselGallery.init();

/// (11 пункт ТЗ) Реализовать калькулятор цены взять со страниц клубов
const cardsCalc = () => {
  const cardTarget = (event) => {
    let target = event.target;
    const cardMozaika = document.getElementById("card_leto_mozaika"),
      cardSchelkovo = document.getElementById("card_leto_schelkovo"),
      m1 = document.getElementById("m1"),
      m2 = document.getElementById("m2"),
      m3 = document.getElementById("m3"),
      m4 = document.getElementById("m4");
    let priceTotal = document.getElementById("price-total"),
      price = 1999,
      promoCard = document.getElementById("promo_card");
    const promo = () => {
      let pricePromo = Math.floor((price / 100) * 30);
      priceTotal.textContent = price - pricePromo;
    };
    if (target === cardMozaika && cardMozaika.checked) {
      price = 1999;
      priceTotal.textContent = price;
    }
    if (cardMozaika.checked && m1.checked) {
      price = 1999;
      priceTotal.textContent = price;
    }
    if (cardMozaika.checked && m2.checked) {
      price = 9990;
      priceTotal.textContent = price;
    }
    if (cardMozaika.checked && m3.checked) {
      price = 13900;
      priceTotal.textContent = price;
    }
    if (cardMozaika.checked && m4.checked) {
      price = 19900;
      priceTotal.textContent = price;
    }
    if (target === cardSchelkovo && cardSchelkovo.checked) {
      price = 2999;
      priceTotal.textContent = price;
    }
    if (cardSchelkovo.checked && m1.checked) {
      price = 2999;
      priceTotal.textContent = price;
    }
    if (cardSchelkovo.checked && m2.checked) {
      price = 14990;
      priceTotal.textContent = price;
    }
    if (cardSchelkovo.checked && m3.checked) {
      price = 21990;
      priceTotal.textContent = price;
    }
    if (cardSchelkovo.checked && m4.checked) {
      price = 24990;
      priceTotal.textContent = price;
    }
    if (
      promoCard.value === "ТЕЛО2019" ||
      promoCard.value === "Тело2019" ||
      promoCard.value === "тело2019"
    ) {
      promo();
    }
  };
  document.body.addEventListener("click", cardTarget);
};
cardsCalc();

/// (15 пункт ТЗ) Написать скрипт, чтобы при скролле ниже бургера, меню прилипала к верху
const burgerScroll = () => {
  const header = document.querySelector(".top-menu"),
    first = document.querySelector(".head-main"),
    headerHeight = header.offsetHeight,
    firstHeight = first.offsetHeight;
  console.log(firstHeight);
  window.addEventListener("scroll", () => {
    let scrollDistanse = window.scrollY;
    if (scrollDistanse > firstHeight) {
      header.classList.add("head-fixed");
      first.style.marginTop = `${headerHeight}px`;
    } else {
      header.classList.remove("head-fixed");
      first.style.marginTop = null;
    }
  });
};
burgerScroll();

/// (16 пункт ТЗ) Cкрипт который по клику на бургер будет открывать '.popup-menu'
const burger = () => {
  const burgerOpen = (event) => {
    const burgerBtn = document.getElementById("burger-open"),
      popupMenu = document.querySelector(".popup-menu");
    let target = event.target;
    if (target === burgerBtn) {
      popupMenu.style.display = "flex";
    } else if (target !== popupMenu) {
      popupMenu.style.display = "none";
    }
  };
  document.body.addEventListener("click", burgerOpen);
};
burger();

/// (17 пункт ТЗ) Стрелка в правом нижнем углу должна появляться когда проскроллил первый блок
const toTop = () => {
  const toTop = document.getElementById("totop"),
    headSlider = document.querySelector(".header-main"),
    headSliderHeigh = headSlider.offsetHeight;
  window.addEventListener("scroll", () => {
    let scrollDistanse = window.scrollY;
    if (headSliderHeigh < scrollDistanse) {
      toTop.style.display = "inline-block";
    } else {
      toTop.style.display = "none";
    }
  });
};
toTop();
