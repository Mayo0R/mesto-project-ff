// @todo: Темплейт карточки
// @todo: DOM узлы

const list = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function addCard(name, link, del) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", del);

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const card_item = evt.target.closest(".card");
  card_item.remove();
}

// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
  list.append(addCard(initialCards[i].name, initialCards[i].link, deleteCard));
}
