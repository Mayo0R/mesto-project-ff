import {openModal, closeModal} from './modal.js';

export const list = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

export const popupEdit = document.querySelector('.popup_type_edit');       //поп-ап редактирования профиля
export const profileTitle =  document.querySelector('.profile__title'); //находим имя в профиле
export const profileDescription = document.querySelector('.profile__description'); //находим описание в профиле

export const profileForm = document.forms.edit_profile; //находим поп-ап форму edit_profile
export const inputName = profileForm.elements.name; // name внутри формы
export const inputDescription = profileForm.elements.description; //description внутри формы

const popupTypeImage = document.querySelector('.popup_type_image'); //поп-ап изображения
const popupImage = document.querySelector('.popup__image'); //класс поп-апа изображения для постановки значений
const popupCaption = document.querySelector('.popup__caption');//класс поп-апа изображения для постановки значений

export const popupNewCard = document.querySelector('.popup_type_new-card');  //поп-ап создания карточки
const cardNameInput = document.querySelector('.popup__input_type_card-name'); //name card внутри формы
const urlInput = document.querySelector('.popup__input_type_url'); //url внутри формы

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция создания карточки
export function createCard(name, link, del, openImage) {
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
  popupTypeImage.querySelector('.popup__close').addEventListener('click', function(evt){
    closeModal(popupTypeImage);
    });
  });
  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  const cardItem = evt.target.closest(".card");
  cardItem.remove();
}
  
//Функция открытия поп-апа для изображения с подстановкой link и name
export function openImage(name, link){
  popupCaption.textContent = name;
  popupImage.src=link;
  popupImage.alt=name;
  openModal(popupTypeImage);
}

//Функция редактирования профиля
export function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(popupEdit);
}

//Функция добавления новой карточки
export function saveNewCard(evt) {
  evt.preventDefault(); 
  console.log (cardNameInput.value);
  console.log (urlInput.value);
  list.prepend(createCard(cardNameInput.value, urlInput.value, deleteCard));
  closeModal(popupNewCard);
  cardNameInput.value = '';
  urlInput.value = '';
}
