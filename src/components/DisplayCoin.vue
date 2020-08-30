<template>
  <img :src="imagePath" width="20" class="inline-block mr-1 -mt-1">
  {{ name }} ({{ symbolFormatted }})
</template>

<script>
export default {
  name: 'DisplayCoin',
  props: {
    symbol: String,
    name: String,
    imagePath: String,
  },
  computed: {
    symbolFormatted() {
      return this.symbol ? `$${this.symbol.toString().toUpperCase()}` : '';
    }
  }
}
</script>
