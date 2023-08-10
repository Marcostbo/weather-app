<template>
    <navbar></navbar>
    <div class="container">
        <cityinput></cityinput>
        <weather-display></weather-display>
    </div>
</template>

<script>
import Navbar from './components/NavBar.vue'
import Cityinput from './components/CityInput.vue'
import WeatherDisplay from './components/weatherDisplay.vue'

export default {
    components: {
        Navbar,
        Cityinput,
        WeatherDisplay
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
.container {
  display: flex;
  gap: 35px;
  padding: 30px;
}
</style>