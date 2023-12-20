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
    toggleButtonState(inputList, buttonElement,validationConfig);
  });
}
// ф-ия валидирует поля 
export const enableValidation = (parametr) => { 
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