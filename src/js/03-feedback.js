import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

updateForm();

form.addEventListener('input', throttle(onFormInput,500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(e) {
    e.preventDefault();
    const {
        elements: { email, message }
      } = e.target;
      
      if (email.value === "" || message.value === "") {
        return window.alert("Please fill in all the fields!");
      };
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    
};


function updateForm() {
    if (localStorage.getItem(STORAGE_KEY) === null) {
return
    }
    const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
      Object.entries(savedForm).forEach(([name,value]) => {
        formData[name] = value;
        form.elements[name].value = value;
      });
};