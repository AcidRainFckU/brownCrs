// SCROLL

const smoothLinks = document.querySelectorAll('a[href^="#"]');

for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// REVIEW

const reviewContainer = document.querySelector(".review-container");
const reviewButton = document.querySelector(".review__button");

var open = false;

reviewButton.addEventListener("click", () => {
  if (!open) {
    reviewContainer.style.height = "unset";
    reviewButton.textContent = "Скрыть отзывы";
    open = true;
  } else {
    reviewContainer.removeAttribute("style");
    reviewButton.textContent = "Читать все отзывы";
    open = false;
  }
});

// ОТКРЫТИЕ БЛОКОВ
const openBlock = document.querySelectorAll(".open-block");
const title = document.querySelectorAll(".title");

title.forEach((el, i) => {
  el.addEventListener("click", () => {
    if (!openBlock[i].classList.contains("opened")) {
      openBlock.forEach((elem) => elem.classList.remove("opened"));
      openBlock[i].classList.add("opened");
    } else {
      openBlock[i].classList.remove("opened");
    }
  });
});

// ЗАМЕНА СВГ

const svgRenew = document.querySelectorAll(".svg-renew");

function renewImg(elem, num, form = ".svg") {
  let img = elem.getAttribute("src");
  let srcset = elem.previousElementSibling;
  let newimg;

  img = img.replace(/[0-9]/g, "");

  if (img[img.length - 5] !== num) {
    newimg = img.split(form).join(num + form);
  }

  elem.setAttribute("src", newimg);
  srcset.setAttribute("srcset", newimg);
}

function startRenew() {
  let width = window.innerWidth;
  if (width < 768) {
    svgRenew.forEach((el) => {
      renewImg(el, "");
    });
  } else if (width < 1210) {
    svgRenew.forEach((el) => {
      renewImg(el, "2");
    });
  } else if (width > 1210) {
    svgRenew.forEach((el) => {
      renewImg(el, "3");
    });
  }
}

window.addEventListener("resize", () => {
  startRenew();
});

document.addEventListener("DOMContentLoaded", function (event) {
  startRenew();
});
