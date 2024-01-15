import './pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards, createCard, openImage, handleFormSubmit, saveNewCard,deleteCard} from './scripts/cards.js';
import {openModal, closeModal} from './scripts/modal.js';
import {profileTitle, list, popupNewCard, profileDescription, profileForm, inputName, inputDescription, popupEdit} from './scripts/cards.js';

// @todo: Темплейт карточки
// @todo: DOM узлы

const editButton = document.querySelector('.profile__edit-button');  //кнопка редактирование профиля
const profileButton = document.querySelector('.profile__add-button'); //кнопка создания карточки
const cardElementNew = popupNewCard.querySelector('.popup__form'); //находим форму создания новой карточки

// @todo: Вывести карточки на страницу + удаление при нажатии на корзину + открытие изображения по клику
initialCards.forEach(function (item){
  list.append(createCard(item.name, item.link, deleteCard, openImage));
});

//Слушание кнопки редактирование профиля + открытие и закрытие
editButton.addEventListener('click', function(){
  openModal(popupEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  popupEdit.querySelector('.popup__close').addEventListener('click', function(evt){
    closeModal(popupEdit);
  });
});

//Слушание кнопки добавления карточки + закрытие
profileButton.addEventListener('click', function(){
  openModal(popupNewCard);
  popupNewCard.querySelector('.popup__close').addEventListener('click', function(evt){
    closeModal(popupNewCard);
  });
});

//Слушание кнопки в редакторе профиля и при submit применение функции
profileForm.addEventListener('submit', handleFormSubmit); 

//Слушание кнопки в ноыой карточке и при submit применение функции
cardElementNew.addEventListener('submit', saveNewCard); 

//Активируем like, добавляя класс, при клике на кнопку лайка
list.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active'); 
 }
});