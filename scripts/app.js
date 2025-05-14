const form = document.querySelector("[data-js-form]");
const nameInputEl = document.querySelector("[data-js-name-input]");
const emailInputEl = document.querySelector("[data-js-email-input]");
const messageInputEl = document.querySelector("[data-js-message-textarea]");
const submitButtonEl = document.querySelector("[data-js-form-button]");

let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;

const updateSubmitButtonElState = () => {
  if (isNameValid && isEmailValid && isMessageValid) {
    submitButtonEl.removeAttribute("disabled");
  } else {
    submitButtonEl.setAttribute("disabled", true);
  }
};

const validateName = () => {
  const value = nameInputEl.value.trim();
  const isValid = value.length >= 2 && /^[A-Za-zА-Яа-я]+$/.test(value);
  nameInputEl.classList.toggle("invalid", !isValid);
  isNameValid = isValid;
  updateSubmitButtonElState();
};

const validateEmail = () => {
  const value = emailInputEl.value.trim();
  const isValid = value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  emailInputEl.classList.toggle("invalid", !isValid);
  isEmailValid = isValid;
  updateSubmitButtonElState();
};

const validateMessage = () => {
  const value = messageInputEl.value.trim();
  const isValid = value.length >= 10;
  messageInputEl.classList.toggle("invalid", !isValid);
  isMessageValid = isValid;
  updateSubmitButtonElState();
};

nameInputEl.addEventListener("input", validateName);
emailInputEl.addEventListener("input", validateEmail);
messageInputEl.addEventListener("input", validateMessage);
