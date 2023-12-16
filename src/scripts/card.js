import {openModelImage} from './index.js';
import{removeCard,toPutLike,removeLike} from './api.js'
// ф-ия создания карточек 
export function createCard(card,cardTemplate,handleDeleteCard,clickLike,crossCloseImage,popupImage,idUser){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__like-quantity').textContent=card.likes?card.likes.length:0;
  const link=card.link;
  const name=card.name;
  const idCard=card['_id']?card.owner['_id']:'a3442c9c-1d98-4987-b2c5-54a8880f1608';
  cardElement.querySelector('.card__title').textContent = card.name;
  const like = cardElement.querySelector('.card__like-button');
  const cardDelete= cardElement.querySelector('.card__delete-button');
  const clickedImage = cardElement.querySelector(".card__image");
  clickedImage.addEventListener('click', ()=>openModelImage(cardElement,link,name))
  like.addEventListener('click', ()=>clickLike(like, card['_id'],cardElement));
  if (idUser===idCard){
    cardDelete.addEventListener('click', () => handleDeleteCard(cardElement, card['_id']));
  }
  else{
    cardElement.querySelector('.card__delete-button').remove();
  }
  return cardElement;
}
// ф-ия которая удаляет элемент 
export function handleDeleteCard(elm,id){
  elm.remove();
  removeCard(id);
}
// ф-ия клика на лайк
export function clickLike(pop,id,cardElement){
  if(!pop.classList.contains('card__like-button_is-active')){
    pop.classList.add('card__like-button_is-active');
    toPutLike(id,cardElement);
  }
  else{
    pop.classList.remove('card__like-button_is-active');
    removeLike(id,cardElement);
  }
}
