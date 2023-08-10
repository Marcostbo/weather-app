import { defineStore } from 'pinia'

export const cityNameStore = defineStore('counter', {
  state: () => {
    return { cityName: 'London' }
  },
  actions: {
    setCityName(cityName) {
      this.cityName = cityName;
    },
  },
})
