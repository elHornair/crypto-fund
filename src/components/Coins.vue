<template>
  <div class="coins">
    <h1 class="text-3xl py-4 border-b mb-10">Crypto fund</h1>

    <h2 class="text-2xl mb-4">General Stats</h2>

    <div class="flex">
      <div class="max-w-sm rounded overflow-hidden shadow-lg m-6 text-right">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Total Market Cap</div>
          <p class="text-gray-700 text-base">
            {{ totalMarketCapUSDFormatted }}
          </p>
        </div>
      </div>

      <div class="max-w-sm rounded overflow-hidden shadow-lg m-6 text-right">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Filtered Market Cap</div>
          <p class="text-gray-700 text-base">
            {{ filteredMarketCapUSDFormatted }}
          </p>
        </div>
      </div>

      <div class="max-w-sm rounded overflow-hidden shadow-lg m-6 text-right">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Market Coverage</div>
          <p class="text-gray-700 text-base">
            {{ marketCoverageFormatted }}
          </p>
        </div>
      </div>

      <div class="max-w-sm rounded overflow-hidden shadow-lg m-6 text-right">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Portfolio Value</div>
          <p class="text-gray-700 text-base">
            {{ totalPortfolioValueUSDFormatted }}
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
              v-for="coin in marketCoinsList"
              :key="coin.id"
              :symbol="coin.symbol"
              :name="coin.name"
              :image-path="coin.image"
              :market-cap-formatted="coin.marketCapFormatted"
              :market-cap-rank="coin.marketCapRank"
              :current-price-formatted="coin.currentPriceFormatted"
              :status-symbol="coin.statusSymbol"
              :status-color="coin.statusColor"
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
            v-for="coin in portfolioCoinsList"
            :key="coin.id"
            :symbol="coin.symbol"
            :name="coin.name"
            :image-path="coin.image"
            :current-price-formatted="coin.currentPriceFormatted"
            :amount-formatted="coin.amountFormatted"
            :amount-u-s-d-formatted="coin.amountUSDFormatted"
            :target-portfolio-share-formatted="coin.targetPortfolioShareFormatted"
            :current-portfolio-share-formatted="coin.currentPortfolioShareFormatted"
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
    totalMarketCapUSD() {
      return this.marketCoinsList.reduce((total, coin) => total + coin.marketCap, 0);
    },
    totalMarketCapUSDFormatted() {
      return this.formatUSD(this.totalMarketCapUSD);
    },
    filteredMarketCapUSDFormatted() {
      return this.formatUSD(this.filteredMarketCapUSD);
    },
    totalPortfolioValueUSDFormatted() {
      return this.formatUSD(this.totalPortfolioValueUSD);
    },
    marketCoverageFormatted() {
      return this.formatPercent(this.filteredMarketCapUSD / this.totalMarketCapUSD);
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
  },
  data() {
    return {
      marketCoinsList: [],
      portfolioCoinsList: [],
      filteredMarketCapUSD: 0,
      totalPortfolioValueUSD: 0,
    }
  },
  created() {
    // calculate market coins list
    this.marketCoinsList = this.coinsList.map((coin) => {
      coin.marketCap = coin.market_cap;
      coin.marketCapRank = coin.market_cap_rank;
      coin.currentPriceFormatted = this.formatUSD(coin.current_price, 6);
      coin.marketCapFormatted = this.formatUSD(coin.marketCap);

      if (this.config.blacklist.includes(coin.id)) {
        coin.statusSymbol = '💀';
        coin.statusColor = 'bg-red-200';
      } else if (this.config.stableCoins.includes(coin.id)) {
        coin.statusSymbol = '💲';
        coin.statusColor = 'bg-yellow-200';
      } else {
        coin.statusSymbol = '🚀';
        coin.statusColor = '';
      }

      return coin;
    });

    // calculate portfolio coins list
    this.portfolioCoinsList = this.marketCoinsList
      .filter((coin) => !(this.config.blacklist.includes(coin.id) || this.config.stableCoins.includes(coin.id)))
      .map((coin) => {

        coin.amount =
          this.config.portfolio[coin.id] ?
          this.config.portfolio[coin.id].reduce((total, currentItem) => total + currentItem, 0) :
          0
        ;

        coin.amountFormatted = coin.amount.toFixed(6);
        coin.amountUSD = coin.amount * coin.current_price;
        coin.amountUSDFormatted = this.formatUSD(coin.amountUSD);

        return coin;
      })
    ;

    this.filteredMarketCapUSD = this.portfolioCoinsList.reduce((total, coin) => total + coin.marketCap, 0);

    this.portfolioCoinsList = this.portfolioCoinsList.map((coin) => {
      coin.targetPortfolioShareFormatted = this.formatPercent(coin.marketCap / this.filteredMarketCapUSD);
      return coin;
    });

    this.totalPortfolioValueUSD = this.portfolioCoinsList.reduce((total, coin) => total + (coin.amountUSD ? coin.amountUSD : 0), 0);

    this.portfolioCoinsList = this.portfolioCoinsList.map((coin) => {
      coin.currentPortfolioShareFormatted = this.formatPercent(coin.amountUSD / this.totalPortfolioValueUSD);
      return coin;
    });
  }
}
</script>
