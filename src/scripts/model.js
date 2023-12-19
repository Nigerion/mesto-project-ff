import {validationConfig} from './index.js';
// import {clearValidation} from './validation.js';
// ф-ия открытия попапа 
export function openModal(pop){
  // clearValidation(pop, validationConfig);
  pop.classList.add('popup_is-opened');
  document.addEventListener('keydown',escape);
}
// ф-ия закрытия попапа 
export function closeModal(pop){
  pop.classList.remove('popup_is-opened');
  document.removeEventListener('keydown',escape);
}
// ф-ия закрытия попапа на ескейап
export function escape(e){
  if (e.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}
// ф-ия закрытия попапа на оверлей
export function overlay(e,namePop){
  if (e.target === namePop) {
    closeModal(namePop);
  }
}




