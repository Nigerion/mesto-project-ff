import {cardTemplate,placesList} from './index.js';
import {openModel,closeModel,escape,overlay} from './model.js';
export function createCard(card){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.alt;
    cardElement.querySelector('.card__title').textContent = card.name;
    const like = cardElement.querySelector('.card__like-button');
    const cardDelete= cardElement.querySelector('.card__delete-button');
    like.addEventListener('click', ()=>clickLike(like))
    cardDelete.addEventListener('click', () => handleDeleteCard(cardElement));
    recyclingImage(cardElement,card.link,card.name);
    return cardElement;
  }
  export function handleDeleteCard(elm){
    elm.remove();
  }
  
  export function renderCard(cardElement){
    placesList.append(cardElement);
  }
  function recyclingImage(cardElement,link,name){
    const button = cardElement.querySelector(".card__image");
    const Popup = document.querySelector(".popup_type_image");
    const cross= Popup.querySelector('.popup__close');
    button.addEventListener('click', ()=>openModel(Popup,link,name));
    cross.addEventListener("click", ()=>closeModel(Popup));
    document.addEventListener('keydown', (e) => escape(e,Popup));
    Popup.addEventListener('click', (e) => overlay(e,Popup));
  }
//   export function openModel(pop,link,name){
//     pop.classList.add('popup_is-opened');
//     const form =document.forms["edit-profile"];
//     form.elements.name.value=document.querySelector('.profile__title').textContent;
//     form.elements.description.value=document.querySelector('.profile__description').textContent;
//     document.querySelector('.popup__image').src=link;
//     document.querySelector('.popup__caption').textContent=name;
//   }
//   export function closeModel(pop){
//     pop.classList.remove('popup_is-opened');
//   }
//   export function escape(e,namePop){
//     if (e.key === "Escape") {
//       namePop.classList.remove('popup_is-opened');
//     }
//   }
//   export function overlay(e,namePop){
//     if (e.target === namePop) {
//       namePop.classList.remove('popup_is-opened');
//       }
//   }
  function clickLike(pop){
    if(!pop.classList.contains('card__like-button_is-active')){
      pop.classList.add('card__like-button_is-active'); 
    }
    else{
      pop.classList.remove('card__like-button_is-active');
    }
  }
export const formPlace = document.forms["new-place"];
export const namePlace =formPlace.elements.placename;
export const linPlace = formPlace.elements.link;
export function handleFormSubmitPlace(evt) {
    evt.preventDefault();
    const name= namePlace.value;
    const link= linPlace.value;
    const card={name,link};
    render(createCard(card,cardTemplate) );
    const Popup = document.querySelector(".popup_type_new-card");
    closeModel(Popup);
  }
  function render(cardElement){
    placesList.prepend(cardElement);
  }