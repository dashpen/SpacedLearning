fetch("/navbar.html", { method: "GET"})
  .then(response => response.text())
  .then((html) => {
    document.getElementById("navbar").innerHTML = html;
  })
  .catch((error) => {
    console.error("There was an error with getting navbar", error);
  });

function logOut(){
  console.log("Logging out...");
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("username");
  fetch("/logout", { method: "POST" })
    .then(response => {
      if (!response.ok) {
        console.error("Error during logout:", response.statusText);
      }
    })
    .catch(error => {
      console.error("There was an error with the logout request:", error);
    });
}