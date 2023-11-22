// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard,handleDeleteCard,renderCard,handleFormSubmitPlace} from './card.js';
import {recyclingButton,handleFormSubmit} from './model.js'
const logoImage = new URL('../images/logo.svg', import.meta.url);
const avatarImage = new URL('../images/avatar.jpg', import.meta.url);
const whoIsTheGoat = [
  { name: 'Logo', link: logoImage },
  { name: 'Avatar', link: avatarImage },
];
export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
initialCards.forEach((cards) => { 
  renderCard(createCard(cards,cardTemplate) );
}); 
recyclingButton('.profile__edit-button', '.popup_type_edit');
recyclingButton('.profile__add-button', '.popup_type_new-card');
export const formElement = document.forms["edit-profile"];
export const nameInput =formElement.elements.name;
export const jobInput = formElement.elements.description;
formElement.addEventListener('submit', handleFormSubmit);
export const formPlace = document.forms["new-place"];
export const namePlace =formPlace.elements.placename;
export const linPlace = formPlace.elements.link;
formPlace.addEventListener('submit', handleFormSubmitPlace);