import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your Firebase config (use your own values)
const firebaseConfig = {
  apiKey: "AIzaSyAIuTmWFJh45NaTSRxy4Dd0D_KC5tytAGE",
  authDomain: "aifitnesscoach-48417.firebaseapp.com",
  projectId: "aifitnesscoach-48417",
  storageBucket: "aifitnesscoach-48417.firebasestorage.app",
  messagingSenderId: "200065077412",
  appId: "1:200065077412:web:7b8ae1e05a873fd7fe5631",
  measurementId: "G-WDB23JWY5J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const signupButtons = document.querySelectorAll(".sign-up-btn, .btn-primary");
  const modal = document.getElementById("signup-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const signupForm = document.getElementById("signup-form");
  const submitBtn = signupForm.querySelector('button[type="submit"]');
  const spinner = document.getElementById("spinner");
  const formMessage = document.getElementById("form-message");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  // Email regex for basic validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Open modal
  signupButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      formMessage.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";
      submitBtn.disabled = false;
      spinner.style.display = "none";
      signupForm.reset();
    });
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle form submission
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let valid = true;

    // Reset errors
    emailError.textContent = "";
    passwordError.textContent = "";
    formMessage.textContent = "";

    // Validate email
    if (!email) {
      emailError.textContent = "Email is required.";
      valid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Validate password
    if (!password) {
      passwordError.textContent = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      valid = false;
    }

    if (!valid) return;

    // Disable submit and show spinner
    submitBtn.disabled = true;
    spinner.style.display = "inline-block";

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      formMessage.style.color = "green";
      formMessage.textContent = `Thanks for signing up, ${user.email}!`;

      signupForm.reset();
    } catch (error) {
      formMessage.style.color = "red";
      formMessage.textContent = error.message;
    } finally {
      spinner.style.display = "none";
      submitBtn.disabled = false;
    }
  });
});
const chatOutput = document.getElementById("chat-output");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Preset Q&A
const fitnessResponses = {
  "hello": "Hello! I am your AI Fitness Assistant 🤖",
  "hi": "Hi there! Ready to get fit today? 💪",
  "workout": "Try a 20-min full body workout: push-ups, squats, and planks.",
  "diet": "Eat balanced meals: proteins, carbs, and vegetables. Drink water too!",
  "bye": "Goodbye! Stay healthy and keep moving! 🏃‍♂️"
};

function sendMessage() {
  const userMsg = chatInput.value.toLowerCase().trim();
  if (!userMsg) return;

  // Display user message
  const userP = document.createElement("p");
  userP.textContent = `You: ${chatInput.value}`;
  chatOutput.appendChild(userP);

  // Get bot response
  let botResponse = fitnessResponses[userMsg] || "I can only answer simple fitness questions for now.";

  const botP = document.createElement("p");
  botP.textContent = `Bot: ${botResponse}`;
  chatOutput.appendChild(botP);

  chatOutput.scrollTop = chatOutput.scrollHeight; // auto-scroll
  chatInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});


// Scroll animations
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
// Removed duplicate declaration and event listener for trackBtn and trackSpinner
const scrollElements = document.querySelectorAll('.animate-on-scroll');

function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    scrollElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if(elementTop < triggerBottom) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll); // also run on page load
// Existing code ends here...

// Animate elements on scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');

function checkAnimate() {
  const triggerBottom = window.innerHeight * 0.85;

  animateElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      el.classList.add('fade-in-active');
    }
  });
}

window.addEventListener('scroll', checkAnimate);
window.addEventListener('load', checkAnimate);
const trackBtn = document.getElementById('track-btn');
const trackSpinner = document.getElementById('track-spinner');

trackBtn.addEventListener('click', () => {
  trackSpinner.style.display = 'inline-block';  // show spinner
  trackBtn.disabled = true;                     // disable button

  // Simulate API call delay (2 seconds)
  setTimeout(() => {
    trackSpinner.style.display = 'none';       // hide spinner
    trackBtn.disabled = false;                 // enable button
    alert('Progress tracked successfully!');   // optional success message
  }, 2000);
});