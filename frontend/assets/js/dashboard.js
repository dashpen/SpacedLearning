const url = "http://75.6.164.31:3000";
const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("connection", "keep-alive");

fetch(url + "/user/problems", {
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