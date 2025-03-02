const clearErrors = () => {
  const errorElements = document.querySelectorAll('.formerror');
  errorElements.forEach((element) => {
    element.textContent = '';
  });
};

const setError = (id, message) => {
  const element = document.getElementById(id);
  if (element) {
    const errorElement = element.querySelector('.formerror');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
};

const validateForm = (event) => {
  event.preventDefault();
  clearErrors();

  let isValid = true;

  const name = document.forms.myForm.fname.value.trim();
  const email = document.forms.myForm.femail.value.trim();
  const phone = document.forms.myForm.fphone.value.trim();
  const purpose = document.forms.myForm.fpurpose.value.trim();

  if (name.length === 0) {
    setError('name', '*Name cannot be empty!');
    isValid = false;
  } else if (name.length < 5) {
    setError('name', '*Name is too short (min 5 characters).');
    isValid = false;
  }

  if (email.length > 50) {
    setError('email', '*Email is too long (max 50 characters).');
    isValid = false;
  }

  if (phone.length !== 10 || !/^\d+$/.test(phone)) {
    setError('number', '*Phone number must be 10 digits.');
    isValid = false;
  }

  if (purpose.length === 0) {
    setError('purpose', '*Please enter your purpose of booking.');
    isValid = false;
  }

  if (isValid) {
    event.target.submit();
  }
};

const form = document.forms.myForm;
if (form) {
  form.addEventListener('submit', validateForm);
}
