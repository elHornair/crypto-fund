<template>
  <div class="coins">
    <h1>Coins</h1>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Coins',
  props: {
    title: String
  }
}
</script>
