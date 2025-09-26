document.addEventListener('DOMContentLoaded', function () {
  // Tabbed Interface
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });

  // Click Events
  document.getElementById('alertButton').addEventListener('click', function () {
    alert('Hello! This is an alert triggered by a click event.');
  });

  document.getElementById('changeTextButton').addEventListener('click', function () {
    const textElement = document.getElementById('textToChange');
    textElement.textContent = 'The text has been changed! JavaScript events are powerful.';
    textElement.style.color = '#e74c3c';
  });

  document.getElementById('toggleVisibilityButton').addEventListener('click', function () {
    const element = document.getElementById('toggleVisibility');
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
  });

  // Mouse Events
  const mouseBox = document.getElementById('mouseBox');
  const mouseStatus = document.getElementById('mouseStatus');

  mouseBox.addEventListener('mouseover', function () {
    mouseBox.textContent = 'Mouse over!';
    mouseBox.style.backgroundColor = '#2ecc71';
    mouseStatus.textContent = 'Mouse over event detected';
  });

  mouseBox.addEventListener('mouseout', function () {
    mouseBox.textContent = 'Mouse out!';
    mouseBox.style.backgroundColor = '#e74c3c';
    mouseStatus.textContent = 'Mouse out event detected';

    setTimeout(() => {
      mouseBox.textContent = 'Hover over me!';
      mouseBox.style.backgroundColor = '#3498db';
      mouseStatus.textContent = 'Mouse events will appear here.';
    }, 1000);
  });

  mouseBox.addEventListener('click', function () {
    mouseBox.textContent = 'Clicked!';
    mouseBox.style.backgroundColor = '#f39c12';
    mouseStatus.textContent = 'Click event detected';
  });

  // Keyboard Events
  const keyboardInput = document.getElementById('keyboardInput');
  const keyboardStatus = document.getElementById('keyboardStatus');

  keyboardInput.addEventListener('keydown', function (event) {
    keyboardStatus.textContent = `Key down: ${event.key}`;
  });

  keyboardInput.addEventListener('keyup', function (event) {
    keyboardStatus.textContent = `Key up: ${event.key} - Full input: ${keyboardInput.value}`;
  });

  // Dark/Light Mode Toggle
  const themeToggle = document.getElementById('themeToggle');

  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    themeToggle.textContent = document.body.classList.contains('dark-mode')
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
  });

  // Counter
  let counterValue = 0;
  const counterElement = document.getElementById('counterValue');

  document.getElementById('incrementButton').addEventListener('click', function () {
    counterValue++;
    counterElement.textContent = counterValue;
    updateCounterColor();
  });

  document.getElementById('decrementButton').addEventListener('click', function () {
    counterValue--;
    counterElement.textContent = counterValue;
    updateCounterColor();
  });

  function updateCounterColor() {
    if (counterValue > 0) {
      counterElement.style.color = '#2ecc71';
    } else if (counterValue < 0) {
      counterElement.style.color = '#e74c3c';
    } else {
      counterElement.style.color = '';
    }
  }

  // FAQ Section
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question span').textContent = '+';
        }
      });

      item.classList.toggle('active');
      const span = question.querySelector('span');
      span.textContent = item.classList.contains('active') ? '−' : '+';
    });
  });

  // Form Validation
  const form = document.getElementById('validationForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      document.getElementById('successMessage').style.display = 'block';

      setTimeout(() => {
        form.reset();
        document.getElementById('successMessage').style.display = 'none';
      }, 3000);
    }
  });

  function validateName() {
    const nameValue = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (nameValue === '') {
      showError(nameInput, nameError, 'Name is required');
      return false;
    } else if (!nameRegex.test(nameValue)) {
      showError(nameInput, nameError, 'Name can only contain letters and spaces');
      return false;
    } else {
      hideError(nameInput, nameError);
      return true;
    }
  }

  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
      showError(emailInput, emailError, 'Email is required');
      return false;
    } else if (!emailRegex.test(emailValue)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      return false;
    } else {
      hideError(emailInput, emailError);
      return true;
    }
  }

  function validatePassword() {
    const passwordValue = passwordInput.value;
    const passwordError = document.getElementById('passwordError');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (passwordValue === '') {
      showError(passwordInput, passwordError, 'Password is required');
      return false;
    } else if (!passwordRegex.test(passwordValue)) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters with uppercase, lowercase, and a number');
      return false;
    } else {
      hideError(passwordInput, passwordError);
      return true;
    }
  }

  function validateConfirmPassword() {
    const confirmPasswordValue = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    if (confirmPasswordValue === '') {
      showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
      return false;
    } else if (confirmPasswordValue !== passwordValue) {
      showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
      return false;
    } else {
      hideError(confirmPasswordInput, confirmPasswordError);
      return true;
    }
  }

  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.style.borderColor = '#e74c3c';
  }

  function hideError(input, errorElement) {
    errorElement.style.display = 'none';
    input.style.borderColor = '#ddd';
  }
});
