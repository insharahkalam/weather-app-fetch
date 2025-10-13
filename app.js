const api_key = `813956745dd227de2fc5dd8a67f4e5d5`;
const input = document.getElementById("searchCity");
const weatherIconShow = document.getElementById("weatherIcon")

async function inp(city) {
  try {
    input.value = ""
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    );
    console.log(response);
    let result = await response.json();
    displayWeather(result);
  }
  catch (err) {
    console.log(err.message)
  }
}

let btn = document.getElementById("btn")
btn.addEventListener("click", (e) => {
  e.preventDefault()
  inp(input.value);
})

function displayWeather(result) {
  const { name, main, weather, wind } = result;

  let iconSrc = "";
  switch (weather[0].main) {
    case "Haze":
      iconSrc = "./images/haze.png";
      break;
    case "Clouds":
      iconSrc = "./images/clouds.png";
      break;
    case "Rain":
      iconSrc = "./images/rain.png";
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
    default:
      iconSrc = "./images/default.png";
  }

  const weatherBoxMain = document.getElementById("weatherBoxMain")
  weatherBoxMain.innerHTML = `
    <div class="weatherBox">
                    <div class="temp" id="weatherpic">
                        <img src="${iconSrc}" alt="" id="weatherIcon">
                        <p>${Math.round(main.temp)}°C</p>
                        <p>${weather[0].main}</p>
                        <p>${name}</p>
                    </div>
    
                    <div class="others">
                        <div class="wind">
                            <img src="./images/wind.png" alt="">
                            <p>Wind</p>
                            <p>${wind.speed}km/h</p>
                        </div>
                        <div class="press">
                        <img src="./images/pressure.png" alt="">
                            <p>Pressure</p>
                            <p>${main.pressure}mb</p>
                        </div>
                        <div class="humi">
                            <img src="./images/humidity.png" alt="">
                            <p>Humidity</p>
                            <p>${main.humidity}%</p>
                        </div>
    
                    </div>
                </div>`;
}


