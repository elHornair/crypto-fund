<template>
  <div id="app" class="container mx-auto px-6 py-8 h-full flex-grow">
    <Coins title="List of coins" :coinsList="coinsList"/>
  </div>
</template>

<script>

import Coins from './components/Coins.vue'
import CoinsListData from '../data/data.json'

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
