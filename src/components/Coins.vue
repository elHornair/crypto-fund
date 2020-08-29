<template>
  <div class="coins">
    <h1 class="text-3xl py-4 border-b mb-10">{{ title }}</h1>

    <div class="flex">
      <div class="max-w-sm rounded overflow-hidden shadow-lg m-6 text-right">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Total Market Cap</div>
          <p class="text-gray-700 text-base">
            {{ totalMarketCapFormatted }}
          </p>
        </div>
      </div>

      <div class="max-w-sm rounded overflow-hidden shadow-lg m-6 text-right">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Filtered Market Cap</div>
          <p class="text-gray-700 text-base">
            {{ filteredMarketCapFormatted }}
          </p>
        </div>
      </div>

      <div class="max-w-sm rounded overflow-hidden shadow-lg m-6 text-right">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Coverage</div>
          <p class="text-gray-700 text-base">
            {{ coverageFormatted }}
          </p>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
      <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
        <thead>
          <tr class="text-right">
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
              v-for="coin in enhancedCoinsList"
              :key="coin.id"
              :id="coin.id"
              :symbol="coin.symbol"
              :name="coin.name"
              :image-path="coin.image"
              :market-cap-formatted="coin.marketCapFormatted"
              :market-cap-rank="coin.marketCapRank"
              :current-price-formatted="coin.currentPriceFormatted"
              :is-filtered="coin.isFiltered"
              :target-portfolio-share-formatted="coin.targetPortfolioShareFormatted"
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
    config: Object,
  },
  data() {
    return {
      labels: [
          'Rank',
          'Coin',
          'Price',
          'Market Cap.',
          'Target Share',
      ]
    }
  },
  computed: {
    reducedCoinsList() {
      return this.coinsList.filter((coin) => !(this.config.blacklist.includes(coin.id) || this.config.stableCoins.includes(coin.id)));
    },
    enhancedCoinsList() {
      return this.coinsList.map((coin) => {
        coin.isFiltered = (this.config.blacklist.includes(coin.id) || this.config.stableCoins.includes(coin.id));
        coin.marketCapRank = coin.market_cap_rank;
        coin.currentPriceFormatted = this.formatUSD(coin.current_price, 6);
        coin.marketCapFormatted = this.formatUSD(coin.market_cap);

        if (!coin.isFiltered) {
          coin.targetPortfolioShareFormatted = this.formatPercent(coin.market_cap / this.filteredMarketCap);
        }

        return coin;
      });
    },
    totalMarketCap() {
      return this.coinsList.reduce((total, coin) => total + coin.market_cap, 0);
    },
    totalMarketCapFormatted() {
      return this.formatUSD(this.totalMarketCap);
    },
    filteredMarketCap() {
      return this.reducedCoinsList.reduce((total, coin) => total + coin.market_cap, 0);
    },
    filteredMarketCapFormatted() {
      return this.formatUSD(this.filteredMarketCap);
    },
    coverageFormatted() {
      return this.formatPercent(this.filteredMarketCap / this.totalMarketCap);
    }
  },
  methods: {
    formatPercent(value) {
      return `${(100 * value).toFixed(2)} %`;
    },
    formatUSD(value, precision = 0) {
      if (typeof value !== 'number') {
        return value;
      }

      let formatter = new Intl.NumberFormat('de-CH', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: precision
      });

      return formatter.format(value);
    },
  }
}
</script>
