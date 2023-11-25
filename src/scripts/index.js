// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from './cards.js';
import {renderCard,handleDeleteCard,clickLike,createCard,openImagePopup} from './card.js';
import {openModelProfile,handleFormSubmitProfile,closeModal,escape,overlay} from './model.js';
const logoImage = new URL('../images/logo.svg', import.meta.url);
const avatarImage = new URL('../images/avatar.jpg', import.meta.url);
const whoIsTheGoat = [
  { name: 'Logo', link: logoImage },
  { name: 'Avatar', link: avatarImage },
];
export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');

initialCards.forEach((cards) => { 
  renderCard(createCard(cards,cardTemplate,handleDeleteCard,clickLike,crossCloseImage,popupImage) );
}); 

const clickProfileAdd = document.querySelector('.profile__add-button');
const popupProfileAdd =document.querySelector('.popup_type_new-card');
const crossCloseProfileAdd=popupProfileAdd.querySelector('.popup__close');
const clickProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileEdit =document.querySelector('.popup_type_edit');
const crossCloseProfileEdit= popupProfileEdit.querySelector('.popup__close');
openModelProfile(clickProfileAdd,  popupProfileAdd,crossCloseProfileAdd);
openModelProfile(clickProfileEdit, popupProfileEdit,crossCloseProfileEdit);
export const formProfile = document.forms["edit-profile"];
export const nameInput =formProfile.elements.name;
export const jobInput = formProfile.elements.description;
export const popupEdit =document.querySelector(".popup_type_edit");
formProfile.addEventListener('submit', handleFormSubmitProfile);
export const formPlace = document.forms["new-place"];
export const namePlace =formPlace.elements.placename;
export const linkPlace = formPlace.elements.link;
formPlace.addEventListener('submit', handleFormSubmitPlace);
const popupImage = document.querySelector(".popup_type_image");
const crossCloseImage= popupImage.querySelector('.popup__close');
const popupNewCard = document.querySelector(".popup_type_new-card");

export function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const name= namePlace.value;
  const link= linkPlace.value;
  const card={name,link};
  addedCardsToTheBeginning(createCard(card,cardTemplate) );
  closeModal(popupNewCard);
}

export function addedCardsToTheBeginning(cardElement){
  placesList.prepend(cardElement);
  namePlace.value= '';
  linkPlace.value='';
}

export function openModelImage(cardElement,link,name){
  openImagePopup(popupImage,link,name);
}

export function openModal(pop){
  pop.classList.add('popup_is-opened');
  crossCloseImage.addEventListener("click", ()=>closeModal(popupImage));
  document.addEventListener('keydown', (e) => escape(e,popupImage));
  popupImage.addEventListener('click', (e) => overlay(e,popupImage));
}