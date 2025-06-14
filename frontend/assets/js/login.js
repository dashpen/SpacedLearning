// const url = "http://192.168.1.213:3000";
const url = "http://75.6.164.31:3000"

const headers = new Headers();
headers.append("Content-Type", "application/json");
// headers.append("Access-Control-Allow-Origin", "*");
// headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
// headers.append("credentials", "include");
// headers.append()

document
  .getElementById("loginForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    document.getElementById("loadingMessage").style.display = "block";

    fetch(url + "/login", {
      method: "POST",
      headers: headers,
      // credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        console.log("Sending request with url: ", url + "/login");
        document.getElementById("loadingMessage").style.display = "none";
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
            successMessage.textContent = "Login successful!";
            successMessage.style.display = "block";

            sessionStorage.setItem("loggedIn", true)

            sessionStorage.setItem("username", username);

fetch("http://75.6.164.31:3000/user/problems", {
    method: "GET",
    headers: headers,
    credentials: "include",
}).then((response) => {
    console.log(response);
    if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText, "with status: " + response.status);
        } else
    return response.json();
}).then((data) => {
    console.log(data);
})
.catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
});

            // window.location.href = "/dashboard.html";
        } else {
          throw new Error("Unknown error occurred during signup.");
        }
      }
      ) 
      .catch((error) => {
        document.getElementById("loadingMessage").style.display = "none";
        console.error("There was a problem with the fetch operation:", error);
        console.log(error);
        const errorMessage = document.getElementById("errorMessage");
        let errorText = error.message;
        if (error instanceof TypeError) {
          errorText = "Network error: Unable to connect to the server. Please check your internet connection.";
        }
        errorMessage.textContent = errorText;
        errorMessage.style.display = "block";
      });
  });

const errorMessages = {
    400: "Your username or password were invalid. Please try again.",
    401: "Invalid Password: The password you entered is incorrect.",
    404: "User does not exist. Please check your username.",
    429: "Too Many Requests: You have exceeded the number of allowed login attempts. Please try again later.",
    500: "The server encountered an error while processing your request. Please try again later."
}