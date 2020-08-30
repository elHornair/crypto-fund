<template>
  <div id="app" class="container mx-auto px-6 py-8 h-full flex-grow">
    <Coins :coinsList="coinsList" :config="config"/>
  </div>
</template>

<script>
import Coins from './components/Coins.vue'
import CoinsListData from '../data/marketData.json'
import ConfigData from '../data/configData.json'

export default {
  name: 'App',
  components: {
    Coins,
  },
  data() {
    return {
      coinsList: CoinsListData,
      config: ConfigData,
    }
  }
}
</script>
