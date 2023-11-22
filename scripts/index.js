// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(card){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardDelete= cardElement.querySelector('.card__delete-button');
  cardDelete.addEventListener('click', () => handleDeleteCard(cardElement));
  recyclingImage(cardElement);
  return cardElement;
}

function handleDeleteCard(elm){
  elm.remove();
}

function renderCard(cardElement){
  placesList.append(cardElement);
}

initialCards.forEach((cards) => { 
  renderCard(createCard(cards,cardTemplate) );
}); 

function recyclingImage(cardElement){
  const button = cardElement.querySelector(".card__image");
  const Popup = document.querySelector(".popup_type_image");
  const cross= Popup.querySelector('.popup__close');
  button.addEventListener('click', ()=>openModel(Popup));
  cross.addEventListener("click", ()=>closeModel(Popup));
  document.addEventListener('keydown', (e) => escape(e,Popup));
  Popup.addEventListener('click', (e) => overlay(e,Popup));
}

function recyclingButton(namebutton, namePopup){
  const button = document.querySelector(namebutton);
  const Popup =document.querySelector(namePopup);
  const cross= Popup.querySelector('.popup__close');
  button.addEventListener('click', ()=>openModel(Popup));
  cross.addEventListener("click", ()=>closeModel(Popup));
  document.addEventListener('keydown', (e) => escape(e,Popup));
  Popup.addEventListener('click', (e) => overlay(e,Popup));
}
function openModel(pop){
  pop.classList.add('popup_is-opened');
}
function closeModel(pop){
  pop.classList.remove('popup_is-opened');
}
function escape(e,namePop){
  if (e.key === "Escape") {
    namePop.classList.remove('popup_is-opened');
  }
}
function overlay(e,namePop){
  if (e.target === namePop) {
    namePop.classList.remove('popup_is-opened');
    }
}
recyclingButton('.profile__edit-button', '.popup_type_edit');
recyclingButton('.profile__add-button', '.popup_type_new-card');
