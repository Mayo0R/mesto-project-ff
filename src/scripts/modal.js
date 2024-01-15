//Функция открытия поп-апа
export function openModal(popup){
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
    popup.addEventListener("click", overlay);
  }  

//Функция закрытия поп-апа
export function closeModal(popup){
    popup.classList.remove('popup_is-opened');
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