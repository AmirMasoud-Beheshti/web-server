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
      `https://api.weatherapi.com/v1/current.json?key=57e1dae312674a30aab111828261504&q=${searchTerm}&aqi=no`,
    ).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error.message;
        } else {
          messageOne.textContent = `Your provided address is ${data.location.country}`;
          messageTwo.textContent = `It's currently ${data.current.temp_c} degrees out. It's feel like ${data.current.feelslike_c} degrees out`;
        }
      });
    });
  }
});
