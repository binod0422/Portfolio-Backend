//toggle the visibility of the additional text and change the button text
function toggleAdditionalText() {
  const additionalText = document.querySelector(".additional-text");
  const learnMoreBtn = document.querySelector(".learn-more-btn");

  if (additionalText.style.display === "none") {
    additionalText.style.display = "block";
    learnMoreBtn.textContent = "Less";
  } else {
    additionalText.style.display = "none";
    learnMoreBtn.textContent = "Learn More";
  }
}

// Adding event listener to the "Learn More" button
document.addEventListener("DOMContentLoaded", function () {
  const learnMoreBtn = document.querySelector(".learn-more-btn");
  learnMoreBtn.addEventListener("click", toggleAdditionalText);
});
const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

//Form Validation starts here
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
}

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim(); // Get the value of the message

  let isValid = true;

  if (usernameValue === '') {
    setError(username, 'Username is required');
    isValid = false;
  } else {
    setSuccess(username);
  }

  if (emailValue === '') {
    setError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'please provide a valid email address');
    isValid = false;
  } else {
    setSuccess(email);
  }

  
  if (messageValue.length > 500) { // Check if the message is longer than 500 characters
    setError(message, 'Message must be less than 500 characters');
    isValid = false;
  } else {
    setSuccess(message);
  }

  if (isValid) {
    postingFormInfo();
  }
};

//Form Validation stops here

//posting form data to the database
async function postingFormInfo() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const messageInput = document.getElementById("message").value;

  try {
    const formData = {
      name: nameInput.trim(),
      email: emailInput.trim(),
      message: messageInput.trim(),
    };

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Unable to post data");
    }

    const data = await response.json();
    console.log(data);

    // Assuming the server returns a success message, you can display it to the user
    alert("Thank you! " + nameInput.trim() + ", I'll reach out to you soon!");

    // Reset the form fields after successful submission
    document.getElementById("form").reset();
  } catch (error) {
    console.error("Error: " + error);
  }
}
