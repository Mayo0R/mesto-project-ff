
//Функция открытия поп-апа
export function openModal(popup){
    popup.classList.add('popup_is-animated');
    setTimeout(popup.classList.add('popup_is-opened'), 10000);
    document.addEventListener('keydown', closeEsc);
    popup.addEventListener("click", overlay);
  }  
  
//Функция закрытия поп-апа
export function closeModal(popup){
    popup.classList.remove('popup_is-opened');
  }

// @todo: Функция удаления карточки
export function deleteCard(evt) {
    const cardItem = evt.target.closest(".card");
    cardItem.remove();
  }
    
//Функция закрытия по ESC
function closeEsc(evt){
      if ((evt.key === 'Escape') && (document.querySelector('.popup_is-opened'))) {
        document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closeEsc);
      }
  }
  
//Функция закрытия по Оверлею 
function overlay(evt){
    if (evt.currentTarget === evt.target) {
      closeModal(evt.target);
      evt.target.removeEventListener("click", overlay);
    }
  }