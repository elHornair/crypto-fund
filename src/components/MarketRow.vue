<template>
  <tr :class="statusColor ? statusColor : ''">
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">#{{ marketCapRank }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="inline-block table-box__content-cell-content">
        <DisplayCoin :symbol="symbol" :name="name" :image-path="imagePath"></DisplayCoin>
      </span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ currentPriceFormatted }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ marketCapFormatted }}</span>
    </td>
    <td class="table-box__content-cell">
      <span class="table-box__content-cell-content">{{ statusSymbol }}</span>
    </td>
  </tr>
</template>

<script>
import DisplayCoin from "./DisplayCoin";

export default {
  name: 'MarketRow',
  components: {DisplayCoin},
  props: {
    symbol: String,
    name: String,
    imagePath: String,
    currentPriceFormatted: String,
    marketCapFormatted: String,
    marketCapRank: Number,
    statusColor: String,
    statusSymbol: String,
  }
}
</script>
