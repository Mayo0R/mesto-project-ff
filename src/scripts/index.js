import '/src/pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from './card.js';
import {createCard,deleteCard, likeCard} from './cards.js';
import {openModal, closeModal, overlay, closeModalCrossButton} from './modal.js';

export const list = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

export const popupEdit = document.querySelector('.popup_type_edit');       //поп-ап редактирования профиля
export const profileTitle =  document.querySelector('.profile__title'); //находим имя в профиле
export const profileDescription = document.querySelector('.profile__description'); //находим описание в профиле

const profileForm = document.forms.edit_profile; //находим поп-ап форму edit_profile
export const inputName = profileForm.elements.name; // name внутри формы
export const inputDescription = profileForm.elements.description; //description внутри формы

const newPlaceForm = document.forms.new_place; //находим поп-ап форму new_place
export const popupTypeImage = document.querySelector('.popup_type_image'); //поп-ап изображения
export const photoPopupTypeImage = document.querySelector('.popup__image'); //класс поп-апа изображения для постановки значений
export const popupCaptionImage = document.querySelector('.popup__caption');//класс поп-апа изображения для постановки значений

export const popupNewCard = document.querySelector('.popup_type_new-card');  //поп-ап создания карточки
export const cardNameInput = document.querySelector('.popup__input_type_card-name'); //name card внутри формы
export const urlInput = document.querySelector('.popup__input_type_url'); //url внутри формы

// @todo: Темплейт карточки
// @todo: DOM узлы

const editButton = document.querySelector('.profile__edit-button');  //кнопка редактирование профиля
const buttonOpenPopupNewCard = document.querySelector('.profile__add-button'); //кнопка создания карточки
const cardElementNew = popupNewCard.querySelector('.popup__form'); //находим форму создания новой карточки

// @todo: Вывести карточки на страницу + удаление при нажатии на корзину + открытие изображения по клику
initialCards.forEach(function (item){
  list.append(createCard(item.name, item.link, deleteCard, openImage, likeCard));
});

//Слушание кнопки редактирование профиля + открытие и закрытие
editButton.addEventListener('click', function(){
  openModal(popupEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  popupEdit.addEventListener("click", overlay);
  popupEdit.addEventListener("click", closeModalCrossButton);
});

//Слушание кнопки добавления карточки + закрытие
buttonOpenPopupNewCard.addEventListener('click', function(){
  openModal(popupNewCard);
  popupNewCard.addEventListener("click", overlay);
  popupNewCard.addEventListener("click", closeModalCrossButton);
});

//Слушание кнопки в редакторе профиля и при submit применение функции
profileForm.addEventListener('submit', editProfile); 

//Слушание кнопки в ноыой карточке и при submit применение функции
cardElementNew.addEventListener('submit', saveNewCard); 

//Функция открытия поп-апа для изображения с подстановкой link и name
export function openImage(name, link){
  popupCaptionImage.textContent = name;
  photoPopupTypeImage.src=link;
  photoPopupTypeImage.alt=name;
  openModal(popupTypeImage);
  popupTypeImage.addEventListener("click", overlay);
  popupTypeImage.addEventListener("click", closeModalCrossButton);
}

//Функция редактирования профиля
export function editProfile(evt) {
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
  list.prepend(createCard(cardNameInput.value, urlInput.value, deleteCard, openImage, likeCard));
  closeModal(popupNewCard);
  newPlaceForm.reset();
}

