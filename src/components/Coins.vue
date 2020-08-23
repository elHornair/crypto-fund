<template>
  <div class="coins">
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="coin in coinsList" :key="coin.id">
        {{ coin.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Coins',
  props: {
    title: String,
    coinsList: Array
  }
}
</script>
