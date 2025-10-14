const api_key = `813956745dd227de2fc5dd8a67f4e5d5`;
const input = document.getElementById("searchCity");
const weatherIconShow = document.getElementById("weatherIcon");

async function inp(city) {
  const spinner = document.getElementById("spinner");
  const bottom = document.getElementById("bottom");
  const center = document.getElementById("center");
  const notFound = document.getElementById("notFound");

  try {
    spinner.style.display = "flex";
    bottom.style.display = "none";
    center.style.display = "none";
    notFound.innerHTML = "";
    input.value = "";

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    );

    let data = await response.json();
    spinner.style.display = "none";

    if (data.cod == 404) {
      notFound.innerHTML = `<p style="color:white; font-size:28px;">${city} is Not Found!</p>`;
      bottom.style.display = "none";
      center.style.display = "none";
      return false;
    }

    notFound.innerHTML = "";
    bottom.style.display = "flex";
    center.style.display = "flex";
    displayWeather(data);
  } catch (err) {
    console.log(err.message);
    spinner.style.display = "none";
  }
}

let btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  inp(input.value);
});

function displayWeather(data) {
  const { name, main, weather, wind } = data;

  let iconSrc = "";
  switch (weather[0].main) {
    case "Haze":
      iconSrc = "./images/haze2.png";
      break;
    case "Clouds":
      iconSrc = "./images/clouds.png";
      break;
    case "Rain":
      iconSrc = "./images/rainy.png";
      break;
    case "Mist":
      iconSrc = "./images/mist.png";
      break;
    case "Snow":
      iconSrc = "./images/snow.png";
      break;
    case "Clear":
      iconSrc = "./images/clear.png";
      break;
    case "Smoke":
      iconSrc = "./images/smoky.png";
      break;
    default:
      iconSrc = "./images/default.png";
  }

  const centerLeft = document.getElementById("centerLeft");
  centerLeft.innerHTML = `
    <p class="h1">${Math.round(main.temp)}</p>
    <div class="center-left">
      <p class="font">°C | °F</p>
      <p class="font">${weather[0].main}</p>
        <p>${name}</p>
    </div>`;

  const centerRight = document.getElementById("centerRight");
  centerRight.innerHTML = `
    <div class="right-img">  
      <img width="250" height="250" src=${iconSrc} alt="" id="weatherIcon">
    </div>
    <div class="right-content">

    <div class="press">
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-120q-83 0-141.5-58.5T280-320q0-48 21-89.5t59-70.5v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q38 29 59 70.5t21 89.5q0 83-58.5 141.5T480-120Zm0-80q50 0 85-35t35-85q0-29-12.5-54T552-416l-32-24v-280q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720v280l-32 24q-23 17-35.5 42T360-320q0 50 35 85t85 35Zm0-120Z"/></svg>
        <h4>Feels like: </h4>
        <p>${main.feels_like} °C</p>
      </div>

      <div class="wind">
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z"/></svg>
        <h4>Wind: </h4>
        <p>${wind.speed} km/h</p>
      </div>
      
      <div class="humi">
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100ZM240-416h480q0-47-18-89.5T650-580L480-748 310-580q-34 32-52 74.5T240-416Z"/></svg>
        <h4>Humidity: </h4>
        <p>${main.humidity}%</p>
      </div>
    </div>`;
}


const dateTime = document.getElementById("dateTime");
function formatDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  return now.toLocaleString("en-GB", options).replace(",", " |");
}

function updateTime() {
  dateTime.innerText = formatDateTime();
}
updateTime();
setInterval(updateTime, 1000);
