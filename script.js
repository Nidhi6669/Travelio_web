document.addEventListener("DOMContentLoaded", function () {
    // Initialize default test user if not present
    const defaultUser = {
      fullname: "Test User",
      email: "test@gmail.com",
      password: "Test@123"
    };
  
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([defaultUser]));
    }
  
    // Utility functions for user management
    function getUsers() {
      return JSON.parse(localStorage.getItem("users")) || [];
    }
  
    function saveUsers(users) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    function validateEmail(email) {
      const emailReg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      return emailReg.test(email);
    }
  
    function validatePassword(password) {
      const passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*[#?!@$%^&*-]).{8,15}$/;
      return passReg.test(password);
    }
  
    function validateMobile(mobile) {
      const mobileReg = /^\d{10}$/;
      return mobileReg.test(mobile);
    }
  
    // Register User
    function registerUser() {
      const fullname = document.querySelector("#registermodal input[type='text']").value.trim();
      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value.trim();
      const mobile = document.querySelector("#mobile").value.trim();
  
      if (!validateEmail(email) || !validatePassword(password) || !validateMobile(mobile)) {
        alert("Please fill out all fields correctly.");
        return;
      }
  
      const users = getUsers();
      if (users.some((user) => user.email === email)) {
        alert("User already exists!");
        return;
      }
  
      users.push({ fullname, email, password });
      saveUsers(users);
      alert("Registration successful!");
      bootstrap.Modal.getInstance(document.getElementById("registermodal")).hide();
      resetRegistrationForm();
    }
  
    function resetRegistrationForm() {
      document.querySelector("#registermodal input[type='text']").value = '';
      document.querySelector("#email").value = '';
      document.querySelector("#password").value = '';
      document.querySelector("#mobile").value = '';
    }
  
    // Login User
    function loginUser() {
      const email = document.querySelector("#loginmodal input[type='email']").value.trim();
      const password = document.querySelector("#loginmodal input[type='password']").value.trim();
      const users = getUsers();
      const user = users.find((u) => u.email === email && u.password === password);
  
      if (user) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        bootstrap.Modal.getInstance(document.getElementById("loginmodal")).hide();
        updateButtonVisibility();
      } else {
        alert("Invalid credentials!");
      }
    }

  
    // Logout Functionality
    function handleLogout() {
        localStorage.setItem("loggedIn", "false");
      alert("Logged out successfully!");
      updateButtonVisibility();
    }
  
    window.handleLogout = handleLogout;
  
    // Update Button Visibility Based on Login Status
    function updateButtonVisibility() {
      const isLoggedIn = localStorage.getItem("loggedIn") === "true";
      const loginBtn = document.querySelector(".btn[data-bs-target='#loginmodal']");
      const registerBtn = document.querySelector(".btn[data-bs-target='#registermodal']");
  
      if (isLoggedIn) {
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
        if (!document.getElementById("logoutButton")) {
          const logoutBtn = document.createElement("button");
          logoutBtn.textContent = "Logout";
          logoutBtn.className = "btn btn-danger";
          logoutBtn.id = "logoutButton";
          logoutBtn.onclick = handleLogout;
          document.querySelector(".navbar-text").appendChild(logoutBtn);
        }
      } else {
        loginBtn.style.display = "inline-block";
        registerBtn.style.display = "inline-block";
        const logoutBtn = document.getElementById("logoutButton");
        if (logoutBtn) logoutBtn.remove();
      }
    }
  
    // Event Listeners for Registration and Login Buttons
    document.querySelector("#registermodal .btn-success").addEventListener("click", registerUser);
    document.querySelector("#loginmodal .btn-success").addEventListener("click", loginUser);
  
    // Date Picker Validation for Booking Form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').addEventListener('input', function () {
      if (this.value < today) {
        alert("Please select a future date.");
        this.value = today;
      }
    });
  
    document.getElementById('endDate').addEventListener('input', function () {
      const startDate = document.getElementById('startDate').value;
      if (this.value <= startDate) {
        alert("End date must be after the start date.");
        this.value = "";
      }
    });
  
    // Slick Carousel Initialization
    $(document).ready(function () {
      $(".responsive").slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
          { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
      });
    });
  
    // Password Validation on Input
    $("#password").keyup(function () {
      const value = $(this).val();
      if (validatePassword(value)) {
        $("#passtext").html("<span class='text-success'> Validated </span>");
      } else {
        $("#passtext").html("<span class='text-danger'> Not Validated </span>");
      }
    });
  
    // Email Validation on Input
    $("#email").keyup(function () {
      const value = $(this).val();
      if (validateEmail(value)) {
        $("#emailtext").html("<span class='text-success'> Validated </span>");
      } else {
        $("#emailtext").html("<span class='text-danger'> Not Validated </span>");
      }
    });
  
    // Mobile Validation on Input
    $("#mobile").keyup(function () {
      const value = $(this).val();
      if (validateMobile(value)) {
        $("#mobiletext").html("<span class='text-success'> Validated </span>");
      } else {
        $("#mobiletext").html("<span class='text-danger'> Not Validated </span>");
      }
    });
  
    updateButtonVisibility();
  });
  // 

  function switchModal(target) {
    if (target === 'login') {
        // Hide the register modal if it's open
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registermodal'));
        if (registerModal) registerModal.hide();

        // Show the login modal
        const loginModal = new bootstrap.Modal(document.getElementById('loginmodal'));
        loginModal.show();
    } else if (target === 'register') {
        // Hide the login modal if it's open
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginmodal'));
        if (loginModal) loginModal.hide();

        // Show the register modal
        const registerModal = new bootstrap.Modal(document.getElementById('registermodal'));
        registerModal.show();
    }
}
