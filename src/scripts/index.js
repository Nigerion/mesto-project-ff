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

const buttonOpenPopupProfile = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const crossCloseProfileAdd=popupAddNewCard.querySelector('.popup__close');
const buttonOpenFormProfile = document.querySelector('.profile__edit-button');
const popupEditProfile =document.querySelector('.popup_type_edit');
const crossCloseProfileEdit= popupEditProfile.querySelector('.popup__close');
openModelProfileAndAddCard(buttonOpenPopupProfile,  popupAddNewCard,crossCloseProfileAdd);
openModelProfileAndAddCard(buttonOpenFormProfile, popupEditProfile,crossCloseProfileEdit);
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
const imagePopup =document.querySelector('.popup__image');
const captionPopup=document.querySelector('.popup__caption');
const form =document.forms["edit-profile"];
const link=document.querySelector('.popup__input_type_url_image');
const imageProfile=document.querySelector('.profile__image');
const buttonSumbitRequestAddCards=formPlace.querySelector('.popup__button');
const buttonSumbitRequestEdit= formProfile.querySelector('.popup__button');
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
  buttonSumbitRequestAddCards.textContent='Сохранение...';
  addsCard(name,link)
  .then((data)=>{
    addedCardsToTheBeginning(createCard(data,cardTemplate,handleDeleteCard,clickLike,crossCloseImage,popupImage,data.owner['_id']) );
    closeModal(popupAddNewCard);
  })
  .catch((err)=>{
    console.log(err);
  })
  .finally(() => {
    buttonSumbitRequestAddCards.textContent='Сохранение';
  });
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
  form.elements.name.value=profileTitle.textContent;
  form.elements.description.value=profileDescription.textContent;
  clearValidation(pop, validationConfig);
  openModal(pop);
}
 
const popupEditAvatar=document.querySelector('.popup_type_edit-image');
const crossCloseImageProfile= popupEditAvatar.querySelector('.popup__close');
openModelImageProfile(imageProfile,popupEditAvatar,crossCloseImageProfile);
export const formEditAvatar = document.forms["edit-profile-image"];
const imageSaveForm=formEditAvatar.querySelector('.popup__button');

formEditAvatar.addEventListener('submit', handleFormSubmitImageProfile);
// ф-ия открытия и закрытия окна аватарки 
function openModelImageProfile(imageProfile,popupEditAvatar,crossCloseImageProfile){ 
  clearValidation(popupEditAvatar, validationConfig);
  imageProfile.addEventListener('click', ()=>openModal(popupEditAvatar));
  popupEditAvatar.addEventListener('click', (e) => overlay(e,popupEditAvatar));
  crossCloseImageProfile.addEventListener('click' ,(e)=> closeModal(popupEditAvatar));
}
// ф-ия закрытия аватарки
function handleFormSubmitImageProfile(evt){
  evt.preventDefault();
  imageSaveForm.textContent='Сохранение...';
  patchLinkImage(link.value)
  .then((res)=>{
    imageProfile.style.backgroundImage = `url('${link.value}')`;
  })
  .catch((err)=>{
    console.log(err);
  })
  .finally(() => {
    imageSaveForm.textContent='Сохранение';
  });
  closeModal(popupEditAvatar);
}
// ф-ия в которой вешуются обработчики кликов на открытие и закрытие 
export function openModelProfileAndAddCard(button,popup,crossClose){
  button.addEventListener('click', ()=>openProfilePopup(popup));
  popup.addEventListener('click', (e) => overlay(e,popup));
  crossClose.addEventListener('click' ,(e)=> closeModal(popup));
}
// ф-я меняет имя и работу
export function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const name=nameInput.value;
  const job= jobInput.value;
  buttonSumbitRequestEdit.textContent='Сохранение...';
  redesignsProfile(name,job)
  .then((res)=>{
    profileTitle.textContent=name;
    profileDescription.textContent=job;
  })
  .catch((err)=>{
    console.log(err);
  })
  .finally(() => {
    buttonSumbitRequestEdit.textContent='Сохранение';
  });
  closeModal(popupEdit);
}

enableValidation(validationConfig);