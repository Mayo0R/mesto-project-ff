import { cardTemplate, popupConfirmDelete, confirmDelete } from "./index.js";
import {
  openModal,
  overlay,
  closeModalCrossButton,
  closeModal,
} from "./modal.js";

// @todo: Функция создания карточки
export function createCard(
  name,
  link,
  del,
  openImage,
  like,
  cardLike,
  cardId,
  cardOwnerId,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;

  //Фукнция удаления карточки с учетом необходимости проброса к функции deleteCard + контроль отображения корзины для своих карточек + поп-ап удаления

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (userId !== cardOwnerId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", function () {
    openModal(popupConfirmDelete);
    popupConfirmDelete.addEventListener("click", overlay);
    popupConfirmDelete.addEventListener("click", closeModalCrossButton);
    confirmDelete.addEventListener("submit", function () {
      del(cardElement, cardId);
      closeModal(popupConfirmDelete);
    });
  });

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
    like(cardId, cardLikeButton, likeCounter);
  });

  cardLike.forEach((element) => {
    if (element._id == userId) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });

  return cardElement;
}
