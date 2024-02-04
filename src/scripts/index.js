import "/src/pages/index.css"; // добавьте импорт главного файла стилей
import { createCard } from "./cards.js";
import {
  openModal,
  closeModal,
  overlay,
  closeModalCrossButton,
} from "./modal.js";
import {
  enableValidation,
  cleanErrorsProfile,
  deactivateButtonNewCard,
} from "./validation.js";
import {
  getInitialCards,
  getUser,
  editUser,
  newCard,
  delCard,
  like,
  dislike,
  editAvatar,
} from "./api.js";

export const list = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

export const popupEdit = document.querySelector(".popup_type_edit"); //поп-ап редактирования профиля
export const profileTitle = document.querySelector(".profile__title"); //находим имя в профиле
export const profileDescription = document.querySelector(".profile__description"); //находим описание в профиле
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
export const cardNameInput = document.querySelector(".popup__input_type_card-name"); //name card внутри формы
export const urlInput = document.querySelector(".popup__input_type_url"); //url внутри формы
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button"); //кнопка создания карточки
const cardElementNew = popupNewCard.querySelector(".popup__form"); //находим форму создания новой карточки
const buttonLoadCard = cardElementNew.querySelector(".popup__button-load"); //кнопка Сохранение в форме создания новой карточки

export const popupConfirmDelete = document.querySelector(".popup_type_confirm_delete"); //поп-ап подтверждение удаления карточки
export const confirmDelete = popupConfirmDelete.querySelector(".popup__form"); //находим форму удаления карточки

const popupEditAvatar = document.querySelector(".popup_type_edit_avatar"); //поп-ап редактирования изображения профиля
const editAvatarForm = popupEditAvatar.querySelector(".popup__form"); //находим поп-ап форму редактирования изображения профиля
const urlAvatarInput = editAvatarForm.elements.link; //находим  url внутри формы редактирования аватара
const buttonLoadAvatar = editAvatarForm.querySelector(".popup__button-load"); //кнопка Сохранение в форме изменения аватара

//Слушание кнопки редактирование профиля + открытие и закрытие
editButton.addEventListener("click", function () {
  openModal(popupEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  cleanErrorsProfile(popupEdit);
});

//Обработчки Крестика и Оверлея для поп-апа редактирования профиля
popupEdit.addEventListener("click", overlay);
popupEdit.addEventListener("click", closeModalCrossButton);

//Слушание кнопки добавления карточки + закрытие
buttonOpenPopupNewCard.addEventListener("click", function () {
  openModal(popupNewCard);
  deactivateButtonNewCard(popupNewCard);
});

//Обработчки Крестика и Оверлея для поп-апа создания новой карточки
popupNewCard.addEventListener("click", overlay);
popupNewCard.addEventListener("click", closeModalCrossButton);

//Слушание кнопки в редакторе профиля и при submit применение функции
profileForm.addEventListener("submit", editProfile);

//Слушание кнопки в новой карточке и при submit применение функции
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

enableValidation();

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
          deleteCard,
          openImage,
          likeCard,
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
          deleteCard,
          openImage,
          likeCard,
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
function deleteCard(card, cardId) {
  delCard(cardId)
    .then((res) => {
      res = card.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// 6. Функция лайка карточки с API
function likeCard(cardId, likeButton, likeCounter) {
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

// 7. Слушаем наведение на изображение и меняем анимацию согласно макету

const imageAvatarHover = document.querySelector(".profile__image-hover"); //элемент редактирования при наведении

profileImage.addEventListener("mouseenter", function () {
  imageAvatarHover.style.display = "block";
});
profileImage.addEventListener("mouseleave", function () {
  imageAvatarHover.style.display = "none";
});

// 8. Блок для редактирования изображения профиля + Функция редактирования изображения профиля

profileImage.addEventListener("click", function () {
  openModal(popupEditAvatar);
  deactivateButtonNewCard(popupEditAvatar);
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

// 9. Улучшенный UX всех форм

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранение";
  }
}
