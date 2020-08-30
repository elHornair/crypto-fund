<template>
  <tr>
    <td class="table-box__content-cell">
      <span class="inline-block table-box__content-cell-content">
        <DisplayCoin :symbol="symbol" :name="name" :image-path="imagePath"></DisplayCoin>
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
import DisplayCoin from "./DisplayCoin";

export default {
  name: 'PortfolioRow',
  components: {DisplayCoin},
  props: {
    symbol: String,
    name: String,
    imagePath: String,
    currentPriceFormatted: String,
    amountFormatted: String,
    amountUSDFormatted: String,
    targetPortfolioShareFormatted: String,
    currentPortfolioShareFormatted: String,
  }
}
</script>
