import './pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from './scripts/cards.js';
import {openModal, closeModal,deleteCard} from './scripts/modal.js';

// @todo: Темплейт карточки
// @todo: DOM узлы

const list = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editButton = document.querySelector('.profile__edit-button');  //кнопка редактирование профиля
const popupEdit = document.querySelector('.popup_type_edit');       //поп-ап редактирования профиля

const profileButton = document.querySelector('.profile__add-button'); //кнопка создания карточки
const popupNewCard = document.querySelector('.popup_type_new-card');  //поп-ап создания карточки

const popupTypeImage = document.querySelector('.popup_type_image'); //поп-ап изображения
const popupImage = document.querySelector('.popup__image'); //класс поп-апа изображения для постановки значений
const popupCaption = document.querySelector('.popup__caption');//класс поп-апа изображения для постановки значений

const profileForm = document.forms.edit_profile; //находим поп-ап форму edit_profile
const inputName = profileForm.elements.name; // name внутри формы
const inputDescription = profileForm.elements.description; //description внутри формы

const profileTitle =  document.querySelector('.profile__title'); //находим имя в профиле
const profileDescription = document.querySelector('.profile__description'); //находим описание в профиле

const cardElementNew = popupNewCard.querySelector('.popup__form'); //находим форму согдания новой карточки
const cardNameInput = document.querySelector('.popup__input_type_card-name'); //name card внутри формы
const urlInput = document.querySelector('.popup__input_type_url'); //url внутри формы

// @todo: Функция создания карточки
function createCard(name, link, del) {
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

// @todo: Вывести карточки на страницу + удаление при нажатии на корзину + открытие изображения по клику
initialCards.forEach(function (item){
  list.append(createCard(item.name, item.link, deleteCard));
});

//Функция открытия поп-апа для изображения с подстановкой link и name
function openImage(name, link){
  popupCaption.textContent = name;
  popupImage.src=link;
  popupImage.alt=name;
  openModal(popupTypeImage);
}

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

//Функция редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
}

//Слушание кнопки и при submit применение функции
profileForm.addEventListener('submit', handleFormSubmit); 

//Функция добавления новой карточки
function saveNewCard(evt) {
  evt.preventDefault(); 
  console.log (cardNameInput.value);
  console.log (urlInput.value);
  list.prepend(createCard(cardNameInput.value, urlInput.value, deleteCard));
  closeModal(popupNewCard);
  cardNameInput.value = '';
  urlInput.value = '';
}

//Слушание кнопки и при submit применение функции
cardElementNew.addEventListener('submit', saveNewCard); 


//Активируем like, добавляя класс, при клике на кнопку лайка
list.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active'); 
 }
});