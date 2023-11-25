import { openModal,nameInput,jobInput,popupEdit } from "./index";

function openProfilePopup(pop){
  const form =document.forms["edit-profile"];
  form.elements.name.value=document.querySelector('.profile__title').textContent;
  form.elements.description.value=document.querySelector('.profile__description').textContent;
  openModal(pop);
}

export function closeModal(pop){
  pop.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (e) => escape(e,popupImage));
}
export function escape(e,namePop){
  if (e.key === "Escape") {
    closeModal(namePop);
  }
}
export function overlay(e,namePop){
  if (e.target === namePop) {
    closeModal(namePop);
  }
}

export function openModelProfile(clickProfile,popupProfile,crossCloseProfile){
  clickProfile.addEventListener('click', ()=>openProfilePopup(popupProfile));
  crossCloseProfile.addEventListener("click", ()=>closeModal(popupProfile));
  document.addEventListener('keydown', (e) => escape(e,popupProfile));
  popupProfile.addEventListener('click', (e) => overlay(e,popupProfile));
}

export function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const name=nameInput.value;
  const job= jobInput.value;
  document.querySelector('.profile__title').textContent=name;
  document.querySelector('.profile__description').textContent=job;
  closeModal(popupEdit);
}

