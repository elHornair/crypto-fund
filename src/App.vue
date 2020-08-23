<template>
  <div id="app">
    <Coins title="List of coins" :coinsList="coinsList"/>
  </div>
</template>

<script>

import Coins from './components/Coins.vue'
import CoinsListData from '../data.json'

export default {
  name: 'App',
  components: {
    Coins
  },
  data() {
    return {
      coinsList: CoinsListData
    }
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
