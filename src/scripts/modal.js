//Функция открытия поп-апа
export function openModal(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
  }  

//Функция закрытия поп-апа
export function closeModal(popup){
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
  }

//Функция закрытия по ESC
function closeEsc(evt){
      if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
      }
  }
  
//Функция закрытия по Оверлею 
export function overlay(evt){
    if (evt.currentTarget === evt.target) {
      closeModal(evt.target);
    }
  }

//Функция закрытия по Крестику 
export function closeModalCrossButton(evt){
  if (evt.target.classList.contains('popup__close')) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

