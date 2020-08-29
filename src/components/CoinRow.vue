<template>
  <tr>
    <td class="border-dashed border-t border-gray-200">
      <span class="text-gray-700 px-6 py-3 flex items-center">#{{ market_cap_rank }}</span>
    </td>
    <td class="border-dashed border-t border-gray-200">
      <span class="text-gray-700 px-6 py-3 flex items-center">
        <img :src="imagePath" width="20" class="mr-3">{{ name }} ({{ symbolFormatted }})
      </span>
    </td>
    <td class="border-dashed border-t border-gray-200">
      <span class="text-gray-700 px-6 py-3 flex items-center">{{ current_price }}</span>
    </td>
    <td class="border-dashed border-t border-gray-200">
      <span class="text-gray-700 px-6 py-3 flex items-center">{{ market_cap }}</span>
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
    current_price: Number,
    market_cap: Number,
    market_cap_rank: Number
  },
  computed: {
    symbolFormatted() {
      return this.symbol ? `$${this.symbol.toString().toUpperCase()}` : '';
    }
  }
}
</script>
