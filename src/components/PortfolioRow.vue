<template>
  <tr>
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
      <span class="table-box__content-cell-content">{{ amountFormatted }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ amountUSDFormatted }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ targetPortfolioShareFormatted }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ currentPortfolioShareFormatted }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">TODO: delta</span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'PortfolioRow',
  props: {
    symbol: String,
    name: String,
    imagePath: String,
    currentPriceFormatted: String,
    amountFormatted: String,
    amountUSDFormatted: String,
    targetPortfolioShareFormatted: String,
    currentPortfolioShareFormatted: String,
  },
  computed: {
    symbolFormatted() {
      return this.symbol ? `$${this.symbol.toString().toUpperCase()}` : '';// TODO: share with the other component
    }
  }
}
</script>
