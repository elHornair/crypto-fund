<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Coins title="List of coins"/>
  </div>
</template>

<script>
import Coins from './components/Coins.vue'

export default {
  name: 'App',
  components: {
    Coins
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
