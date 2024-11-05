document.addEventListener("DOMContentLoaded", () => {
  const latitude = document.getElementById("latitude");
  const longitude = document.getElementById("longitude");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const visibilityDisplay = document.getElementById("visibility");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "8961b0c96e1f8f3717777c388fb5c342"; // Corrected `API_KEY`

  getWeatherButton.addEventListener("click", async () => {
    const longitudeval = longitude.value;
    const latitudeval = latitude.value;
    if (!longitudeval || !latitudeval) {
      return;
    } else {
      try {
        const weatherData = await fetchWeatherData(latitudeval, longitudeval);
        displayWeatherData(weatherData);
      } catch (error) {
        showError();
      }
    }
  });

  async function fetchWeatherData(latitudeval, longitudeval) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeval}&lon=${longitudeval}&appid=${API_KEY}&units=metric`; // Fixed variable name and set units to 'metric'
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City Not Found");
    } else {
      const data = await response.json();
      return data;
    }
  }

  function displayWeatherData(data) {
    const { name, main, weather, visibility } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    visibilityDisplay.textContent = `Visibility: ${visibility} meters`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
