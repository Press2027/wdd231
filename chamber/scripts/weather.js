// OpenWeatherMap API configuration
const apiKey = "bd5e378503939ddaee76f12ad7a97608"; // Ensure your key is active
const lat = -1.387;
const lon = 36.939;

// API endpoints
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Fetch current weather
async function loadWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();

    // Update temperature
    document.querySelector("#temp").textContent = Math.round(data.main.temp);

    // Capitalize each word in the description
    const desc = data.weather[0].description;
    document.querySelector("#description").textContent = desc
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
  } catch (error) {
    console.error("Error loading weather:", error);
  }
}

// Fetch 3-day forecast
async function loadForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) throw new Error("Failed to fetch forecast data");

    const data = await response.json();

    // Filter for midday readings
    const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Display next 3 days
    forecast.slice(0, 3).forEach((day, index) => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      document.querySelector(`#day${index + 1}`).textContent = dayName;
      document.querySelector(`#temp${index + 1}`).textContent = Math.round(day.main.temp);
    });

  } catch (error) {
    console.error("Error loading forecast:", error);
  }
}

// Initialize
loadWeather();
loadForecast();
