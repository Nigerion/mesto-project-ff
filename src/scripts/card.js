import {placesList,openModelImage,openModal } from './index.js';
export function createCard(card,cardTemplate,handleDeleteCard, clickLike){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  const link=card.link;
  const name=card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  const like = cardElement.querySelector('.card__like-button');
  const cardDelete= cardElement.querySelector('.card__delete-button');
  const clickedImage = cardElement.querySelector(".card__image");
  clickedImage.addEventListener('click', ()=>openModelImage(cardElement,link,name))
  like.addEventListener('click', ()=>clickLike(like));
  cardDelete.addEventListener('click', () => handleDeleteCard(cardElement));
  return cardElement;
}
export function handleDeleteCard(elm){
  elm.remove();
}
export function clickLike(pop){
  if(!pop.classList.contains('card__like-button_is-active')){
    pop.classList.add('card__like-button_is-active'); 
  }
  else{
    pop.classList.remove('card__like-button_is-active');
  }
}
