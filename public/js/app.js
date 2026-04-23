console.log("javascript from client side!");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";
  e.preventDefault();

  const searchTerm = searchInput.value;

  if (!searchTerm) {
    messageOne.textContent = "Please enter a city name !";
  } else {
    fetch(
      `/weather?address=${searchTerm}`,
    ).then((response) => {
      response.json().then((data) => {
        console.log(data)
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = `Your provided address is ${data.location}`;
          messageTwo.textContent = data.forecast;
        }
      });
    });
  }
});
