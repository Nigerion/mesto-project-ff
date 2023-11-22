// import {openModel,closeModel,escape,overlay} from './card.js';
export function openModel(pop,link,name){
  pop.classList.add('popup_is-opened');
  const form =document.forms["edit-profile"];
  form.elements.name.value=document.querySelector('.profile__title').textContent;
  form.elements.description.value=document.querySelector('.profile__description').textContent;
  document.querySelector('.popup__image').src=link;
  document.querySelector('.popup__caption').textContent=name;
}
export function closeModel(pop){
  pop.classList.remove('popup_is-opened');
}
export function escape(e,namePop){
  if (e.key === "Escape") {
    namePop.classList.remove('popup_is-opened');
  }
}
export function overlay(e,namePop){
  if (e.target === namePop) {
    namePop.classList.remove('popup_is-opened');
    }
}
export function recyclingButton(namebutton, namePopup){
  const button = document.querySelector(namebutton);
  const Popup =document.querySelector(namePopup);
  const cross= Popup.querySelector('.popup__close');
  button.addEventListener('click', ()=>openModel(Popup));
  cross.addEventListener("click", ()=>closeModel(Popup));
  document.addEventListener('keydown', (e) => escape(e,Popup));
  Popup.addEventListener('click', (e) => overlay(e,Popup));
}
export const formElement = document.forms["edit-profile"];
export const nameInput =formElement.elements.name;
export const jobInput = formElement.elements.description;
  export function handleFormSubmit(evt) {
  evt.preventDefault();
  const name=nameInput.value;
  const job= jobInput.value;
  document.querySelector('.profile__title').textContent=name;
  document.querySelector('.profile__description').textContent=job;
  const Popup =document.querySelector(".popup_type_edit");
  closeModel(Popup);
}

