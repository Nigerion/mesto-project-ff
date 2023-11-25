// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from './cards.js';
import {handleDeleteCard,clickLike,createCard} from './card.js';
import {closeModal,escape,overlay,openModal} from './model.js';
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
const popupNewCard = document.querySelector(".popup_type_new-card");
const crossCloseProfileAdd=popupNewCard.querySelector('.popup__close');
const clickProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileEdit =document.querySelector('.popup_type_edit');
const crossCloseProfileEdit= popupProfileEdit.querySelector('.popup__close');
openModelProfileAndAddCard(clickProfileAdd,  popupNewCard,crossCloseProfileAdd);
openModelProfileAndAddCard(clickProfileEdit, popupProfileEdit,crossCloseProfileEdit);
export const formProfile = document.forms["edit-profile"];
export const nameInput =formProfile.elements.name;
export const jobInput = formProfile.elements.description;
export const popupEdit =document.querySelector(".popup_type_edit");
formProfile.addEventListener('submit', handleFormSubmitProfile);
export const formPlace = document.forms["new-place"];
export const namePlace =formPlace.elements.placename;
export const linkPlace = formPlace.elements.link;
formPlace.addEventListener('submit', handleFormSubmitPlace);
export const popupImage = document.querySelector(".popup_type_image");
export const crossCloseImage= popupImage.querySelector('.popup__close');


export function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const name= namePlace.value;
  const link= linkPlace.value;
  const card={name,link};
  addedCardsToTheBeginning(createCard(card,cardTemplate,handleDeleteCard,clickLike,crossCloseImage,popupImage) );
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

export function renderCard(cardElement){
  placesList.append(cardElement);
}
export function openImagePopup(popupImage,link,name){
  document.querySelector('.popup__image').src=link;
  document.querySelector('.popup__image').alt=name;
  document.querySelector('.popup__caption').textContent=name;
  openModal(popupImage);
}
crossCloseImage.addEventListener("click", ()=>closeModal(popupImage));
popupImage.addEventListener('click', (e) => overlay(e,popupImage));

export function openProfilePopup(pop){
  const form =document.forms["edit-profile"];
  form.elements.name.value=document.querySelector('.profile__title').textContent;
  form.elements.description.value=document.querySelector('.profile__description').textContent;
  openModal(pop);
}

export function openModelProfileAndAddCard(clickProfile,popupProfile,crossCloseProfile){
  clickProfile.addEventListener('click', ()=>openProfilePopup(popupProfile));
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