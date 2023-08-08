<template>
<div class="container">
    <div class="weather-input">
        <h3>Enter a City Name</h3>
        <input class="city-input" type="text" v-model="cityInput" 
        placeholder="E.g., Juiz de Fora, Rio de Janeiro, London">
        <button class="search-btn" @click.prevent="getCity()"> Search </button>
        <div class="separator"></div>
        <button class="location-btn"> Use Current Location </button>
        {{ isChanged }}
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            cityInput: 'London',
            cityChanged: 'No'
        };
    },
    computed: {
        isChanged() {
            if (this.cityInput != 'London') {
                return 'Yes';
            };
            return 'No';
        }
    },
    methods: {
        getCity() {
            console.log(this.cityInput);
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
.container {
  display: flex;
  gap: 35px;
  padding: 30px;
}
.weather-input {
  width: 550px;
}
.weather-input input {
  height: 46px;
  width: 100%;
  outline: none;
  font-size: 1.07rem;
  padding: 0 17px;
  margin: 10px 0 20px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.weather-input input:focus {
  padding: 0 16px;
  border: 2px solid #03c04a;
}
.weather-input .separator {
  height: 1px;
  width: 100%;
  margin: 25px 0;
  background: #BBBBBB;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-input .separator::before{
  content: "or";
  color: #6C757D;
  font-size: 1.18rem;
  padding: 0 15px;
  margin-top: -4px;
  background: #E3F2FD;
}
.weather-input button {
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background: #03c04a;
  transition: 0.2s ease;
}
.weather-input .search-btn:hover {
  background: #03c04a;
}
.weather-input .location-btn {
  background: #6C757D;
}
.weather-input .location-btn:hover {
  background: #5c636a;
}
</style>