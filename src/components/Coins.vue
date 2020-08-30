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
          <div class="font-bold text-xl mb-2">Bitcoin Dominance</div>
          <p class="text-gray-700 text-base">
            {{ bitCoinDominanceFormatted }} ({{ bitcoinShareFormatted }})
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
              :delta="coin.delta"
              :delta-formatted="coin.deltaFormatted"
          ></PortfolioRow>
          <tr class="border-collapse border-t-2 border-gray-500 font-bold">
            <td class="table-box__content-cell">
              <span class="table-box__content-cell-content">Total</span>
            </td>
            <td class="table-box__content-cell" colspan="3">
              <span class="table-box__content-cell-content">{{ totalPortfolioValueUSDFormatted }}</span>
            </td>
            <td class="table-box__content-cell">
              <span class="table-box__content-cell-content">{{ totalTargetPortfolioShareFormatted }}</span>
            </td>
            <td class="table-box__content-cell">
              <span class="table-box__content-cell-content">{{ totalCurrentPortfolioShareFormatted }}</span>
            </td>
            <td class="table-box__content-cell">
              <span class="table-box__content-cell-content">{{ totalDeltaFormatted }}</span>
            </td>
          </tr>
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
    marketCoverageFormatted() {
      return this.formatPercent(this.filteredMarketCapUSD / this.totalMarketCapUSD);
    },
    bitCoinDominanceFormatted() {
      return this.formatPercent(this.bitCoinDominance);
    },
    bitcoinShare() {
      return Math.min(this.bitCoinDominance, this.maxBitcoinShare);
    },
    bitcoinShareFormatted() {
      return this.formatPercent(this.bitcoinShare);
    },
    totalTargetPortfolioShareFormatted() {
      return this.formatPercent(
          this.portfolioCoinsList.reduce((total, coin) => total + coin.targetPortfolioShare, 0)
      );
    },
    totalCurrentPortfolioShareFormatted() {
      return this.formatPercent(
          this.portfolioCoinsList.reduce((total, coin) => total + coin.currentPortfolioShare, 0)
      );
    },
    totalPortfolioValueUSD() {
      return this.portfolioCoinsList.reduce((total, coin) => total + (coin.amountUSD ? coin.amountUSD : 0), 0);
    },
    totalPortfolioValueUSDFormatted() {
      return this.formatUSD(this.totalPortfolioValueUSD);
    },
    totalDeltaFormatted() {
      return this.formatPercent(this.portfolioCoinsList.reduce((total, coin) => total + coin.delta, 0));
    },
  },
  methods: {
    formatPercent(value) {
      return `${(100 * value).toFixed(2)}%`;
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
      bitCoinDominance: 0,
      maxBitcoinShare: 0.5,
      filteredMarketCapUSD: 0,
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
    this.bitCoinDominance = this.portfolioCoinsList.find(coin => coin.id === 'bitcoin').marketCap / this.filteredMarketCapUSD;

    this.portfolioCoinsList = this.portfolioCoinsList.map((coin) => {
      if (coin.id === 'bitcoin') {
        coin.targetPortfolioShare = this.bitcoinShare;
      } else {
        // This is a bit complicated. Basically we need to distribute everything that would mathematically belong to bitcoin among the remaining coins
        let totalMarketCapWithoutBitcoin = ((1 - this.bitCoinDominance) * this.filteredMarketCapUSD);
        coin.targetPortfolioShare = (coin.marketCap / (totalMarketCapWithoutBitcoin)) * (1 - this.bitcoinShare);
      }

      coin.targetPortfolioShareFormatted = this.formatPercent(coin.targetPortfolioShare);

      return coin;
    });

    this.portfolioCoinsList = this.portfolioCoinsList.map((coin) => {
      coin.currentPortfolioShare = coin.amountUSD / this.totalPortfolioValueUSD;
      coin.currentPortfolioShareFormatted = this.formatPercent(coin.currentPortfolioShare);
      coin.delta = coin.currentPortfolioShare - coin.targetPortfolioShare;
      coin.deltaFormatted = this.formatPercent(coin.delta);

      return coin;
    });
  }
}
</script>
