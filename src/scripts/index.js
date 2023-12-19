// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from './cards.js';
import {handleDeleteCard,clickLike,createCard} from './card.js';
import {closeModal,escape,overlay,openModal} from './model.js';
import {enableValidation , clearValidation} from './validation.js';
import {getUserData,getCardsData,redesignsProfile,addsCard,patchLinkImage,getUserDataSave} from './api.js';
import { data } from 'autoprefixer';
const logoImage = new URL('../images/logo.svg', import.meta.url);
const avatarImage = new URL('../images/avatar.jpg', import.meta.url);
const whoIsTheGoat = [
  { name: 'Logo', link: logoImage },
  { name: 'Avatar', link: avatarImage },
];
export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
export const validationConfig={
  formSelector: '.popup__form',
  // всплывающая форма
  inputSelector: '.popup__input',
  // всплывающая input 
  submitButtonSelector: '.popup__button',
  // всплывающая кнопка
  inactiveButtonClass: 'popup__button_disabled',
  // всплывающая кнопка отключена
  inputErrorClass: 'popup__input_type_error',
  // ошибка типа ввода всплывающего окна
  errorClass: 'popup__error_visible',
  // видна всплывающая ошибка
};
export const config ={
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2/',
  headers: {
    authorization: 'a3442c9c-1d98-4987-b2c5-54a8880f1608',
    'Content-Type': 'application/json'
  }
};

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

const profileTitle=document.querySelector('.profile__title');
const profileImage=document.querySelector('.profile__image');
const profileDescription=document.querySelector('.profile__description');
const clickProfileImage=document.querySelector(".profile__image")
const popupProfileImage=document.querySelector(".popup_type_edit-image")
const imagePopup =document.querySelector('.popup__image');
const captionPopup=document.querySelector('.popup__caption');

 Promise.all([getCardsData(),getUserData()])
.then(([cardData,userData])=>{
  profileTitle.textContent=userData.name;
  profileImage.style.backgroundImage= `url('${userData.avatar}')`;
  profileDescription.textContent=userData.about;
  const idUser= userData['_id'];
  for (let card of cardData){
    renderCard(createCard(card,cardTemplate,handleDeleteCard,clickLike,crossCloseImage,popupImage,idUser) )
  }
})
.catch(err=>{
  console.log(err);
})
//  ф-ия создания и добавления крточки
export function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const name= namePlace.value;
  const link= linkPlace.value;
  formPlace.querySelector('.popup__button').textContent='Сохранение...';
  addsCard(name,link)
  .then((data)=>{
    addedCardsToTheBeginning(createCard(data,cardTemplate,handleDeleteCard,clickLike,crossCloseImage,popupImage,data.owner['_id']) );
  })
  .catch((err)=>{
    console.log(err);
  });
  closeModal(popupNewCard);
}
// ф-ия добавления одной картинки 
export function addedCardsToTheBeginning(cardElement){
  placesList.prepend(cardElement);
  namePlace.value= '';
  linkPlace.value='';
}
// ф-ия открытия открытя картинки 
export function openModelImage(cardElement,link,name){
  openImagePopup(popupImage,link,name);
}
// ф-ия добавления каринки 
export function renderCard(cardElement){
  placesList.append(cardElement);
}
// ф-ия открытия картинки, замены ссылки, описания и подписи
export function openImagePopup(popupImage,link,name){
  imagePopup.src=link;
  imagePopup.alt=name;
  captionPopup.textContent=name;
  openModal(popupImage);
}
crossCloseImage.addEventListener("click", ()=>closeModal(popupImage));
popupImage.addEventListener('click', (e) => overlay(e,popupImage));

// ф-ия открытия редактирования профиля
export function openProfilePopup(pop){
  const form =document.forms["edit-profile"];
  form.elements.name.value=document.querySelector('.profile__title').textContent;
  form.elements.description.value=document.querySelector('.profile__description').textContent;
  // 
  // 
  // 
  clearValidation(pop, validationConfig);
  openModal(pop);
}

const imageProfile=document.querySelector('.profile__image'); 
const popupImageProfileEdit=document.querySelector('.popup_type_edit-image');
const crossCloseImageProfile= popupImageProfileEdit.querySelector('.popup__close');
openModelImageProfile(imageProfile,popupImageProfileEdit,crossCloseImageProfile);
export const formImageProfile = document.forms["edit-profile-image"];
export const popupImageEdit =document.querySelector(".popup_type_edit-image"); 
formImageProfile.addEventListener('submit', handleFormSubmitImageProfile);
// ф-ия открытия и закрытия окна аватарки 
function openModelImageProfile(imageProfile,popupImageProfileEdit,crossCloseImageProfile){
  // 
  // 
  // 
  clearValidation(popupImageProfileEdit, validationConfig);
  imageProfile.addEventListener('click', ()=>openModal(popupImageProfileEdit));
  popupImageProfileEdit.addEventListener('click', (e) => overlay(e,popupImageProfileEdit));
  crossCloseImageProfile.addEventListener('click' ,(e)=> closeModal(popupImageProfileEdit));
}
// ф-ия закрытия аватарки
function handleFormSubmitImageProfile(evt){
  evt.preventDefault();
  const link=document.querySelector('.popup__input_type_url_image').value;
  formImageProfile.querySelector('.popup__button').textContent='Сохранение...';
  patchLinkImage(link)
  .then((res)=>{
    const profileImage = document.querySelector(".profile__image");
    profileImage.style.backgroundImage = `url('${link}')`;
  })
  .catch((err)=>{
    console.log(err);
  });
  closeModal(popupImageEdit);
}
// ф-ия в которой вешуются обработчики кликов на открытие и закрытие 
export function openModelProfileAndAddCard(clickProfile,popupProfile,crossCloseProfile){
  clickProfile.addEventListener('click', ()=>openProfilePopup(popupProfile));
  popupProfile.addEventListener('click', (e) => overlay(e,popupProfile));
  crossCloseProfile.addEventListener('click' ,(e)=> closeModal(popupProfile));
}
// ф-я меняет имя и работу
export function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const name=nameInput.value;
  const job= jobInput.value;
  formProfile.querySelector('.popup__button').textContent='Сохранение...';
  redesignsProfile(name,job)
  .then((res)=>{
    document.querySelector('.profile__title').textContent=name;
    document.querySelector('.profile__description').textContent=job;
  })
  .catch((err)=>{
    console.log(err);
  });
  closeModal(popupEdit);
}

enableValidation(validationConfig);