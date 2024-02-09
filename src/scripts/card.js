import { cardTemplate, popupConfirmDelete} from "./index.js";
import { like, dislike } from "./api.js";
import { openModal } from "./modal.js";

// @todo: Функция создания карточки
export function createCard(
  name,
  link,
  del,
  openImage,
  cardLike,
  cardId,
  cardOwnerId,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;

  //Проверка Id для отображения иконок корзины + слушаем нажатие на иконку
  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (userId !== cardOwnerId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", function () {
      del(cardId, cardElement);
    });
  }

  // Блок с открытием изображения по клику + закрытие
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    openImage(name, link);
  });

  // Работа like по клику
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  likeCounter.textContent = cardLike.length;

  cardLikeButton.addEventListener("click", function () {
    likeCard(cardId, cardLikeButton, likeCounter);
  });

  cardLike.forEach((element) => {
    if (element._id == userId) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });

  return cardElement;
}

// Функция лайка карточки с API
export function likeCard(cardId, likeButton, likeCounter) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    like(cardId)
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = Object.keys(res.likes).length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    dislike(cardId)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = Object.keys(res.likes).length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

// Обработчик клика по иконке удаления карточки
export let cardIdForDel;
export let cardElementForDel;

export function deleteCardCallback(id, element) {
  openModal(popupConfirmDelete);
  cardIdForDel = id;
  cardElementForDel = element;
}
