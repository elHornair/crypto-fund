<template>
  <tr :class="isFiltered ? 'bg-red-200' : ''">
    <td class="border-dashed border-t border-gray-200 text-right">
      <span class="text-gray-700 px-6 py-3 items-center">#{{ marketCapRank }}</span>
    </td>
    <td class="border-dashed border-t border-gray-200 text-right">
      <span class="inline-block text-gray-700 px-6 py-3 items-center">
        <img :src="imagePath" width="20" class="inline-block mr-3">
        {{ name }} ({{ symbolFormatted }})
      </span>
    </td>
    <td class="border-dashed border-t border-gray-200 text-right">
      <span class="text-gray-700 px-6 py-3 items-center">{{ currentPriceFormatted }}</span>
    </td>
    <td class="border-dashed border-t border-gray-200 text-right">
      <span class="text-gray-700 px-6 py-3 items-center">{{ marketCapFormatted }}</span>
    </td>
    <td class="border-dashed border-t border-gray-200 text-right">
      <span class="text-gray-700 px-6 py-3 items-center">{{ amountFormatted }}</span>
    </td>
    <td class="border-dashed border-t border-gray-200 text-right">
      <span class="text-gray-700 px-6 py-3 items-center">{{ amountUSDFormatted }}</span>
    </td>
    <td class="border-dashed border-t border-gray-200 text-right">
      <span class="text-gray-700 px-6 py-3 items-center">{{ targetPortfolioShareFormatted }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CoinRow',
  props: {
    id: String,
    symbol: String,
    name: String,
    imagePath: String,
    currentPriceFormatted: String,
    marketCapFormatted: String,
    marketCapRank: Number,
    isFiltered: Boolean,
    targetPortfolioShareFormatted: String,
    amountFormatted: String,
    amountUSDFormatted: String,
  },
  computed: {
    symbolFormatted() {
      return this.symbol ? `$${this.symbol.toString().toUpperCase()}` : '';
    }
  }
}
</script>
