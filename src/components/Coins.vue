<template>
  <div class="coins">
    <h1 class="text-3xl py-4 border-b mb-10">{{ title }}</h1>

    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
      <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
        <thead>
          <tr class="text-left">
              <th
                  v-for="label in labels"
                  :key="label"
                  class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
              >
                {{ label }}
              </th>
          </tr>
        </thead>
        <tbody>
          <CoinRow
              v-for="coin in coinsList"
              :key="coin.id"
              :id="coin.id"
              :symbol="coin.symbol"
              :name="coin.name"
              :imagePath="coin.image"
              :current_price="coin.current_price"
              :market_cap="coin.market_cap"
              :market_cap_rank="coin.market_cap_rank"
          ></CoinRow>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import CoinRow from "./CoinRow";

export default {
  name: 'Coins',
  components: {CoinRow},
  props: {
    title: String,
    coinsList: Array,
  },
  data() {
    return {
      labels: [
          'Rank',
          'Coin',
          'Price',
          'Market Cap.',
      ]
    }
  },
}
</script>
