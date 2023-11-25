export function openModal(pop){
  pop.classList.add('popup_is-opened');
  document.addEventListener('keydown',escape);
}

export function closeModal(pop){
  pop.classList.remove('popup_is-opened');
  document.removeEventListener('keydown',escape);
}

export function escape(e,pop){
  if (e.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export function overlay(e,namePop){
  if (e.target === namePop) {
    closeModal(namePop);
  }
}






