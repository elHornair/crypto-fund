<template>
  <div class="coins">
    <h1 class="text-3xl py-4 border-b mb-10">Crypto fund</h1>

    <h2 class="text-2xl mb-4">General Stats</h2>

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

      <div class="max-w-sm rounded overflow-hidden shadow-lg m-6 text-right">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Portfolio Value</div>
          <p class="text-gray-700 text-base">
            {{ totalPortfolioValueFormatted }}
          </p>
        </div>
      </div>
    </div>

    <h2 class="text-2xl mb-4">Market</h2>

    <div class="table-box">
      <table class="table-box__table">
        <thead>
          <tr>
              <th
                  v-for="label in ['Rank', 'Coin', 'Price', 'Market Cap.', 'Status']"
                  :key="label"
                  class="table-box__header-cell"
              >
                {{ label }}
              </th>
          </tr>
        </thead>
        <tbody>
          <MarketRow
              v-for="coin in enhancedCoinsList"
              :key="coin.id"
              :symbol="coin.symbol"
              :name="coin.name"
              :image-path="coin.image"
              :market-cap-formatted="coin.marketCapFormatted"
              :market-cap-rank="coin.marketCapRank"
              :current-price-formatted="coin.currentPriceFormatted"
              :is-filtered="coin.isFiltered"
          ></MarketRow>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl mb-4">Portfolio</h2>

    <div class="table-box">
      <table class="table-box__table">
        <thead>
        <tr>
          <th
              v-for="label in ['Coin', 'Price', 'Amount', 'Amount USD', 'Target Share', 'Current Share', 'Delta']"
              :key="label"
              class="table-box__header-cell"
          >
            {{ label }}
          </th>
        </tr>
        </thead>
        <tbody>
        <PortfolioRow
            v-for="coin in enhancedCoinsList"
            :key="coin.id"
            :symbol="coin.symbol"
            :name="coin.name"
            :image-path="coin.image"
            :current-price-formatted="coin.currentPriceFormatted"
            :amount-formatted="coin.amountFormatted"
            :amount-u-s-d-formatted="coin.amountUSDFormatted"
            :target-portfolio-share-formatted="coin.targetPortfolioShareFormatted"
        ></PortfolioRow>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl mb-4">Trades</h2>
    <p>Coming soon...</p>
  </div>
</template>

<script>

import MarketRow from "./MarketRow";
import PortfolioRow from "./PortfolioRow";

export default {
  name: 'Coins',
  components: {PortfolioRow, MarketRow},
  props: {
    coinsList: Array,
    config: Object,
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
          if (this.config.portfolio[coin.id]) {
            coin.amount = this.config.portfolio[coin.id].reduce((total, currentItem) => total + currentItem, 0);
            coin.amountFormatted = coin.amount.toFixed(6);
            coin.amountUSD = coin.amount * coin.current_price;
            coin.amountUSDFormatted = this.formatUSD(coin.amountUSD);
          } else {
            coin.amount = 0;
            coin.amountFormatted = '🚀';
            coin.amountUSD = 0;
            coin.amountUSDFormatted = '🚀';
          }

          coin.targetPortfolioShareFormatted = this.formatPercent(coin.market_cap / this.filteredMarketCap);
        } else {
          coin.amount = 0;
          coin.amountFormatted = '☠️';
          coin.amountUSD = 0;
          coin.amountUSDFormatted = '☠️';
          coin.targetPortfolioShareFormatted = '☠️';
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
    totalPortfolioValueFormatted() {
      return this.formatUSD(this.enhancedCoinsList.reduce((total, coin) => total + (coin.amountUSD ? coin.amountUSD : 0), 0));
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
