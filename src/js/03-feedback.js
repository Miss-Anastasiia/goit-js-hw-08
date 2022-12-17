import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

const formData = {};

function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

(function formDataLocalStorage() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');
  if (saved) {
    email.value = saved.email;
    message.value = saved.message;
  }
})();
