export function openModal(pop){
  pop.classList.add('popup_is-opened');
  document.addEventListener('keydown', function ecs(e){escape(e,pop)});
}

export function closeModal(pop){
  pop.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', function ecs(e){escape(e)});
}

export function escape(e,pop){
  if (e.key === "Escape"&& pop.classList.contains('popup_is-opened')) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export function overlay(e,namePop){
  if (e.target === namePop) {
    closeModal(namePop);
  }
}






