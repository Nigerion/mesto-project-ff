import {config} from './index'
// ф-ия деает запрос на получение данных пользоватея 
export function getUserData() {
  return fetch(`${config.baseUrl}users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
// ф-ия делает за прос на получение карточек 
export function getCardsData() {
  return fetch(`${config.baseUrl}cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
// ф-ия которая меняет данные профиля
export function redesignsProfile(name, job) {
  fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return Promise.reject(`Все нормально: ${res.status}`);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
// ф-ия отправляет запрос на добавление карочки 
export function addsCard(name, link) {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return Promise.reject(`Все нормально: ${res.status}`);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
// ф-ия делает запрос на удаление карточки 
export function removeCard(id) {
  fetch(`${config.baseUrl}cards/` + id, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return Promise.reject(`Все нормально: ${res.status}`);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
// ф-ия делате за просто на добавление лайка 
export function toPutLike(id, cardElement) {
  fetch(`${config.baseUrl}cards/likes/` + id, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        let like = cardElement.querySelector(
          ".card__like-quantity"
        ).textContent;
        cardElement.querySelector(".card__like-quantity").textContent =
          +like + 1;
        return Promise.reject(`Все нормально: ${res.status}`);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
// ф-ия делате за просто на удаление лайка 
export function removeLike(id, cardElement) {
  fetch(`${config.baseUrl}cards/likes/` + id, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        let like = cardElement.querySelector(
          ".card__like-quantity"
        ).textContent;
        cardElement.querySelector(".card__like-quantity").textContent =
          +like - 1;
        return Promise.reject(`Все нормально: ${res.status}`);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
// ф-ия делает запрос на изменение картинки аватара 
export function patchLinkImage(link) {
  fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        const profileImage = document.querySelector(".profile__image");
        profileImage.style.backgroundImage = `url('${link}')`;
        return Promise.reject(`Все нормально: ${res.status}`);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
