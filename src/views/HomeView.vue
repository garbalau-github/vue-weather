<template>
  <div>
    <img class="vue-logo" alt="Vue" src="../assets/logo.png" />
    <div
      id="weather-app"
      :class="
        typeof weather.main != 'undefined' && weather.main.temp > 20
          ? 'warm'
          : ''
      "
    >
      <main>
        <div class="search-box">
          <input
            @keypress="fetchWeather"
            v-model="query"
            placeholder="Search..."
            type="text"
            class="search-bar"
          />
        </div>

        <div v-if="typeof weather.main !== 'undefined'" class="weather-wrap">
          <div class="location-box">
            <div class="location">
              {{ weather.name }}, {{ weather.sys.country }}
            </div>
            <div class="date">{{ getDate() }}</div>
          </div>
          <div class="weather-box">
            <div class="temp">{{ Math.round(weather.main.temp) }}°с</div>
            <div class="weather">{{ weather.weather[0].main }}</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      api_key: 'YOUR_API_KEY',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
    };
  },
  methods: {
    async fetchWeather(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        const response = await fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`
        );
        const data = await response.json();
        this.setResults(data);
      }
    },
    setResults(data: any) {
      this.weather = data;
    },
    getDate() {
      let newDate = new Date();
      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      let day = days[newDate.getDay()];
      let date = newDate.getDate();
      let month = months[newDate.getMonth()];
      let year = newDate.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
  },
});
</script>

<style lang="scss" scoped>
#weather-app {
  background-image: url('../assets/cold-bg.jpeg');
  background-size: cover;
  background-position: bottom;
  transition: all 0.4s;
  width: 400px;
  margin: 0 auto;
  border-radius: 10px;
}
#weather-app.warm {
  background-image: url('../assets/warm-bg.jpeg');
  transition: all 0.4s;
  border-radius: 10px;
}
.vue-logo {
  width: 50px;
  height: 50px;
  margin: 15px 0;
}
main {
  min-height: 60vh;
  padding: 25px;
}
.search-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  .search-bar {
    width: 75%;
    padding: 10px;
    color: #313131;
    font-size: 18px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    transition: 0.4s;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    &:focus {
      background-color: rgba(255, 255, 255, 0.75);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    }
  }
}
.location-box {
  .location {
    color: #fff;
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.15);
  }
  .date {
    margin-top: 5px;
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
  }
}

.weather-box {
  text-align: center;
  .temp {
    display: inline-block;
    padding: 15px 25px;
    color: #fff;
    font-size: 70px;
    font-weight: 900;
    border-radius: 15px;
    margin: 35px 0;
    background-color: rgba(255, 255, 255, 0.25);
    text-shadow: 2px 4px rgba(0, 0, 0, 0.25);
    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
  .weather {
    color: #fff;
    font-size: 40px;
    font-weight: 700;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
}
</style>
