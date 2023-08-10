<template>
    <div class="weather-data">
        <div v-if="isFetching">
            Loading...
        </div>
        <div v-else class="current-weather">
            <div class="details">
                <h2>{{ cityName }} ( {{ fiveDaysForecast[0].dt_txt.split(" ")[0] }} )</h2>
                <h6>Temperature: {{ (fiveDaysForecast[0].main.temp - 273.15).toFixed(2) }} °C</h6>
                <h6>Wind: {{ fiveDaysForecast[0].wind.speed }} m/s</h6>
                <h6>Humidity: {{ fiveDaysForecast[0].main.humidity }} %</h6>
            </div>
            <div class="icon">
                <img :src="getWeatherImage(fiveDaysForecast[0])" alt="weather-icon">
                <h4> {{ fiveDaysForecast[0].weather[0].description }} </h4>
            </div>
        </div>
        <div class="days-forecast">
            <h2> 5-Day Forecast </h2>
            <ul class="weather-cards">
                <li v-for="forecast in fiveDaysForecast.slice(1)" class="card">
                    <h3>{{ cityName }} ( {{ forecast.dt_txt.split(" ")[0] }} )</h3>
                    <img :src="getWeatherImage(forecast)" alt="weather-icon">
                    <h4>Temperature: {{ (forecast.main.temp - 273.15).toFixed(2) }} °C</h4>
                    <h4>Wind: {{ forecast.wind.speed }} m/s</h4>
                    <h4>Humidity: {{ forecast.main.humidity }} %</h4>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { cityNameStore } from '../stores.js'

const API_KEY = "f4d84a0e6148a8aa2fbc9455391ae8ba";

export default {
    created: async function() {
        const defaultCity = cityNameStore().cityName;
        console.log(defaultCity);
        await this.fetchWeather(defaultCity);
        console.log(this.fiveDaysForecast);
    },
    watch: {
        cityName(newCityName) {
            this.isFetching = true;
            this.fetchWeather(newCityName);
            console.log(this.fiveDaysForecast);
        },
    },
    computed: {
        cityName() {
            return cityNameStore().cityName;
        },
    },
    methods: {
        getWeatherImage(forecast) {
            return `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`
        },
        async fetchWeather(cityName) {
            try {
                const COORDINATES_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
                const coordinatesResponse = await fetch(COORDINATES_API_URL);
                const coordinatesData = await coordinatesResponse.json();

                if (!coordinatesData.length) {
                    alert(`No coordinates found for ${cityName}`);
                    return;
                }

                const { lat, lon, name } = coordinatesData[0];

                const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
                const weatherResponse = await fetch(WEATHER_API_URL);
                const weatherData = await weatherResponse.json();

                const uniqueForecastDays = [];
                const fiveDaysForecast = weatherData.list.filter(forecast => {
                    const forecastDate = new Date(forecast.dt_txt).getDate();
                    if (!uniqueForecastDays.includes(forecastDate)) {
                        return uniqueForecastDays.push(forecastDate);
                    }
                });

                this.fiveDaysForecast = fiveDaysForecast;
                this.isFetching = false;
            } catch (error) {
                alert("An error occurred while fetching the coordinates or weather details!");
            }
        }
    },
    data() {
        return {
            fiveDaysForecast: [],
            isFetching: true,
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');

.weather-data {
    width: 100%;
}

.weather-data .current-weather {
    color: #fff;
    background: #03c04a;
    border-radius: 5px;
    padding: 20px 70px 20px 20px;
    display: flex;
    justify-content: space-between;
}

.current-weather h2 {
    font-weight: 700;
    font-size: 1.7rem;
}

.weather-data h6 {
    margin-top: 12px;
    font-size: 1rem;
    font-weight: 500;
}

.current-weather .icon {
    text-align: center;
}

.current-weather .icon img {
    max-width: 120px;
    margin-top: -15px;
}

.current-weather .icon h6 {
    margin-top: -10px;
    text-transform: capitalize;
}

.days-forecast h2 {
    margin: 20px 0;
    font-size: 1.5rem;
}

.days-forecast .weather-cards {
    display: flex;
    gap: 20px;
}

.weather-cards .card {
    color: #fff;
    padding: 18px 16px;
    list-style: none;
    width: calc(100% / 5);
    background: #6C757D;
    border-radius: 5px;
}

.weather-cards .card h3 {
    font-size: 1.3rem;
    font-weight: 600;
}

.weather-cards .card img {
    max-width: 70px;
    margin: 5px 0 -12px 0;
}
</style>