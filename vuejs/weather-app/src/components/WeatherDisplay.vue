<template>
    <div class="weather-data">
        <div class="current-weather">
            <div class="details">
                <h2>_______ ( ______ )</h2>
                <h6>Temperature: __°C</h6>
                <h6>Wind: __ m/s</h6>
                <h6>Humidity: __%</h6>
            </div>
            <div class="icon">
                <img :src="baseSky" alt="weather-icon">
                <h4> Moderate Rain </h4>
            </div>
        </div>
        <div class="days-forecast">
            <h2> 5-Day Forecast </h2>
            <ul class="weather-cards">
                <li v-for="forecast in forecasts" class="card">
                    <h3> {{ forecast.day }} </h3>
                    <img :src="baseSky" alt="weather-icon">
                    <h4> Temperature: {{ forecast.temperature }} °C </h4>
                    <h4> Wind: {{ forecast.wind }} m/s </h4>
                    <h4> Humidity: {{ forecast.humidity }}% </h4>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        this.getBaseSky(); // Get the sky after the component is loaded
    },
    methods: {
        getBaseSky() {
            this.baseSky = "https://openweathermap.org/img/wn/10d@4x.png";
        }
    },
    data() {
        return {
            baseSky: "",
            forecasts: [
                { day: '2023-08-11', temperature: 31, wind: 2, humidity: 10 },
                { day: '2023-08-12', temperature: 32, wind: 12, humidity: 12 },
                { day: '2023-08-13', temperature: 33, wind: 9, humidity: 7 },
                { day: '2023-08-14', temperature: 34, wind: 8, humidity: 12 },
                { day: '2023-08-15', temperature: 35, wind: 5, humidity: 10 }
            ]
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
}</style>