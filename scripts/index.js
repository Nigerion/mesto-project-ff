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

const button = document.querySelector('.button');

button.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.setAttribute('disabled', true);
}); 