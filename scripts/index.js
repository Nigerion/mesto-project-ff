// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(function (el) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placesList = document.querySelector('.places__list');
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    placesItem.querySelector('.card__image').src = el.link;
    placesItem.querySelector('.card__title').textContent = el.name;
    placesList.append(placesItem); 
});

let deleteCard = document.querySelectorAll('.card__delete-button');
deleteCard.forEach((elem)=>{
  elem.addEventListener('click', deleteParent);
});
function deleteParent(){
    let deleteElement = this.parentElement;
    deleteElement.remove();
}