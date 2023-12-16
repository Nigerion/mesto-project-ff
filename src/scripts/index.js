// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from './cards.js';
import {handleDeleteCard,clickLike,createCard} from './card.js';
import {closeModal,escape,overlay,openModal} from './model.js';
import {getUserData,getCardsData,redesignsProfile,addsCard,patchLinkImage } from './api.js';
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

Promise.all([getCardsData(),getUserData()])
.then(([cardData,UserData])=>{
  profileTitle.textContent=UserData.name;
  profileImage.style.backgroundImage= `url('${UserData.avatar}')`;
  profileDescription.textContent=UserData.about;
  const idUser= UserData['_id'];
  for (let card of cardData){
    renderCard(createCard(card,cardTemplate,handleDeleteCard,clickLike,crossCloseImage,popupImage,idUser) )
  }
})
.catch(err=>{
  console.log(err);
})
// ф-ия создания и добавления крточки
export function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const name= namePlace.value;
  const link= linkPlace.value;
  const card={name,link};
  const idUser='a3442c9c-1d98-4987-b2c5-54a8880f1608';
  addsCard(name,link);
  formPlace.querySelector('.popup__button').textContent='Сохранение...';
  addedCardsToTheBeginning(createCard(card,cardTemplate,handleDeleteCard,clickLike,crossCloseImage,popupImage,idUser) );
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
  document.querySelector('.popup__image').src=link;
  document.querySelector('.popup__image').alt=name;
  document.querySelector('.popup__caption').textContent=name;
  openModal(popupImage);
}
crossCloseImage.addEventListener("click", ()=>closeModal(popupImage));
popupImage.addEventListener('click', (e) => overlay(e,popupImage));

// ф-ия открытия редактирования профиля
export function openProfilePopup(pop){
  const form =document.forms["edit-profile"];
  form.elements.name.value=document.querySelector('.profile__title').textContent;
  form.elements.description.value=document.querySelector('.profile__description').textContent;
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
  imageProfile.addEventListener('click', ()=>openModal(popupImageProfileEdit));
  popupImageProfileEdit.addEventListener('click', (e) => overlay(e,popupImageProfileEdit));
  crossCloseImageProfile.addEventListener('click' ,(e)=> closeModal(popupImageProfileEdit));
}
// ф-ия закрытия аватарки
function handleFormSubmitImageProfile(evt){
  evt.preventDefault();
  const link=document.querySelector('.popup__input_type_url_image').value;
  patchLinkImage(link);
  formImageProfile.querySelector('.popup__button').textContent='Сохранение...';
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
  redesignsProfile(name,job);
  document.querySelector('.profile__title').textContent=name;
  document.querySelector('.profile__description').textContent=job;
  closeModal(popupEdit);
}
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, parametr) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parametr.inputErrorClass);
  // ошибка типа ввода формы
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parametr.errorClass);
  // тип ввода активной формы 
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, parametr) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parametr.inputErrorClass);
  // ошибка типа ввода формы 
  errorElement.classList.remove(parametr.errorClass);
  // тип ввода активной формы 
  errorElement.textContent = '';
};
// Функция, которая проверяет валидность
const checkInputValidity = (formElement, inputElement, parametr) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,parametr);
  } else {
    hideInputError(formElement, inputElement,parametr);
  }
};
// каждому полю добавим обработчик события input
const setEventListeners = (formElement , parametr) => {
  const inputList = Array.from(formElement.querySelectorAll(parametr.inputSelector));
  const buttonElement = formElement.querySelector(parametr.submitButtonSelector);
  toggleButtonState(inputList,buttonElement,parametr);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement,parametr);
      toggleButtonState(inputList,buttonElement,parametr)
    });
  });
};
//Функция принимает массив полей
const hasInvalidInput = (inputList)=>{
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  })
}
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, parametr) =>{
  if (hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add(parametr.inactiveButtonClass)
    // кнопка неактивна
  }
  else{
    buttonElement.disabled = false;
    buttonElement.classList.remove(parametr.inactiveButtonClass)
    // кнопка неактивна
  }
}

// ф-ия очищает ошибки валидации 
export const clearValidation=(formElement, validationConfig)=>{
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement,validationConfig);
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  });
}
// ф-ия валидирует поля 
const enableValidation = (parametr) => { 
  const formList = Array.from(document.querySelectorAll(parametr.formSelector));
  // нашел все формы 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formList.forEach((formElement) => {
      setEventListeners(formElement, parametr);
    });
    // преберает формы и к каждой вызывате ф-ию setEventListner
  });
};

enableValidation(validationConfig);

