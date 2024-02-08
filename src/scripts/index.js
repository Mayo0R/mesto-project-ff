import "/src/pages/index.css"; // добавьте импорт главного файла стилей
import { createCard } from "./card.js";
import {
  openModal,
  closeModal,
  overlay,
  closeModalCrossButton,
} from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUser,
  editUser,
  newCard,
  delCard,
  editAvatar,
} from "./api.js";

export const list = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

export const popupEdit = document.querySelector(".popup_type_edit"); //поп-ап редактирования профиля
export const profileTitle = document.querySelector(".profile__title"); //находим имя в профиле
export const profileDescription = document.querySelector(
  ".profile__description"
); //находим описание в профиле
const profileImage = document.querySelector(".profile__image"); //находим изображение профиля

const profileForm = document.forms.edit_profile; //находим поп-ап форму edit_profile
export const inputName = profileForm.elements.name; // name внутри формы редактирования
export const inputDescription = profileForm.elements.description; //description внутри формы редактирования
const editButton = document.querySelector(".profile__edit-button"); //кнопка редактирование профиля
const buttonLoadEdit = profileForm.querySelector(".popup__button-load"); //кнопка Сохранение в форме редактирования

export const popupTypeImage = document.querySelector(".popup_type_image"); //поп-ап изображения
export const photoPopupTypeImage = document.querySelector(".popup__image"); //класс поп-апа изображения для постановки значений
export const popupCaptionImage = document.querySelector(".popup__caption"); //класс поп-апа изображения для постановки значений

export const popupNewCard = document.querySelector(".popup_type_new-card"); //поп-ап создания карточки
export const cardNameInput = document.querySelector(
  ".popup__input_type_card-name"
); //name card внутри формы
export const urlInput = document.querySelector(".popup__input_type_url"); //url внутри формы
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button"); //кнопка создания карточки
const cardElementNew = popupNewCard.querySelector(".popup__form"); //находим форму создания новой карточки
const buttonLoadCard = cardElementNew.querySelector(".popup__button-load"); //кнопка Сохранение в форме создания новой карточки

export const popupConfirmDelete = document.querySelector(
  ".popup_type_confirm_delete"
); //поп-ап подтверждение удаления карточки
export const confirmDelete = popupConfirmDelete.querySelector(".popup__form"); //находим форму удаления карточки

const popupEditAvatar = document.querySelector(".popup_type_edit_avatar"); //поп-ап редактирования изображения профиля
const editAvatarForm = popupEditAvatar.querySelector(".popup__form"); //находим поп-ап форму редактирования изображения профиля
const urlAvatarInput = editAvatarForm.elements.link; //находим  url внутри формы редактирования аватара
const buttonLoadAvatar = editAvatarForm.querySelector(".popup__button-load"); //кнопка Сохранение в форме изменения аватара

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Слушание кнопки редактирование профиля + открытие и закрытие
editButton.addEventListener("click", function () {
  openModal(popupEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  clearValidation(popupEdit, config);
});

//Обработчки Крестика и Оверлея для поп-апа редактирования профиля
popupEdit.addEventListener("click", overlay);
popupEdit.addEventListener("click", closeModalCrossButton);

//Слушание кнопки добавления карточки + закрытие
buttonOpenPopupNewCard.addEventListener("click", function () {
  openModal(popupNewCard);
  clearValidation(popupNewCard, config);
});

//Обработчки Крестика и Оверлея для поп-апа создания новой карточки
popupNewCard.addEventListener("click", overlay);
popupNewCard.addEventListener("click", closeModalCrossButton);

//Слушание формы редактирования профиля
profileForm.addEventListener("submit", editProfile);

//Слушание формы создания новой карточки
cardElementNew.addEventListener("submit", saveNewCard);

//Функция открытия поп-апа для изображения с подстановкой link и name
export function openImage(name, link) {
  popupCaptionImage.textContent = name;
  photoPopupTypeImage.src = link;
  photoPopupTypeImage.alt = name;
  openModal(popupTypeImage);
}

//Обработчки Крестика и Оверлея для поп-апа изображения
popupTypeImage.addEventListener("click", overlay);
popupTypeImage.addEventListener("click", closeModalCrossButton);

//Запуск Валидации всех форм

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

//API

// 1. Создание массива промисов User и Cards
const promises = [getUser(), getInitialCards()];

// 2. Вызов метода Promise.all() с массивом промисов
Promise.all(promises)
  .then(([user, cards]) => {
    // Обработка результатов после завершения всех промисов
    const userID = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    cards.forEach((card) => {
      list.append(
        createCard(
          card.name,
          card.link,
          deleteCardCallback,
          openImage,
          card.likes,
          card._id,
          card.owner._id,
          user._id
        )
      );
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

// 3. Функция редактирования профиля с отправкой инфы на сервер
function editProfile(evt) {
  evt.preventDefault();
  const data = {
    name: inputName.value,
    about: inputDescription.value,
  };
  renderLoading(true, buttonLoadEdit);
  editUser(data)
    .then(() => {
      profileTitle.textContent = inputName.value;
      profileDescription.textContent = inputDescription.value;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, buttonLoadEdit);
    });
}

// 4. Функция создания карточки с API
function saveNewCard(evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: urlInput.value,
  };
  renderLoading(true, buttonLoadCard);
  newCard(card)
    .then((card) => {
      list.prepend(
        createCard(
          card.name,
          card.link,
          deleteCardCallback,
          openImage,
          card.likes,
          card._id,
          card.owner._id,
          card.owner._id
        )
      );
      closeModal(popupNewCard);
      cardElementNew.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, buttonLoadCard);
    });
}

// 5. Функция удаления карточки с API

popupConfirmDelete.addEventListener("click", overlay);
popupConfirmDelete.addEventListener("click", closeModalCrossButton);
let cardIdForDel;
let cardElementForDel;

export function deleteCardCallback(id, element) {
  console.log(id);
  openModal(popupConfirmDelete);
  cardIdForDel = id;
  cardElementForDel = element;
}

confirmDelete.addEventListener("submit", function (evt) {
  evt.preventDefault();
  deleteCard(cardIdForDel, cardElementForDel);
  closeModal(popupConfirmDelete);
});

function deleteCard(id, element) {
  delCard(id)
    .then((res) => {
      console.log(res);
      element.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// 6. Слушаем наведение на изображение и меняем анимацию согласно макету

const imageAvatarHover = document.querySelector(".profile__image-hover"); //элемент редактирования при наведении

profileImage.addEventListener("mouseenter", function () {
  imageAvatarHover.style.display = "block";
});
profileImage.addEventListener("mouseleave", function () {
  imageAvatarHover.style.display = "none";
});

// 7. Блок для редактирования изображения профиля + Функция редактирования изображения профиля

profileImage.addEventListener("click", function () {
  openModal(popupEditAvatar);
  clearValidation(popupEditAvatar, config);
});

popupEditAvatar.addEventListener("click", overlay);
popupEditAvatar.addEventListener("click", closeModalCrossButton);

editAvatarForm.addEventListener("submit", editProfileAvatar);

function editProfileAvatar(evt) {
  evt.preventDefault();
  const profileAva = {
    avatar: urlAvatarInput.value,
  };
  renderLoading(true, buttonLoadAvatar);
  editAvatar(profileAva)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      editAvatarForm.reset();
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, buttonLoadAvatar);
    });
}

// 8. Улучшенный UX всех форм

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранение";
  }
}
