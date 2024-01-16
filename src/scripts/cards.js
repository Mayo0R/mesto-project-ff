import {cardTemplate} from './index.js';

// @todo: Функция создания карточки
export function createCard(name, link, del, openImage, like) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", del);

// Блок с открытием изображения по клику + закрытие
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', function(){
    openImage(name,link);
  });

// Работа like по клику
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", like);
  
  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  const cardItem = evt.target.closest(".card");
  cardItem.remove();
}

export function likeCard(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}
  





