<template>
  <tr :class="isFiltered ? 'bg-red-200' : ''">
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">#{{ marketCapRank }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="inline-block table-box__content-cell-content">
        <img :src="imagePath" width="20" class="inline-block mr-3">
        {{ name }} ({{ symbolFormatted }})
      </span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ currentPriceFormatted }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ marketCapFormatted }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ isFiltered }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'MarketRow',
  props: {
    symbol: String,
    name: String,
    imagePath: String,
    currentPriceFormatted: String,
    marketCapFormatted: String,
    marketCapRank: Number,
    isFiltered: Boolean,// TODO: instead of "filtered", use "status" (red, green yellow, neutral or something?)
  },
  computed: {
    symbolFormatted() {
      return this.symbol ? `$${this.symbol.toString().toUpperCase()}` : '';
    }
  }
}
</script>
