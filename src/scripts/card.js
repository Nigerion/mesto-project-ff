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
  const idCard=card.owner['_id'];
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
  removeCard(id,elm)
  .then((res)=>{
    elm.remove();
  })
  .catch((err)=>{
    console.log(err)
  });
}
// ф-ия клика на лайк
export function clickLike(like,id,cardElement){
  if(!like.classList.contains('card__like-button_is-active')){
    toPutLike(id,cardElement)
    .then((res)=>{
      like.classList.add('card__like-button_is-active');
      console.log(res.likes.length);
      cardElement.querySelector(".card__like-quantity").textContent = res.likes.length;
    })
    .catch((err)=>{
      console.log(err)
    });
  }
  else{
    removeLike(id,cardElement)
    .then((res)=>{
      like.classList.remove('card__like-button_is-active');
      console.log(res.likes.length);
        cardElement.querySelector(".card__like-quantity").textContent =res.likes.length ;
    })
    .catch((err)=>{
      console.log(err)
    });
  }
}