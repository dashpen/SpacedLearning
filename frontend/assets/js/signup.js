const url = "http://192.168.1.213:3000";
document
  .getElementById("signupForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    fetch(url + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (errorMessages[response.status]) {
            console.error("Error:", errorMessages[response.status], "With response: ", response.text());
            throw new Error(errorMessages[response.status]);
          } else {
            throw new Error("Unknown error occurred. Status: " + response.status);
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          const successMessage = document.getElementById("successMessage");
          successMessage.textContent = "Signup successful!";
          successMessage.style.display = "block";
          window.location.href = "/login.html";
        } else {
          throw new Error("Unknown error occurred during signup.");
        }
        })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = error;
        errorMessage.style.display = "block";
      });
  });

  const errorMessages = {
    400: "Your username or password were invalid. Please try again.",
    401: "Invalid Password: The password you entered is incorrect.",
    404: "User does not exist. Please check your username.",
    409: "Username or email already exists. Please choose a different one.",
    429: "Too Many Requests: You have exceeded the number of allowed login attempts. Please try again later.",
    500: "The server encountered an error while processing your request. Please try again later."
}