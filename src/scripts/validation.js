import { cardNameInput, urlInput } from "./index.js";

//ВАЛИДАЦИЯ Типовой блок

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы."
    );
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

//Функция очистки ошибок валидации popup'ов

export function cleanErrorsProfile(popup) {
  const spanList = Array.from(popup.querySelectorAll(".form__input-error"));
  const inputList = Array.from(popup.querySelectorAll(".popup__input"));
  const buttonList = Array.from(popup.querySelectorAll(".popup__button"));
  spanList.forEach((item) => {
    item.textContent = "";
  });
  inputList.forEach((item) => {
    item.classList.remove("form__input_type_error");
  });
  buttonList.forEach((item) => {
    item.disabled = false;
  });
}

//Функция деактивации/активации кнопки сохранить при разных ситуациях

export function deactivateButtonNewCard(popup) {
  const spanList = Array.from(
    popup.querySelectorAll(".form__input-error_active")
  );
  const popupButton = popup.querySelector(".popup__button");
  if (
    spanList.length == 0 &&
    cardNameInput.value == "" &&
    urlInput.value == ""
  ) {
    popupButton.disabled = true;
  } else if (
    spanList.length == 0 &&
    cardNameInput.value !== "" &&
    urlInput.value !== ""
  ) {
    popupButton.disabled = false;
  } else {
    popupButton.disabled = true;
  }
}
