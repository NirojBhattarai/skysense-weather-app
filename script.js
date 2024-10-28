document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  API_KEY = "8961b0c96e1f8f3717777c388fb5c342";

  getWeatherButton.addEventListener("click", async () => {
    const cityName = cityInput.value.trim();
    if (!cityName) {
      return;
    } else {
      try {
        const weatherData = await fetchWeatherData(cityName);
        displayWeatherData(weatherData);
      } catch (error) {
        showError();
      }
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City Not Found");
    } else {
      const data = await response.json();
      return data;
    }
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature:${main.temp} Degree Celsius`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
