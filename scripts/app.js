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

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(this));

  try {
    const response = await fetch("submit.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.status === "success") {
      loadComments();
      form.reset();
      isNameValid = isEmailValid = isMessageValid = false;
      updateSubmitButtonElState();
    }
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
});

async function loadComments() {
  try {
    const response = await fetch("get_comments.php");
    const comments = await response.json();

    const commentsList = document.querySelector(".comments__list");
    commentsList.innerHTML = "";

    comments.forEach((comment, index) => {
      const li = document.createElement("li");
      li.className = `card__item ${index % 2 === 0 ? "even" : "odd"}`;
      li.innerHTML = `
                <h2 class="card__title">${comment.name}</h2>
                <div class="card__description">
                    <p class="card__email">${comment.email}</p>
                    <p class="card__text">${comment.message}</p>
                </div>
            `;
      commentsList.appendChild(li);
    });
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
}

loadComments();
