const apiKey = "bd5e378503939ddaee76f12ad7a97608";
const lat = -1.387, lon = 36.939;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function loadWeather() {
  try {
    const res = await fetch(weatherURL);
    const data = await res.json();
    document.querySelector("#temp").textContent = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    document.querySelector("#description").textContent = desc.split(" ").map(w => w[0].toUpperCase()+w.slice(1)).join(" ");
  } catch(err){ console.error(err); }
}
async function loadForecast() {
  try {
    const res = await fetch(forecastURL);
    const data = await res.json();
    const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,3);
    forecast.forEach((day,i)=>{
      const date = new Date(day.dt*1000);
      document.querySelector(`#day${i+1}`).textContent = date.toLocaleDateString("en-US",{weekday:"long"});
      document.querySelector(`#temp${i+1}`).textContent = Math.round(day.main.temp);
    });
  } catch(err){ console.error(err); }
}
loadWeather(); loadForecast();
