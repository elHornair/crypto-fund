<template>
  <tr>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">
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
    <td :class="'table-box__content-cell' + (this.delta <= 0 ? ' bg-red-200' : ' bg-green-200')">
      <span class="table-box__content-cell-content">{{ deltaFormatted }}</span>
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
    delta: Number,
    deltaFormatted: String,
  }
}
</script>
