// @todo: Темплейт карточки
// @todo: DOM узлы

const list = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function createCard(name, link, del) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", del);

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const cardItem = evt.target.closest(".card");
  cardItem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item){
  list.append(createCard(item.name, item.link, deleteCard));
});

